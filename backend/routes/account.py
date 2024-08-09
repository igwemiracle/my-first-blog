from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi import Depends, APIRouter, Form, Request, status

account = APIRouter()
templates = Jinja2Templates(directory="templates")


@account.get("/account")
async def render_account_page(request: Request, username: str = None, loggedin: bool = False):
        return JSONResponse(
            {"request": request, "username": username, "loggedin": loggedin}
        )