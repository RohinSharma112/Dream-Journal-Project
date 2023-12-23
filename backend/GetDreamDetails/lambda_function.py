import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dream-entry')

def lambda_handler(event, context):
    try:
        result = table.get_item(Key={'dream_id': event['pathParameters']['dream_id']})
        
        headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Credentials': 'true',  
            'Content-Type': 'application/json', 
        }

        if 'Item' not in result:
            return {
                    'statusCode': 404,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'message': 'Dream not found'})
                    }

        return {
                    'statusCode': 200,
                    'headers': headers,
                    'body': json.dumps({'success': True, 'dream': result['Item']})
                }


    except Exception as e:
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'success': False, 'message': "Internal server error"})
            }

