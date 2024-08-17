import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.register import register
from routes.login import login
from routes.account import account
from routes.PasswordReset import resetPassword
from routes.ForgotPassword import forgotPassword
from routes.CreateBlog import createBlog




app = FastAPI()
app.include_router(register)
app.include_router(login)
app.include_router(account)
app.include_router(resetPassword)
app.include_router(forgotPassword)
app.include_router(createBlog)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers (Content-Type, Authorization, etc.)
)





if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port="8000")
