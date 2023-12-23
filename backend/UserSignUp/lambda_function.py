import boto3
import hashlib
from uuid import uuid4
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('user')

def lambda_handler(event, context):
    try:
        print(event)
        user_id = str(uuid4().hex)

        existing_username = table.scan(
            FilterExpression="username = :username",
            ExpressionAttributeValues={
                ":username": event['username']
            }
        )

        existing_email = table.scan(
            FilterExpression="email = :email",
            ExpressionAttributeValues={
                ":email": event['email']
            }
        )

        if existing_username.get('Items'):
            return {
                'statusCode': 400,
                'body': {"success": False, "message": "Username already registered"}
            }
        
        if existing_email.get('Items'):
            return {
                'statusCode': 400,
                'body': {"success": False, "message": "Email already registered"}
            }


        hashed_password = hashlib.md5(event['password'].encode()).hexdigest()

        item = {
            'user_id': user_id,
            'name': event['name'],
            'username': event['username'],
            'email': event['email'],
            'password': hashed_password
        }

        response = table.put_item(Item=item)

        return {
            'statusCode': 200,
            'body': {"success": True, "message": 'User registered successfully'}
        }

    except Exception as e:
        print("Error occurred:", e)
        return {
            'statusCode': 500,
            'body': {"success": False, "message": 'Internal server error'}
        }