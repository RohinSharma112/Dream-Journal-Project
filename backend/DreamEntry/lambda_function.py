import boto3
from uuid import uuid4


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dream-entry')

def lambda_handler(event, context):
    try:
        dream_id = str(uuid4().hex)

        item = {
            'dream_id': dream_id,
            'user_id': event['user_id'],
            'dream_title': event['dream_title'],
            'dream_date': event['dream_date'],
            'dream_description': event['dream_description'],
            'dream_tag': event['dream_tag']
        }

        table.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': {'success':True, 'message':'Dream entry successfully created!'}
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'success':False, 'message':'Internal server error'}
        }
