import json
import base64
import boto3

def lambda_handler(event, context):
    try:
        # Decode the base64 image
        base64_image = event['image']
        byte_image = base64.b64decode(base64_image)

        # Use Textract to process the image
        textract_client = boto3.client('textract')
    
        response = textract_client.detect_document_text(Document={'Bytes': byte_image})

        # Extracting detected lines of text from the response
        detected_text = [item['Text'] for item in response['Blocks'] if item['BlockType'] == 'LINE']
        
        paragraph_text = ' '.join(detected_text)


        return {
            'statusCode': 200,
            'body': {'detectedText': paragraph_text}
        }
    
    except Exception as e:
        return {'statusCode': 500,'body': {'message': str(e)}}
        