from pydantic import BaseModel

class UserCreateRequest(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str


