import asyncio
import uuid
from fastapi import APIRouter, Depends, Form, Request, status
from fastapi.responses import RedirectResponse,JSONResponse
from email_notification.SendEmail import EmailSender
from database.connection import get_db
from models.schemas import ForgotPassword, ResetPassword
from sqlalchemy.ext.asyncio import AsyncSession
from routes import crud
from authenticate.hash_pwd import HashPassword


resetPassword = APIRouter()
hashThisPassword = HashPassword()

@resetPassword.get("/auth/reset_password")
async def renderResetPasswordPage(request: Request):
    reset_password_token = request.query_params.get('reset_password_token')
    return JSONResponse({
        "redirect_url": f"/auth/reset_password?reset_password_token={reset_password_token}",
        "message": "Reset password, What a success!"

    },status_code=status.HTTP_200_OK)



@resetPassword.post("/auth/reset_password")
async def reset_password(request: Request,
                        reset_pass:ResetPassword,
                        db:AsyncSession=Depends(get_db)):
    reset_password_token = reset_pass.reset_password_token
    new_password = reset_pass.new_password
    confirm_password = reset_pass.confirm_password

    # check valid reset_password_token
    reset_token = await crud.check_reset_password_token(reset_password_token,db=db)
    if not reset_token:
        token_error_message = "Reset password token has expired, please request a new one."
        return JSONResponse({"request": request, "token_error_message": token_error_message}, status_code=status.HTTP_404_NOT_FOUND)

    
    # check if new & confirm passwords are match
    if new_password != confirm_password:
        await asyncio.sleep(5)
        error_message = "new password and confirm_password do not match."
        return JSONResponse({"request": request, "error_message": error_message}, status_code=status.HTTP_404_NOT_FOUND)
        # raise HTTPException(status_code=404, detail="New password is not match")

    # Reset new password
    forgot_password_object = ForgotPassword(id=reset_token[0][0],
                                            email=reset_token[0][1],
                                            token=reset_token[0][2],
                                            status=reset_token[0][3],
                                            timestamp=reset_token[0][4])
    print("forgot_password_object")
    new_hashed_password = hashThisPassword.create_hash(new_password)
    await crud.reset_password(new_hashed_password, forgot_password_object.email, db=db)

    #Disable reset code (already used)
    await crud.disable_reset_code(reset_password_token, forgot_password_object.email, db=db)
    return {
        "status_code": 200,
        "message": "Password has been reset successfully"
    }