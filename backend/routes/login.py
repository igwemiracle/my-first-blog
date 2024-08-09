import asyncio
from fastapi import Depends, APIRouter, Form, Request, status
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse

from backend.authenticate import cookie_auth
from backend.authenticate.hash_pwd import HashPassword
from backend.database.connection import get_db
from routes import crud

hashThisPassword = HashPassword()


templates = Jinja2Templates(directory="templates")
login = APIRouter()



# @login.get("/auth/login")
# async def renderLoginPage(request: Request):
#     return templates.TemplateResponse("login.html", {"request": request})


@login.post("/auth/login")
async def loginPage(request: Request,
                    email: str = Form(...),
                    password: str = Form(...), db: AsyncSession = Depends(get_db)):
    user = await crud.findUserExist(email=email, db=db)
    if not user:
        await asyncio.sleep(5)
        error_message = "The account does not exist or the password is wrong."
        return JSONResponse(
            {{"error_message":error_message, "request":request }},
            status_code=status.HTTP_400_BAD_REQUEST
        )

    if not hashThisPassword.verify_hash(password, user.hash_password):
        error_message = "The account does not exist or the password is wrong."
        return JSONResponse(
            {{"error_message":error_message, "request":request }},
            status_code=status.HTTP_400_BAD_REQUEST
        )
    response = RedirectResponse(
        url=f"/account?username={user.username}&loggedin=True",  status_code=status.HTTP_302_FOUND)
    cookie_auth.set_auth(response, user.id)
    return response


@login.get("/auth/logout")
async def renderLogoutPage():
    response = RedirectResponse(
        url="/", status_code=status.HTTP_302_FOUND
    )
    cookie_auth.logout(response)
    return response
