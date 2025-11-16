
---

# 📘 AI-QUIZ-GENERATOR
🎯 AI-QUIZ-GENERATOR

Transform Wikipedia Articles into Interactive, AI-Powered Quizzes

<p align="center"> <img src="assets/logo.png" width="160"/> </p>

Transform Knowledge into Engaging, AI-Powered Quizzes

![GitHub last commit](https://img.shields.io/github/last-commit/Pavan-244/ai-quiz-generator?color=blue)
![Languages](https://img.shields.io/github/languages/count/Pavan-244/ai-quiz-generator)
![Top Language](https://img.shields.io/github/languages/top/Pavan-244/ai-quiz-generator?color=yellow)

### **Built with the tools and technologies:**

| Tech              | Badge                                                      |
| ----------------- | ---------------------------------------------------------- |
| JSON              | ![](https://img.shields.io/badge/JSON-blue)                |
| Markdown          | ![](https://img.shields.io/badge/Markdown-black)           |
| npm               | ![](https://img.shields.io/badge/npm-CB3837)               |
| SQLAlchemy        | ![](https://img.shields.io/badge/SQLAlchemy-red)           |
| FastAPI           | ![](https://img.shields.io/badge/FastAPI-009688)           |
| React             | ![](https://img.shields.io/badge/React-61DAFB)             |
| Python            | ![](https://img.shields.io/badge/Python-3776AB)            |
| Pydantic          | ![](https://img.shields.io/badge/Pydantic-ef4444)          |
| TailwindCSS       | ![](https://img.shields.io/badge/TailwindCSS-38BDF8)       |
| BeautifulSoup     | ![](https://img.shields.io/badge/BeautifulSoup4-darkgreen) |
| Google Gemini API | ![](https://img.shields.io/badge/Gemini%20API-black)       |

---

# 📑 Table of Contents

* [Overview](#overview)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [Usage](#usage)
* [Testing](#testing)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)
* [Tech Stack](#tech-stack)

---

# 🔍 Overview

**AI-Quiz-Generator** is an intelligent developer tool that converts **Wikipedia articles into structured quizzes** using:

* 🔍 **Web scraping (BeautifulSoup)**
* 🤖 **AI question generation (Google Gemini + LangChain)**
* 🗄️ **Persistent storage (MySQL)**
* ⚛️ **Modern UI (React + TailwindCSS)**

This project automates quiz creation by combining clean article extraction, structured output, and seamless APIs for quiz history and retrieval.

### ⭐ Why use AI-Quiz-Generator?

* 🎯 **AI-Powered Quiz Generation**: Automatically produces accurate multiple-choice questions.
* 📘 **Wikipedia Content Scraping**: Extracts clean and relevant article text.
* 🔗 **RESTful API Integration**: Generate quizzes and access history easily.
* 💾 **Persistent Storage**: MySQL ensures reliable quiz storage and retrieval.
* 🎨 **Modern Frontend**: A clean, fast, and interactive React UI.
  
### 📌 Features
* 🤖 AI-Powered Quiz Generation
* Uses Gemini 2.0 Flash API through LangChain to create high-quality MCQs with correct answers and difficulty levels.
* 📘 Wikipedia Scraping
* Cleans messy article text (removes references, tables, infoboxes) for accurate quiz generation.
* 🗄️ Persistent Storage (MySQL)
* Saves URL, scraped content, timestamp, and generated quiz JSON.
* 🧠 Quiz History
* Allows users to revisit any previously generated quiz.
* 🎨 Modern React Frontend
TailwindCSS UI with clean and responsive design.
---

# 🚀 Getting Started

## ✔️ Prerequisites

### **Backend Requirements**

* Python **3.11+**
* pip package manager
* MySQL database
* Gemini API Key

### **Frontend Requirements**

* Node.js (LTS)
* npm or yarn package manager

---

# 🛠 Installation

Clone the repository:

```bash
git clone https://github.com/Pavan-244/ai-quiz-generator
```

Navigate to the project root:

```bash
cd ai-quiz-generator
```

---

# ⚙️ Backend Setup

Navigate to backend:

```bash
cd backend
```

Install required packages:

```bash
pip install -r requirements.txt
```

Create a **.env** file:

```
GEMINI_API_KEY=YOUR_KEY
DATABASE_URL=mysql+pymysql://root:root@localhost/quizdb
FRONTEND_URL=http://localhost:5173
```

Run the backend server:

```bash
uvicorn main:app --reload
```

---

# 🎨 Frontend Setup

Navigate to frontend:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm run dev
```

---

# ▶️ Usage

➡️ Enter a **Wikipedia URL** in the Generate Quiz tab
➡️ Wait for AI processing
➡️ Quiz appears instantly
➡️ Check **History** tab for past quizzes
➡️ View stored quizzes inside modal popup

---

# 🧪 Testing

### Using pytest (Backend):

```bash
pytest
```

### Using npm (Frontend):

```bash
npm test
```

---

# 📂 Project Structure

```
ai-quiz-generator/
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

# 🔗 API Endpoints

### **POST /generate_quiz**

Generate a new quiz from a Wikipedia URL.

### **GET /history**

Returns all generated quizzes with ID, title, URL, and date.

### **GET /quiz/{id}**

Fetches a specific saved quiz from MySQL.

---

# 🧰 Tech Stack

### **Backend**

* FastAPI
* SQLAlchemy
* BeautifulSoup
* Google Gemini API
* LangChain
* Python 3.11

### **Frontend**

* React
* Tailwind CSS
* Fetch API
* Modal Components

### **Database**

* MySQL
Sure! Below is your **complete, production-ready README.md** with the **virtual environment section fully integrated** into the correct place and rewritten in a clean, professional GitHub style.

You can copy–paste this entire file directly into your repo as **README.md**.

---
---

# 🧰 Tech Stack

### **Backend**

* Python 3.11
* FastAPI
* LangChain
* Gemini API
* SQLAlchemy
* BeautifulSoup4

### **Frontend**

* React (Vite or CRA)
* TailwindCSS

### **Database**

* MySQL

---

# 🟦 Getting Started

## ✅ Prerequisites

Make sure you have installed:

* Python **3.11+**
* Node.js + npm
* MySQL Server

---

# 🐍 Backend Setup (Full Guide)

## ✔️ Step 1: Navigate to backend folder

```bash
cd backend
```

---

## ✔️ Step 2: Create Virtual Environment

### **Windows**

```bash
python -m venv venv
```

### **Linux/macOS**

```bash
python3 -m venv venv
```

---

## ✔️ Step 3: Activate Virtual Environment

### **Windows**

```bash
venv\Scripts\activate
```

### **Linux/macOS**

```bash
source venv/bin/activate
```

You will see:

```
(venv) C:\ai-quiz-generator\backend>
```

---

## ✔️ Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

If you install additional packages later:

```bash
pip freeze > requirements.txt
```

---

## ✔️ Step 5: Create `.env`

Create `backend/.env`:

```
GEMINI_API_KEY=YOUR_KEY_HERE
DATABASE_URL=mysql+pymysql://root:password@localhost/quizdb
FRONTEND_URL=http://localhost:5173
```

---

## ✔️ Step 6: Start Backend Server

```bash
uvicorn main:app --reload
```

Backend will run at:

👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)
👉 API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

# 🎨 Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React app:

```bash
npm run dev
```

Frontend runs at:

👉 [http://localhost:5173](http://localhost:5173)

---

# 🗄️ Database Setup (MySQL)

Create database:

```sql
CREATE DATABASE quizdb;
```

Backend automatically creates tables on startup.

---

# 🧪 API Endpoints

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| POST   | `/generate_quiz` | Generate quiz from Wikipedia URL  |
| GET    | `/history`       | View previously generated quizzes |
| GET    | `/quiz/{id}`     | Fetch a specific quiz             |

---

Show in your video:

1️⃣ Enter Wikipedia URL
2️⃣ Click Generate Quiz
3️⃣ View quiz with MCQs
4️⃣ Show history tab
5️⃣ View quiz from history
6️⃣ Show DB entries in MySQL Workbench

---

# 📝 License

MIT License.

---

# 🙌 Acknowledgements

* Google Gemini AI
* LangChain
* FastAPI
* TailwindCSS
* Wikipedia

---
