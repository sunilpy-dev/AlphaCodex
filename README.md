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


Here are some demo 


<img width="1919" height="911" alt="Screenshot 2026-04-25 143814" src="https://github.com/user-attachments/assets/7ac55b5a-a3a3-43ab-8c3d-2c5283cb5584" />
<img width="1919" height="908" alt="Screenshot 2026-04-25 143754" src="https://github.com/user-attachments/assets/0e6aa793-4c1c-4e9e-8d94-a15f1f4e892f" />
<img width="1919" height="909" alt="Screenshot 2026-04-25 143829" src="https://github.com/user-attachments/assets/8db3ef29-5230-4f40-9241-024e42dd28d0" />
<img width="1919" height="907" alt="Screenshot 2026-04-25 143855" src="https://github.com/user-attachments/assets/237ab131-bfa5-48bd-bf09-f7492250098a" />







