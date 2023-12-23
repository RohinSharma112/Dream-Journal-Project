import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('dream-entry')

def lambda_handler(event, context):
    try:
        response = table.scan(
            FilterExpression="user_id = :user_id",
            ExpressionAttributeValues={
                ':user_id': event['user_id']
            },
            ProjectionExpression="dream_id, dream_title, dream_date, dream_tag"
        )


        if not response['Items']:
            return {
                'statusCode': 404,
                'body': {'success':False, 'message':'No dreams found for the given user'}
            }

        return {
            'statusCode': 200,
            'body': {'success':True, 'dreams':response['Items']}
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': {'success':False, 'message':'Internal server error'}
        }
