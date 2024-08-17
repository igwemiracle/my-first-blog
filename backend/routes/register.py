from fastapi import Depends, APIRouter, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from authenticate.jwt_handler import create_access_token
from models.schemas import RegisterUserSchema, Token
from database.connection import get_db
from authenticate.hash_pwd import HashPassword
from routes import crud

register = APIRouter()
hashThisPassword = HashPassword()



@register.post("/auth/register", response_model=Token)
async def registerUser(user_data: RegisterUserSchema, db: AsyncSession = Depends(get_db)):
    username = user_data.username
    email = user_data.email
    password = user_data.password
    confirm_password = user_data.confirm_password

    user_exist = await crud.findUserExist(email=email, db=db)
    if user_exist:
        return JSONResponse(
            {"error_message": "User with this email already exists. Please use a different email."},
            status_code=status.HTTP_400_BAD_REQUEST
        )

    if password != confirm_password:
        return JSONResponse(
            {"error_message": "Passwords do not match."},
            status_code=status.HTTP_400_BAD_REQUEST
        )
    access_token = create_access_token(username=user_data.username)
    hashed_password = hashThisPassword.create_hash(password)
    dbUser = await crud.createRegisteredUser(username, email, hashed_password, db)
    db.add(dbUser)
    await db.commit()
    await db.refresh(dbUser)

    return JSONResponse(
        {
            "message": "User registered successfully",
            "redirect_url": f"/account?username={username}&loggedin=True",
            "access_token": access_token,
            "token_type": "Bearer",
         },
        status_code=status.HTTP_201_CREATED
    )