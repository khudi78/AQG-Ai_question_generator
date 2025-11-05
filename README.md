# 🧠 AI Question Generator & Proctored Examination System  

![Made with React](https://img.shields.io/badge/Frontend-ReactJS-blue?logo=react)  
![Backend Node](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)  
![Database MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)  
![AI Powered](https://img.shields.io/badge/AI-OpenAI%20API-orange?logo=openai)  

---

## 🚀 Overview  

The **AI Question Generator** is an intelligent web-based platform that **automatically generates question papers and answers** using AI.  
Users can specify **topic**, **difficulty level**,**question type** and **question count** to create a customized exam and for studying purpose.  

The system also includes an integrated  **Proctored Examination Environment**, and **Admin/User Report Review** panel — ensuring a secure, interactive, and personalized exam experience.  

---

## 🧩 Key Features  

### 🧮 **AI Question Paper Generation**
- Automatically generates **questions and answers** based on input topic and difficulty.  
- Categorizes questions into **Easy**, **Medium**, and **Hard**.  
- Uses **OpenAI API / NLP models** for intelligent question creation.   

### 🧍‍♀️ **Proctored Examination System**
- Includes **secure user authentication (JWT)**.  
- Detects **suspicious activity** using camera-based monitoring.  
- Logs **behavioral data** (e.g., tab switch, idle time, focus loss).  

### 📊 **Reports & Analytics**
- Generates **scorecards** with marks, accuracy, and question analysis.    
- **Admin dashboard** for report review and analytics visualization.  

---

## 🛠️ Tech Stack  

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | ReactJS, Tailwind CSS, Axios, React Router, Framer Motion |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI/ML** | OpenAI API, NLP |
| **Authentication** | JWT, Bcrypt|
| **Utilities** | Multer, JSON Web Tokens, dotenv |

---

## 📈 Workflow

- User logs in using authentication (JWT or OTP).
- User inputs topic & difficulty level → AI generates a question set.
- Exam begins under proctored mode (camera + behavior monitoring).
- After submission, AI evaluates and generates score & behavior reports.
- Admins can view reports, analytics, and user history.
