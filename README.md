---

# 🧠 AI Wiki Quiz Generator

Transform any **Wikipedia article** into an interactive **AI-generated quiz** using **FastAPI + Google Gemini + React + MySQL**.

---

## 📌 Features

* 🔍 **Scrape Wikipedia** pages automatically
* 🧠 **Generate 10 MCQs** using Google Gemini (gemini-2.0-flash)
* 📝 Each question includes:
  ✔ Question text
  ✔ 4 options
  ✔ Correct answer
  ✔ Difficulty
* 🗂 **Quiz History** stored in MySQL
* 🎨 **Frontend:** React + Tailwind CSS
* 🌐 **Backend:** FastAPI (Python 3.11)
* 🔄 **Fallback AI generator** ensures quiz generation even if Gemini API fails
* 📊 **View previous quizzes** anytime

---

## 📁 Project Structure

```ai-quiz-generator/
├── backend/
│   ├── venv/                       # Python Virtual Environment
│   ├── database.py                 # SQLAlchemy setup and Quiz model
│   ├── models.py                   # Pydantic Schemas for LLM output (QuizOutput)
│   ├── scraper.py                  # Functions for fetching and cleaning Wikipedia HTML
│   ├── llm_quiz_generator.py       # LangChain setup, prompt templates, and chain logic
│   ├── main.py                     # FastAPI application and API endpoints
│   ├── requirements.txt            # List of all Python dependencies
│   └── .env                        # API keys and environment variables
|
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI parts (e.g., QuizCard, TabButton, Modal)
│   │   │   ├── QuizDisplay.jsx     # Reusable component for rendering generated quiz data
│   │   │   └── HistoryTable.jsx
│   │   ├── services/
│   │   │   └── api.js              # Functions for communicating with the FastAPI backend
│   │   ├── tabs/
│   │   │   ├── GenerateQuizTab.jsx
│   │   │   └── HistoryTab.jsx
│   │   ├── App.jsx                 # Main React component, handles tab switching
│   │   └── index.css               # Tailwind directives and custom styles
│   ├── package.json
|
└── README.md                       # Project Setup, Endpoints, and Testing Instructions

```

---

# 🔧 Backend Setup (FastAPI)

### 1️⃣ Create Virtual Environment

```sh
cd backend
python -m venv venv
venv\Scripts\activate
```

### 2️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### ✔ requirements.txt (pinned versions)

```
fastapi
uvicorn[standard]
sqlalchemy
PyMySQL
beautifulsoup4
requests
python-dotenv

google-genai
langchain-core
langchain-community
langchain-google-genai
pydantic
pydantic-settings```

---

## ⚙️ Create `.env` File

```
GEMINI_API_KEY=YOUR_KEY_HERE
DATABASE_URL=mysql+pymysql://root:root@localhost/quizdb
FRONTEND_URL=http://localhost:5173
```

---

## ▶️ Run Backend

```
uvicorn main:app --reload
```

---

# 🎨 Frontend Setup (React + Tailwind)

### Install deps

```
cd frontend
npm install
```

### Run app

```
npm run dev
```

---

# 📡 API Endpoints

### Generate Quiz

```
POST /generate_quiz
{
  "url": "https://en.wikipedia.org/wiki/Kabaddi",
  "n_questions": 10
}
```

### Get History

```
GET /history
```

### Get Specific Quiz

```
GET /quiz/{id}
```

---

# ☁️ Deployment Guide

## Backend → **Render**

1. Create a new **Web Service**
2. Select Python
3. Build command:

```
pip install -r requirements.txt
```

4. Start command:

```
uvicorn main:app --host 0.0.0.0 --port 10000
```

5. Add environment variables (.env)
---
---
* 📁 **GitHub Repo:** [https://github.com/yourname/ai-quiz-generator](https://github.com/Pavan-244/ai-quiz-generator/new/main?filename=README.md)
---
