

 # Blogging Platform 
🚀 Project Overview

A full-stack blogging platform built with React.js, Node.js, Express, and MongoDB.

Allows users to create, read, update, and delete blog posts.

Supports user authentication, admin dashboard, comments, and profile management.

Features TailwindCSS UI, image uploads, and a fully functional admin panel.

# Tech Stack
Frontend

React.js

React Router

Redux Toolkit (Authentication state)

Axios

TailwindCSS

Backend

Node.js + Express

MongoDB + Mongoose

Multer (Image Upload)

JWT Authentication

CORS + Cookies

🔑 Core Features
👤 User Features

Register & Login (JWT-based authentication)

Upload profile picture

Update profile (name, password, profile image)

View single blog post

Add comments on posts

✍️ Blog Features

Add new blog (with image)

View latest posts

View all blog details

Responsive blog cards

Image hosting + static serving

🛠 Admin Features

Admin-only access using middleware

Create, update, delete blog posts

Manage users (view + delete)

Manage comments

Admin dashboard with analytics
📂 Project Structure
# Frontend
src/
 ├── Components/
 ├── Pages/
 ├── redux/
 ├── services/
 ├── Layout/
 └── App.jsx
# Backend
backend/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
🔐 Authentication
JWT stored in HTTP-Only Cookies

Protected routes for admin and logged-in users

Middlewares:

isLogin → Only logged-in users

isAdmin → Only admin role users

🖼 Image Uploading
multer used for uploading images

Images stored inside public/images/

Served via:

bash
Copy code
/images/<filename>
🌐 API Endpoints (Short Version)
Auth
POST /auth/register

POST /auth/login

POST /auth/logout

PATCH /auth/profile/:id

Blog
POST /blog/create

PATCH /blog/update/:id

DELETE /blog/delete/:id

GET /blog/GetPosts

Public
GET /public/singlepost/:id

Dashboard
GET /dashboard

GET /dashboard/users

DELETE /dashboard/delete/:id

🖥 Admin Dashboard
Total Users

Total Posts

Total Comments

Manage all posts

Manage all users

📦 Scripts (Frontend)
arduino
Copy code
npm install
npm run dev
📦 Scripts (Backend)
powershell
Copy code
npm install
npm start
⚙️ Environment Variables Required
makefile
Copy code
PORT=
MONGO_URI=
JWT_SECRET=
🧪 Testing
Postman for API testing

Check protected routes via JWT cookie

Image upload tests for blog + profile

📌 Deployment Notes
Serve images from /public/images

CORS must match hosting domain exactly
 └── index.js
