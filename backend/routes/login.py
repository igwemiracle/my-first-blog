import asyncio
from fastapi import Depends, APIRouter, status
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from authenticate.hash_pwd import HashPassword
from authenticate import cookie_auth
from authenticate.jwt_handler import create_access_token
from models.schemas import LoginUserSchema, Token
from database.connection import get_db
from routes import crud

login = APIRouter()
hashThisPassword = HashPassword()



@login.post("/auth/login", response_model=Token)
async def LoginUser(
    login_user: LoginUserSchema,
    db: AsyncSession = Depends(get_db)
):
    username = login_user.username
    password = login_user.password

    # Check if user exists
    user_exist = await crud.get_user(username=username, db=db)
    if not user_exist:
        await asyncio.sleep(5)
        error_message = "The account does not exist or the password is wrong."
        return JSONResponse(
            {"error_message": error_message},
            status_code=status.HTTP_400_BAD_REQUEST
        )

    # Verify password
    if not hashThisPassword.verify_hash(password, user_exist.hash_password):
        error_message = "The account does not exist or the password is wrong."
        return JSONResponse(
            {"error_message": error_message},
            status_code=status.HTTP_404_NOT_FOUND
        )

    access_token = create_access_token(username=login_user.username)
    # Successful login
    response = JSONResponse(
        {
            "access_token": access_token,
            "token_type": "Bearer",
            "message": "User logged in successfully",
            "redirect_url": f"/account?username={user_exist.username}&loggedin=True"
        },
        status_code=status.HTTP_200_OK
    )
    cookie_auth.set_auth(response, user_exist.id)

    return response

@login.get("/auth/logout")
async def renderLogoutPage():
    response = RedirectResponse(
        url="/", status_code=status.HTTP_200_OK
    )
    cookie_auth.logout(response)
    return response