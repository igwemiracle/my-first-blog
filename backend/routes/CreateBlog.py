from fastapi import APIRouter, Depends, HTTPException, status, Header
from authenticate.jwt_handler import create_access_token
from routes.crud import get_current_user, get_user
from models.schemas import CreateBlog
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from models.sqlDATA import Blog, User
from datetime import datetime

createBlog = APIRouter()

@createBlog.post("/auth/create_blog")
async def UserCreateBlog(
        create_blog: CreateBlog,
        db: AsyncSession = Depends(get_db),
        authorization: str = Header(None),
        current_user:User = Depends(get_current_user)):  

    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
      
    new_blog = Blog(
        title = create_blog.title,
        body = create_blog.body,
        author=current_user.username,  # Assign the logged-in user's username as the author
        owner_id=current_user.id,  
        date = datetime.now()
    )
    db.add(new_blog)
    await db.commit()
    await db.refresh(new_blog)
    return new_blog
