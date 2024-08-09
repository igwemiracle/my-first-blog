import datetime
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from authenticate.hash_pwd import HashPassword 
from database.connection import get_db
from models.sqlDATA import User
from sqlalchemy import select, insert, text


hashThisPassword = HashPassword()

async def createRegisteredUser(username: str, email: str, hashed_password: str, db: AsyncSession):
    new_user = User(username=username, email=email, hash_password=hashed_password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

async def findUserExist(email: str, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.email == email)
    result = await db.execute(query)
    return result.scalar()

# async def createResetCode(email:str, reset_code:str, db:AsyncSession=Depends(get_db)):
#     query = insert(ResetCode).values(
#         email=email,
#         reset_code=reset_code,
#         status='1', 
#         expired_in=datetime.datetime.utcnow()
#         )
#     await db.execute(query)
#     await db.commit()


# async def check_reset_password_token(reset_password_token: str, db: AsyncSession = Depends(get_db)):
#     query = text(
#         "SELECT * FROM py_code WHERE status = '1' AND reset_code = :reset_password_token"
#         " AND expired_in >= datetime('now', '-10 minutes', 'utc')"
#     )
#     result = await db.execute(query, {"reset_password_token": reset_password_token})
#     # return result.fetchone()
#     return result.fetchall()


# async def reset_password(new_hashed_password:str, email:str, db:AsyncSession):
#     query = text("UPDATE signin SET hash_password=:hash_password WHERE email=:email ")
#     return await db.execute(query, {"hash_password":new_hashed_password, "email":email})

# import logging


# # This function just simply disables the reset code that the user uses to reset their password
# # to ensure it cannot be used again.
# async def disable_reset_code(reset_password_token: str, email: str, db: AsyncSession):
#     try:
#         query = text("UPDATE py_code SET status='9' WHERE status='1' AND reset_code=:reset_code AND email=:email")
#         result = await db.execute(query, {"reset_code": reset_password_token, "email": email})
#         await db.commit()
#         return result
#     except Exception as e:
#         logging.error(f"Error disabling reset code: {e}")
#         await db.rollback()  # Rollback changes in case of an error
#         raise
