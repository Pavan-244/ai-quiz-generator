import os
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
import pymysql

# -------------------------------
# Load Config from Environment
# -------------------------------
MYSQL_HOST = os.getenv("MYSQL_HOST", "localhost")
MYSQL_USER = os.getenv("MYSQL_USER", "root")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD", "")
MYSQL_DB = os.getenv("MYSQL_DB", "ai_quiz_db")
MYSQL_PORT = int(os.getenv("MYSQL_PORT", 3306))

# Raw MySQL connection URL WITHOUT choosing database
BASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}"

# Full database URL
DATABASE_URL = f"{BASE_URL}/{MYSQL_DB}"


# ----------------------------------------------------
# 1️⃣ Create database if not exists
# ----------------------------------------------------
def ensure_database_exists():
    try:
        conn = pymysql.connect(
            host=MYSQL_HOST,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            port=MYSQL_PORT
        )
        conn.autocommit(True)

        with conn.cursor() as cur:
            cur.execute(f"CREATE DATABASE IF NOT EXISTS {MYSQL_DB}")
        conn.close()
        print(f"[OK] Database '{MYSQL_DB}' is ready.")
    except Exception as e:
        print("❌ Failed to ensure database exists:", e)
        raise


# Call function before engine initialization
ensure_database_exists()


# ----------------------------------------------------
# 2️⃣ Initialize SQLAlchemy
# ----------------------------------------------------
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=False  # Change to True for debugging SQL
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()


# ----------------------------------------------------
# 3️⃣ Quiz Table Schema
# ----------------------------------------------------
class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(500))
    title = Column(String(300))
    date_generated = Column(DateTime, default=datetime.utcnow)

    # Use LONGTEXT for large Wikipedia scraped data
    scraped_content = Column(Text)          # LONGTEXT
    full_quiz_data = Column(Text)           # LONGTEXT


# ----------------------------------------------------
# 4️⃣ Create tables if not exist
# ----------------------------------------------------
def init_db():
    print("[OK] Creating tables if not present...")
    Base.metadata.create_all(bind=engine)


init_db()


# ----------------------------------------------------
# 5️⃣ Dependency for FastAPI
# ----------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
