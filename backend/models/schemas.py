from pydantic import BaseModel
from typing import Union, Optional


class RegisterUserSchema(BaseModel):
    username: str
    email: str
    password: Union[str, int] = None
    confirm_password: str

class LoginUserSchema(BaseModel):
    username: str
    password: Union[str, int] = None


class ForgotPassword(BaseModel):
    email:str

class ResetPassword(BaseModel):
    reset_password_token: str
    new_password: Union[str, int] = None
    confirm_password: Union[str, int] = None
    

class CreateBlog(BaseModel):
    title: str
    body: str
    author: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str