from pydantic import BaseModel


class RegisterUserSchema(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

class LoginUserSchema(BaseModel):
    username: str
    password: str


class ForgotPassword(BaseModel):
    email:str

class ResetPassword(BaseModel):
    reset_password_token: str
    new_password:str
    confirm_password:str
