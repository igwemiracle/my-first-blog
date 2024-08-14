import asyncio
import uuid
from fastapi import APIRouter, Depends, Form, Request, status
from fastapi.responses import RedirectResponse,JSONResponse
from email_notification.SendEmail import EmailSender
from database.connection import get_db
from models.schemas import ForgotPassword
from sqlalchemy.ext.asyncio import AsyncSession
from routes import crud


forgotPassword = APIRouter()

@forgotPassword.post("/auth/forgot_password")
async def forgot_password(
    userEmail: ForgotPassword,
    db: AsyncSession = Depends(get_db)
):
    # Extract the email from the Pydantic model
    email_to_lookup = userEmail.email  # Assuming userEmail has an 'email' field
    
    # Check if user exists
    user_exist = await crud.findUserExist(email_to_lookup, db=db)
    if not user_exist:
        await asyncio.sleep(5)
        error_message = "User not found."
        return JSONResponse({"error_message": error_message}, status_code=status.HTTP_404_NOT_FOUND)
    
    reset_code = str(uuid.uuid1())
    await crud.createResetCode(email_to_lookup, reset_code, db=db)

    subject = 'Password Reset Request'
    recipient = [email_to_lookup]  # Pass the email string here

    content = f"""
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0;box-sizing: border-box;font-family: Arial, Helvetica, sans-serif;">
        <div>
            <h1> Hello {email_to_lookup}!</h1>
            <p>Someone has requested a link to reset your password. If you requested this,<br>you can change
            your password through the link below .</p>
            <p><a href="http://localhost:3000/auth/reset_password/?reset_password_token={reset_code}">Reset Password link</a></p>
            <p>If you didn't request this, you can ignore this email.</p>
        </div>
    </body>
    </html>
    """.format(userEmail, reset_code)

    # Create an instance of the email sender
    email_service = EmailSender(subject, recipient, content)
    email_service.send_email()

    return RedirectResponse(url="/auth/reset_password", status_code=status.HTTP_303_SEE_OTHER)