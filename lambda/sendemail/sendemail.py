
import requests
import string
import json



def respond(err, res=None):
    return {
        'statusCode': '400' if err else '200',
        'body': err.message if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
        },
    }


def lambda_handler(event, context):
  
    #print("Received event: " + json.dumps(event, indent=2))

    operations = {
        'POST': emailHandler
    }

    operation = event['httpMethod']
    if operation in operations:
        requestData = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
        return respond(None, operations[operation](requestData))
    else:
        return respond(ValueError('Unsupported method "{}"'.format(operation)))

requestData= {"emailtype":"winner","firstname":"Colleen","to":"cebkerr@gmail.com","date":"Monday, July 30th"}

def emailHandler(requestData) :

    subjects = {
        'confirmation' : 'We\'ve received your appointment request for the feral cat program',
        'winner' : 'You\'ve been selected for a feral cat spay/neuter appointment',
        'loser' : 'We couldn\'t book an appointment for your feral cat'
    }

    bodies = {
        'confirmation' : 'https://s3.amazonaws.com/feral-cat-lottery/signup-email.html',
        'winner' : 'https://s3.amazonaws.com/feral-cat-lottery/confirmation-email.html',
        'loser' : 'https://s3.amazonaws.com/feral-cat-lottery/decline-email.html'
    }

    url = "https://api.mailgun.net/v3/sandbox0963e44a639a4403a83ed83478e01637.mailgun.org/messages"

    emailContent = transformEmail(requests.get(bodies[requestData['emailtype']]).text, requestData)

    payload = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"from\"\r\n\r\nColleen Kerr <cebkerr@gmail.com>\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"to\"\r\n\r\n"+requestData['to']+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"subject\"\r\n\r\n"+subjects[requestData['emailtype']]+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"html\"\r\n\r\n"+emailContent+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--"
    headers = {
        'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        'authorization': "Basic YXBpOmtleS1mM2YzYjc0OTM1ZmQwNGFkNjc0ZGVlZjQwMjQzNjAzYg=="
        }

    print(emailContent)

   # response = requests.request("POST", url, data=payload, headers=headers)



def transformEmail(body, requestData) :
    body = string.replace(body, '==FIRSTNAME==', requestData['firstname'])
    if requestData['emailtype'] == 'confirmation':
      body = string.replace(body, '==APPOINTMENT DATE==', requestData['date'])
    return body


emailHandler(requestData)