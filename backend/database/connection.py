from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from models.sqlDATA import Base



SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///blogDB.sql"
engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

#  creates an asynchronous session factory.
SessionLocal = async_sessionmaker(engine)

# function is an asynchronous generator that yields a
#  database session and ensures it is properly closed after use.

# The Base.metadata.create_all method is used within the get_db() function to create the tables if they don't exist.
async def get_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

