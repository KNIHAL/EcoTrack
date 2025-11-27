# EcoTrack – Smart Waste Management Platform

EcoTrack is a modern, efficient, and scalable waste‑management platform built to empower **citizens**, **staff**, **authorities**, and **system administrators** to collaborate and keep cities cleaner.

This project was developed as a full‑stack, AI‑assisted solution demonstrating how modern frameworks and cloud technologies can solve real‑world civic challenges.

---

## 🚀 Features

### 👤 Citizen

* Submit waste reports with description & location
* Track report status in real‑time
* Clean and intuitive dashboard

### 🛠 Staff

* View all citizen reports
* Accept assigned reports
* Update progress: *Pending → In‑Progress → Resolved*
* Lightweight and responsive UI

### 🏛 Authority

* Handle staff registration requests
* Approve / reject staff accounts
* Oversee staff activity

### 🧑‍💼 System Admin

* Manage and approve authority accounts
* System‑level control for onboarding authorities

---

## 🔐 Test Login Accounts

> Use these accounts during review/testing.

### **Admin**

* **Email:** `admin@example.com`
* **Password:** `123456`

### **Authority**

* **Email:** `authority@example.com`
* **Password:** `123456`

### **Staff**

* **Email:** `staff@example.com`
* **Password:** `123456`

### **Citizen**

* **Email:** `citizen@example.com`
* **Password:** `123456`

---

## 🧩 Tech Stack

* **Next.js 14** – Framework
* **Firebase Auth** – Authentication
* **Firebase Firestore** – NoSQL database
* **TailwindCSS** – Styling
* **React Hooks** – Frontend logic

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/KNIHAL/ecotrack.git
cd ecotrack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=yourKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yourDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=yourProject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yourBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=senderId
NEXT_PUBLIC_FIREBASE_APP_ID=appId
```

### 4. Run the App

```bash
npm run dev
```

---

## 🌐 Deployment (Vercel)

EcoTrack is fully optimized for **Vercel**.

Steps:

1. Import GitHub repo into Vercel
2. Add environment variables
3. Deploy — Done 🎉

---

## 📘 Project Structure

```
ecotrack/
├── app/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   │   ├── citizen/
│   │   ├── staff/
│   │   └── authority/
│   └── page.tsx
├── components/
├── lib/
├── public/
└── README.md
```

---

## 🧠 Why EcoTrack?

EcoTrack addresses real-world challenges in waste reporting by providing:

* Transparency
* Faster cleanup workflow
* Multi‑role collaboration
* Real civic impact

---

## 🔮 Future Enhancements

* AI-powered waste classification
* Google Maps integration
* Waste hotspot prediction
* Chatbot assistant for authorities and staff

---

## 🙌 Credits

Developed by **Nihal & AI Assistant** as part of a modern AI-driven full‑stack development workflow.

EcoTrack — *Together, we keep our cities cleaner.* 🌱
