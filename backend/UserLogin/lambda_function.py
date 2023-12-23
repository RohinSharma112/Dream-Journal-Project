import boto3
import hashlib


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user')

def lambda_handler(event, context):
    try:
        response = table.scan(
            FilterExpression="username = :username",
            ExpressionAttributeValues={
                ':username': event['username']
            }
        )

        if not response['Items']:
            return {
                'statusCode': 401,
                'body': {'success':False, 'message':'Invalid username or password'}
            }

        stored_password_hash = response['Items'][0]['password']

        provided_password_hash = hashlib.md5(event['password'].encode()).hexdigest()

        if provided_password_hash == stored_password_hash:
            return {
                'statusCode': 200,
                'body': {'success':True, 'message':'Login successful', "user_id":response['Items'][0]['user_id']}
            }
        else:
            return {
                'statusCode': 401,
                'body': {'success':False, 'message':'Invalid username or password'}
            }

    except Exception as e:
        print("Error occurred:", e)
        return {
            'statusCode': 500,
            'body': {'success':False, 'message':'Internal server error'}
        }
