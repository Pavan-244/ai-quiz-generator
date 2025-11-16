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

```
ai-quiz-generator/
│
├── backend/
│   ├── main.py
│   ├── scraper.py
│   ├── database.py
│   ├── llm_quiz_generator.py
│   ├── models.py
│   ├── .env
│   ├── requirements.txt
│   └── venv/
│
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── tailwind.config.js
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
aiohappyeyeballs==2.6.1
aiohttp==3.13.2
aiosignal==1.4.0
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.11.0
attrs==25.4.0
beautifulsoup4==4.14.2
cachetools==6.2.2
certifi==2025.11.12
charset-normalizer==3.4.4
click==8.3.0
colorama==0.4.6
cryptography==46.0.3
dataclasses-json==0.6.7
fastapi==0.121.2
filetype==1.2.0
frozenlist==1.8.0
google-ai-generativelanguage==0.9.0
google-api-core==2.28.1
google-auth==2.43.0
google-genai==1.50.1
greenlet==3.2.4
grpcio==1.76.0
grpcio-status==1.76.0
h11==0.16.0
httpcore==1.0.9
httptools==0.7.1
httpx==0.28.1
httpx-sse==0.4.3
idna==3.11
jsonpatch==1.33
jsonpointer==3.0.0
langchain-classic==1.0.0
langchain-community==0.4.1
langchain-core==1.0.5
langchain-google-genai==3.0.3
langchain-text-splitters==1.0.0
langsmith==0.4.43
marshmallow==3.26.1
multidict==6.7.0
numpy==2.3.4
orjson==3.11.4
packaging==25.0
proto-plus==1.26.1
protobuf==6.33.1
pydantic==2.12.4
pydantic-settings==2.12.0
pydantic_core==2.41.5
PyMySQL==1.1.2
python-dotenv==1.2.1
PyYAML==6.0.3
requests==2.32.5
rsa==4.9.1
sniffio==1.3.1
soupsieve==2.8
SQLAlchemy==2.0.44
starlette==0.49.3
tenacity==9.1.2
typing-extensions==4.15.0
urllib3==2.5.0
uvicorn==0.38.0
watchfiles==1.1.1
websockets==15.0.1
yarl==1.22.0
zstandard==0.25.0
```

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

## Frontend → **Netlify**

1. `npm run build`
2. Deploy `/dist` folder
3. Set environment variable:

```
VITE_API_URL=https://your-render-url
```

---

# 📘 Demo Resources (Placeholders)

Replace with your actual links:

* 📹 **Video Presentation:** [https://drive.google.com/…](https://drive.google.com/…)
* 🔥 **Live Demo:** [https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)
* 📦 **Backend API:** [https://your-render-service.onrender.com](https://your-render-service.onrender.com)
* 🧾 **Project Report PDF:** /docs/report.pdf
* 🗣 **Voice-over Script:** /docs/script.md
* 📁 **GitHub Repo:** [https://github.com/yourname/ai-quiz-generator](https://github.com/Pavan-244/ai-quiz-generator/new/main?filename=README.md)

---

If you want, I can also generate:

✅ **Project Report PDF**
✅ **Voice-over narration script**
✅ **Screenshots for GitHub**
✅ **API docs in Markdown**

Just tell me!
