from pydantic import BaseModel


class RegisterUserSchema(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

class LoginUserSchema(BaseModel):
    username: str
    password: str



