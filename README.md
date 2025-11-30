# UMD FileShare

UMD FileShare is a MERN-stack web application designed to help University of Maryland students upload, browse, and share course-related files.
The platform supports user authentication, file organization by course, and a clean UI with both desktop and mobile navigation.

---

## 🚀 Features

### 🔐 Authentication

* User signup and login (JWT-based)
* Protected routes
* Auto-redirect on login and logout

### 📁 File Sharing

* Upload notes, past exams, homework solutions, and other resources
* View/upload files categorized by UMD course
* Only logged-in users can access course pages

### 💻 Responsive UI

* Desktop menu + mobile hamburger menu
* Login/Logout/Signup buttons adjust depending on auth status
* Built with TailwindCSS

### ⚙️ Backend (Node.js + Express)

* REST API for authentication and file data
* Password hashing with bcrypt
* JWT token generation and validation
* MongoDB storage (via Mongoose)
* Supabase storage for files

### 🗄️ Frontend (React)

* React Router navigation
* Token stored in localStorage
* Conditional rendering based on logged-in state

---

## 📦 Tech Stack

**Frontend**

* React (Vite)
* React Router
* TailwindCSS

**Backend**

* Node.js
* Express
* Mongoose (MongoDB)
* Supabase
* bcryptjs
* jsonwebtoken

---

## 📂 Project Structure

```
/Frontend
  /app
    /components
      auth/
        authInput.tsx
        authLayout.tsx
      header/
        desktopMenu.tsx
        mobileMenu.tsx
        hamburgerBtn.tsx
        navbar.tsx
      footer.tsx
      homeFeatures.tsx
    routes/
      courses/
        index.tsx
        name.tsx
      dashboard.tsx
      home.tsx
      login.tsx
      notFound.tsx
      signup.tsx

/Backend
  /controllers
    authController.js
    courseController.js
  /middleware
    authMiddleware.js
  /routes
    authRoutes.js
    courseRoutes.js
  /models
    Course.js
    File.js
    User.js
  server.js
  supabaseClient.js
```

---
## 📄 License
MIT License
