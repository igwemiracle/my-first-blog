from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header, status
from routes.crud import get_current_user
from models.schemas import CreateBlog
from sqlalchemy.ext.asyncio import AsyncSession
from database.connection import get_db
from models.sqlDATA import Blog, User
from sqlalchemy import select
from sqlalchemy.future import select
from starlette.config import Config

createBlog = APIRouter()

@createBlog.post("/auth/create_blog", status_code=status.HTTP_201_CREATED)
async def UserCreateBlog(
        create_blog: CreateBlog,
        db: AsyncSession = Depends(get_db),
        authorization: str = Header(None),
        current_user:User = Depends(get_current_user)):  
    
    if not authorization:
        raise HTTPException(status_code=404, detail="Missing Authorization header")
    
    new_blog = Blog(
        owner_id=current_user.id,
        author=current_user.username,  # Assign the logged-in user's username as the author
        title = create_blog.title,
        body = create_blog.body, 
    )
    db.add(new_blog)
    await db.commit()
    await db.refresh(new_blog)    
    return new_blog


@createBlog.get("/auth/blogs", response_model=List[CreateBlog])
async def get_blogs(db: AsyncSession = Depends(get_db)):
    blogs = await db.execute(select(Blog))
    users_blog = blogs.scalars().all()
    return users_blog



@createBlog.get("/auth/blogs/{id}", response_model=CreateBlog)
async def get_blog(id: int, db: AsyncSession = Depends(get_db)):
    query = select(Blog).where(Blog.id == id)
    result = await db.execute(query)
    blog = result.scalar_one_or_none()  # Extract the first result or None

    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found")

    return blog

@createBlog.delete("/auth/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(
        id: int,
        db: AsyncSession = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    query = select(Blog).filter(Blog.id == id, Blog.owner_id == current_user.id)
    result = await db.execute(query)
    blog = result.scalar_one_or_none()
    
    if blog is None:
        raise HTTPException(status_code=404, detail="Blog not found or not authorized to delete")
    
    await db.delete(blog)
    await db.commit()
    
    return {"detail": "Blog deleted successfully"}