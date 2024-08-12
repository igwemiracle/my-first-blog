import os
import smtplib
from email.message import EmailMessage


class EmailSender:
    def __init__(self, subject, recipients, content) -> None:
        self.message = EmailMessage()
        self.EMAIL_ADDRESS = os.environ.get('EMAIL_ADDRESS')
        self.MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
        self.message['Subject'] = subject
        self.message['From'] = self.EMAIL_ADDRESS
        self.message['To'] = recipients
        self.message.set_content(content, subtype="html")

    def send_email(self):
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(self.EMAIL_ADDRESS, self.MAIL_PASSWORD)
            smtp.send_message(self.message)

# message = EmailMessage()

# EMAIL_ADDRESS = os.environ.get('EMAIL_ADDRESS')
# MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
# message['Subject'] = 'Register successfull'
# message['From'] = EMAIL_ADDRESS
# message['To'] = 'igwemiraclenzube@gmail.com'
# message.set_content = 'I Later see another method to use `smtplib`'

# with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#     smtp.login(EMAIL_ADDRESS, MAIL_PASSWORD)
#     smtp.send_message(message)
