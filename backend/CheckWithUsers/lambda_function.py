import boto3
import json
from datetime import datetime, timedelta
import time

dynamodb = boto3.resource('dynamodb')
sns_client = boto3.client('sns')

DREAM_ENTRY_TABLE = dynamodb.Table('dream-entry')
USER_TABLE = dynamodb.Table('user')
SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:271380558708:WellnessReminderSNS'

def get_users_with_consecutive_nightmares():
    response = DREAM_ENTRY_TABLE.scan()
    items = response['Items']
    user_nightmare_dates = {}

    for item in items:
        if item['dream_tag'] == 'Nightmare':
            user_id = item['user_id']
            date = item['dream_date']
            if user_id not in user_nightmare_dates:
                user_nightmare_dates[user_id] = [date]
            else:
                user_nightmare_dates[user_id].append(date)

    users_to_notify = []
    for user_id, dates in user_nightmare_dates.items():
        dates = sorted(dates)
        consecutive_count = 0
        for i in range(1, len(dates)):
            if (datetime.strptime(dates[i], '%Y-%m-%d') - datetime.strptime(dates[i-1], '%Y-%m-%d')).days == 1:
                consecutive_count += 1
                if consecutive_count >= 3:  # 3 consecutive differences means 4 consecutive days
                    users_to_notify.append(user_id)
                    break
            else:
                consecutive_count = 0

    return users_to_notify

def get_emails_from_user_table(user_ids):
    emails = []
    for user_id in user_ids:
        response = USER_TABLE.get_item(Key={'user_id': user_id})
        emails.append(response['Item']['email'])
    return emails

def set_subscription_filter(email, subscription_arn):
    filter_policy = {
        "email": [email]
    }
    sns_client.set_subscription_attributes(
        SubscriptionArn=subscription_arn,
        AttributeName='FilterPolicy',
        AttributeValue=json.dumps(filter_policy)
    )

def lambda_handler(event, context):
    users_to_notify = get_users_with_consecutive_nightmares()
    emails_to_notify = emails_to_notify = list(set(get_emails_from_user_table(users_to_notify)))

    for email in emails_to_notify:
        subscription_arn = get_subscription_arn(email, SNS_TOPIC_ARN)

        # If not subscribed yet, then subscribe.
        if not subscription_arn:
            sns_client.subscribe(
                TopicArn=SNS_TOPIC_ARN,
                Protocol='email',
                Endpoint=email
            )
        
        time.sleep(70)
        subscription_arn = get_subscription_arn(email, SNS_TOPIC_ARN)
    
        # Set the filter policy
        set_subscription_filter(email, subscription_arn)
        
        message = "Take care and eat well! We noticed you've had nightmares for 4 consecutive nights."
        
        message_attributes = {
        'email': {
            'DataType': 'String',
            'StringValue': email
            }
        }
    
        sns_client.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=message,
            Subject="Wellness Reminder",
            MessageAttributes=message_attributes
        )

    return {
        'statusCode': 200,
        'body': json.dumps(f'Messages sent to {len(emails_to_notify)} users.')
    }

def get_subscription_arn(email, topic_arn):
    response = sns_client.list_subscriptions_by_topic(TopicArn=topic_arn)
    for subscription in response['Subscriptions']:
        if subscription['Protocol'] == 'email' and subscription['Endpoint'] == email:
            return subscription['SubscriptionArn']
    return None

