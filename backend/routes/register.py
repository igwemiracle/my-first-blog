from typing import List
from fastapi import Depends, APIRouter, Form, Request, status
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.connection import get_db
from routes.crud import createRegisteredUser
from models.sqlDATA import User
from fastapi.templating import Jinja2Templates
from authenticate.hash_pwd import HashPassword
from routes import crud



register = APIRouter()
hashThisPassword = HashPassword()

# Define a Pydantic model to parse the incoming JSON data
class RegisterUserSchema(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

@register.post("/auth/register")
async def registerUser(user_data: RegisterUserSchema, db: AsyncSession = Depends(get_db)):
    username = user_data.username
    email = user_data.email
    password = user_data.password
    confirm_password = user_data.confirm_password

    # Check if user exists
    user_exist = await crud.findUserExist(email=email, db=db)
    if user_exist:
        return JSONResponse(
            {"error_message": "User with this email already exists. Please use a different email."},
            status_code=status.HTTP_400_BAD_REQUEST
        )

    # Check if passwords match
    if password != confirm_password:
        return JSONResponse(
            {"error_message": "Passwords do not match."},
            status_code=status.HTTP_400_BAD_REQUEST
        )

    # Hash the password and create the user
    hashed_password = hashThisPassword.create_hash(password)
    dbUser = await crud.createRegisteredUser(username, email, hashed_password, db)
    db.add(dbUser)
    await db.commit()
    await db.refresh(dbUser)

    # Return a success message or redirect information
    return JSONResponse(
        {"message": "User registered successfully", "redirect_url": f"/account?username={username}&loggedin=True"},
        status_code=status.HTTP_201_CREATED
    )
