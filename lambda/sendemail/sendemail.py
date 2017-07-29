import requests
import string

def emailHandler(context, event) :

    subjects = {
        'confirmation' : 'We\'ve received your appointment request for the feral cat program',
        'winner' : 'You\'ve been selected for a feral cat spay/neuter appointment',
        'loser' : 'We couldn\'t book an appointment for your feral cat'
    }

    bodies = {
        'confirmation' : 'https://s3.amazonaws.com/feral-cat-lottery/signup-email.html',
        'winner' : 'https://s3.amazonaws.com/feral-cat-lottery/winner-email.html',
        'loser' : 'https://s3.amazonaws.com/feral-cat-lottery/loser-email.html'
    }

    url = "https://api.mailgun.net/v3/sandbox0963e44a639a4403a83ed83478e01637.mailgun.org/messages"

    emailContent = transformEmail(requests.get(bodies[event['emailtype']]).text, event)

    payload = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"from\"\r\n\r\nColleen Kerr <cebkerr@gmail.com>\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"to\"\r\n\r\n"+event['to']+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"subject\"\r\n\r\n"+subjects[event['emailtype']]+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"html\"\r\n\r\n"+emailContent+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--"
    headers = {
        'content-type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        'authorization': "Basic YXBpOmtleS1mM2YzYjc0OTM1ZmQwNGFkNjc0ZGVlZjQwMjQzNjAzYg=="
        }

    response = requests.request("POST", url, data=payload, headers=headers)

    print(emailContent)


def transformEmail(body, event) :
    body = string.replace(body, '==FIRSTNAME==', event['firstname'])


    return body

