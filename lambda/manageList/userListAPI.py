from __future__ import print_function

import json
import urllib
import boto3

print('Loading function')

s3 = boto3.client('s3')
s3Writer=boto3.resource('s3')

bucket = 'aws-website-feralcatlottery-kq696'
key = 'registrants.json'


def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }

def lambda_handler(event, context):
    
    operations = {
        'POST': updateFile,
        'GET' : readFile
    }

    operation = event['httpMethod']
    if operation in operations:
        requestData = None if operation == 'GET' else json.loads(event['body'])
        return respond(None, operations[operation](requestData))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))
    
        
def updateFile(data):
        newData = s3.get_object(Bucket=bucket, Key=key)
        registrants = json.loads(newData['Body'].read())
        userArr = registrants['registrants']
        userArr.extend([data])
        print(userArr)
        registrants = { 'registrants' : userArr}
        newJson=json.dumps(registrants)
        s3Writer.Bucket(bucket).put_object(Key=key, Body=newJson)
        return None
    
def readFile(dummy):
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        registrants = json.loads(response['Body'].read())
        return registrants
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e