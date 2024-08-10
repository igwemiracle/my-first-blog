from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import uvicorn
from routes.register import register
from routes.login import login
from routes.account import account


app = FastAPI()
app.include_router(register)
app.include_router(login)
app.include_router(account)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to match your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port="8000")

