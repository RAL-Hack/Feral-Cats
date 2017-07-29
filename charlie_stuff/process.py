from read_google_sheets import get_file
import pandas as pd
import random
import smtplib

day_tag = ['Monday','Tuesday','Wednesday','Thursday','Friday']
day_count = []
def get_day_count():
	for i in range(5):
		print("How many slots are open on " + day_tag[i] + "?")
		day_count.append(int(input()))



#get_day_count()
day_count = [5,5,5,5,5]
print(day_count)


csv = "data.csv"
get_file()
#print("test")




day_data = []

# load csv
data = pd.read_csv("data.csv")

print(data['Timestamp'])

import datetime
last_thursday = datetime.date.today() - datetime.timedelta(days=datetime.date.today().weekday()-3)

two_fridays_ago = datetime.date.today() - datetime.timedelta(days=datetime.date.today().weekday()-3+6)


print(two_fridays_ago,last_thursday)
print(datetime.date.today() >= two_fridays_ago, datetime.date.today()  <= last_thursday)
data = data[(pd.to_datetime(data['Timestamp']) >= two_fridays_ago) & (pd.to_datetime(data['Timestamp']) <= last_thursday)]

#Get list of people who are avaliable on each day
for i in range(5):
	day_data.append(data[data[day_tag[i]] == True].index.tolist())

print(day_data)

print("Picking Random People")
#Select Random number of people specificed by day_count

winners = []
winners_list = set([])
for i in range(5):

	#print(winners_list)
	num_len = len(day_data[i])

	nums = []
	for j in range(num_len):
		if day_data[i][j] not in winners_list:
			nums.append(day_data[i][j])

	print("Pre filter :", nums)
	for num in nums:
		#print(num,num in winners_list)
		if num in winners_list:
			nums.remove(num)
	print("Post filter:", nums)

	num_len = len(nums)
	random.shuffle(nums)

	winners.append(nums[0:min(num_len,day_count[i])])

	print("Winners    :",nums[0:min(num_len,day_count[i])])
	for num in nums[0:min(num_len,day_count[i])]:
		winners_list.add(num)

	print("All Winners:",winners_list)

	print("\n")
#print(winners)

	#for j in range(min(num_len,day_count[i])):
	#	print(data.iloc[nums[j]])


#Print Out Winners

winner_emails = []
for i in range(5):
	print(" ---- Winners For " + day_tag[i] + " ---- ")
	temp = []
	for j in range(len(winners[i])):
		print(data.iloc[winners[i][j]]["Name"] + " " + data.iloc[winners[i][j]]["Email"])
		temp.append(data.iloc[winners[i][j]]["Email"])


	winner_emails.append(temp)





print("Email These winners? ([y]/n)")

if input() != 'y':
	print("Exiting Program. No one was emailed")
	exit()

print("What is your email address?")
email = input()
print("What is your password?")
password = input()

server = smtplib.SMTP('smtp.gmail.com:587')
server.ehlo()
server.starttls()

try: 
	print("Attempting Login")
	server.login(email,password)
	print("Successful Login")

except smtplib.SMTPException:
	print("Error: unable to login")
	exit()

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
for i in range(5):
	msg = MIMEMultipart()
	msg['From'] = "Ral Feral Cat Program"
	msg['To'] = ", ".join(winner_emails[i])
	msg['Subject'] = "Test Email Header"
	body = "\n Test Body"
	msg.attach(MIMEText(body, 'plain'))
	try:
	   server.sendmail(email,winner_emails[i],msg.as_string())        
	   print("Successfully sent email to " + day_tag[i] + " winners")
	except smtplib.SMTPException:
	   print("Error: unable to send email to " + day_tag[i] + " winners")










#create 5 day buckets




#print everyone in every bucket