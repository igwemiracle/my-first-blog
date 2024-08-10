from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import APIRouter
account = APIRouter()


@account.get("/account")
async def render_account_page(username: str = None, loggedin: bool = False):
    return JSONResponse({"username": username, "loggedin": loggedin})
