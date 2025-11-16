# llm_quiz_generator.py
import os
import json
from dotenv import load_dotenv
from typing import Dict, Any
from google import genai

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)


def fallback_quiz(title: str, text: str, url: str, n: int = 10) -> Dict[str, Any]:
    sentences = [s.strip() for s in text.split(".") if s.strip()]
    questions = []

    for i in range(1, n + 1):
        s = sentences[(i - 1) % len(sentences)] if sentences else "No content available."
        questions.append({
            "id": i,
            "type": "multiple_choice",
            "question": s[:120],
            "choices": ["A", "B", "C", "D"],
            "correct_answer": "A",
            "difficulty": "easy"
        })

    return {
        "source_url": url,
        "title": title,
        "summary": text[:250],
        "questions": questions
    }


def generate_quiz(title: str, text: str, url: str, n_questions: int = 10):

    prompt = f"""
Generate STRICT JSON ONLY.

Create exactly {n_questions} multiple-choice questions from this article:

TITLE: {title}

CONTENT:
{text}

Rules:
- Exactly {n_questions} questions
- Each question 1–2 lines
- Each has 4 choices
- Each has correct_answer
- Difficulty: easy/medium/hard
- Include 2–3 sentence summary

JSON format:
{{
  "source_url": "{url}",
  "title": "{title}",
  "summary": "",
  "questions": [
    {{
      "id": 1,
      "type": "multiple_choice",
      "question": "",
      "choices": ["A", "B", "C", "D"],
      "correct_answer": "",
      "difficulty": ""
    }}
  ]
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config={
                "temperature": 0.2,
                "max_output_tokens": 4096,
                "response_mime_type": "application/json"
            }
        )

        raw = response.text

        if not raw or raw.strip() == "":
            raise ValueError("Gemini returned empty output")

        return json.loads(raw)

    except Exception as e:
        print("⚠️ Gemini failed, using fallback. Reason:", e)
        return fallback_quiz(title, text, url, n_questions)
