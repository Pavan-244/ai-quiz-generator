# main.py
import os
import json
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from database import SessionLocal, Quiz, init_db
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz

load_dotenv()
init_db()

app = FastAPI(title="DeepKlarity Quiz Generator")

# -----------------------------------------------------
# CORS
# -----------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------
# Input model
# -----------------------------------------------------
class QuizInput(BaseModel):
    url: str
    n_questions: int = 10  # always 10, but user can send any

# -----------------------------------------------------
# DB dependency
# -----------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------------------------------
# Generate quiz
# -----------------------------------------------------
@app.post("/generate_quiz")
def create_quiz(payload: QuizInput, db: Session = Depends(get_db)):

    # 1. Scrape Wikipedia
    try:
        title, text = scrape_wikipedia(payload.url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch or parse URL: {e}")

    if not text or len(text.strip()) < 50:
        raise HTTPException(status_code=400, detail="Article is too short or cannot be parsed.")

    # 2. Generate quiz (10 questions always)
    quiz = generate_quiz(
        title=title,
        text=text,
        url=payload.url,
        n_questions=10
    )

    # 3. Save to DB
    try:
        row = Quiz(
            url=payload.url,
            title=title,
            scraped_content=text[:50000],  # avoid MySQL "Data too long" error
            full_quiz_data=json.dumps(quiz)
        )
        db.add(row)
        db.commit()
        db.refresh(row)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database save error: {e}")

    # 4. Return final response
    return {"id": row.id, "quiz": quiz}

# -----------------------------------------------------
# History route
# -----------------------------------------------------
@app.get("/history")
def history(db: Session = Depends(get_db)):
    rows = db.query(Quiz).order_by(Quiz.id.asc()).all()
    return [
        {
            "id": r.id,
            "url": r.url,
            "title": r.title,
            "date_generated": r.date_generated.isoformat()
        }
        for r in rows
    ]

# -----------------------------------------------------
# Get quiz by ID
# -----------------------------------------------------
@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    r = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Quiz not found")

    try:
        data = json.loads(r.full_quiz_data)
    except:
        data = {"raw": r.full_quiz_data}

    return {"id": r.id, "quiz": data}

@app.get("/")
def home():
    return {"message": "DeepKlarity Quiz Generator API is running"}
