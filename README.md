# ✨ Lucida — Adaptive Reading Environment

Lucida is a modern, frontend-focused web application designed to improve reading comfort, accessibility, and focus through real-time typographic adjustments and guided reading.

---

## 🚀 Overview

Reading on digital screens is often tiring due to poor layout, spacing, and lack of personalization.

**Lucida solves this by adapting text to the user** — dynamically adjusting typography and guiding reading flow to reduce cognitive load and improve comprehension.

---

## 🎯 Key Features

- 🔡 **Adaptive Typography**
  - Adjust font size, spacing, and layout in real-time

- 🎯 **Focus Mode**
  - Highlights words dynamically to guide reading

- 🧠 **Cognitive Optimization**
  - Reduces eye strain and improves readability

- ♿ **Dyslexia Support**
  - Includes dyslexia-friendly fonts and spacing

- ⚡ **Real-Time Updates**
  - No re-render lag using CSS variables

- 🌙 **Modern UI**
  - Dark theme with glassmorphism design

---

## 🖥️ Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Storage:** localStorage (no backend)

## Folder Structure 
---
src/
│
├── components/
│ ├── workspace/
│ ├── auth/
│ ├── ui/
│
├── pages/
│ ├── LandingPage.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Workspace.jsx
│
├── store/
│ └── useStore.js
│
└── App.jsx
---

---

## 🔐 Authentication

- Basic login/register system using **localStorage**
- Users are redirected to workspace after login
- Protected route for workspace

---

## 🌐 Routing

- `/` → Landing Page  
- `/login` → Login Page  
- `/register` → Register Page  
- `/workspace` → Main App  

---

## 📱 Responsiveness

- Fully responsive across:
  - Mobile 📱
  - Tablet 📲
  - Desktop 💻

- Adaptive layouts:
  - Grid → Stack on smaller screens
  - Scroll demo optimized for mobile

---

## 🎬 Demo Flow

1. Hero section introduces the concept  
2. Scroll-based section demonstrates features  
3. Feature cards explain capabilities  
4. CTA leads to workspace  

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/your-username/lucida.git

# Navigate
cd lucida

# Install dependencies
npm install

# Run dev server
npm run dev

---

## 📂 Project Structure
