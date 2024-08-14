import asyncio
from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from database.connection import get_db
from models.schemas import ForgotPassword, ResetPassword
from sqlalchemy.ext.asyncio import AsyncSession
from routes import crud
from authenticate.hash_pwd import HashPassword


resetPassword = APIRouter()
hashThisPassword = HashPassword()

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

resetPassword = APIRouter()

@resetPassword.get("/auth/reset_password")
async def render_reset_password_page(request: Request):
    reset_password_token = request.query_params.get('reset_password_token')
    return JSONResponse({"reset_password_token": reset_password_token, "redirect_url":f"/auth/reset_password?reset_password_token={reset_password_token}" })


@resetPassword.post("/auth/reset_password")
async def reset_password(
                        reset_pass: ResetPassword,
                        db:AsyncSession=Depends(get_db)):
    new_password = reset_pass.new_password
    confirm_password = reset_pass.confirm_password
    reset_password_token = reset_pass.reset_password_token

 
    # check valid reset_password_token
    reset_token = await crud.check_reset_password_token(reset_password_token,db=db)
    if not reset_token:
        token_error_message = "Reset password token has expired, please request a new one."
        return JSONResponse({"token_error_message": token_error_message}, status_code=status.HTTP_404_NOT_FOUND)

    
    # check if new & confirm passwords are match
    if new_password != confirm_password:
        await asyncio.sleep(5)
        error_message = "new password and confirm_password do not match."
        return JSONResponse({"error_message": error_message}, status_code=status.HTTP_404_NOT_FOUND)

    # Reset new password
    forgot_password_object = ForgotPassword(id=reset_token[0][0],
                                            email=reset_token[0][1],
                                            token=reset_token[0][2],
                                            status=reset_token[0][3],
                                            timestamp=reset_token[0][4])
    new_hashed_password = hashThisPassword.create_hash(new_password)
    await crud.reset_password(new_hashed_password, forgot_password_object.email, db=db)

    #Disable reset code (already used)
    await crud.disable_reset_code(reset_password_token, forgot_password_object.email, db=db)
    return JSONResponse(
        {
            "status_code": 200,
            "message": "Password has been reset successfully",
            "redirect_url": "/auth/login" 
        },
        status_code=status.HTTP_200_OK
    )