# 🛍️ MERN E-Commerce Website

A full-stack E-Commerce web application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). This application provides a modern shopping experience with secure authentication, product management, shopping cart functionality, coupons, featured products, analytics dashboard, and an admin panel.

---

## 🚀 Live Demo

### Frontend
Coming Soon

### Backend API
Coming Soon

---

# 📸 Screenshots

> Add screenshots after deployment.

### Home Page
![Home](screenshots/home.png)

### Login Page
![Login](screenshots/login.png)

### Admin Dashboard
![Admin](screenshots/admin.png)

### Shopping Cart
![Cart](screenshots/cart.png)

---

# ✨ Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Secure Password Hashing

---

## 🛒 Shopping

- Browse Products
- View Product Details
- Product Categories
- Featured Products
- Shopping Cart
- Remove Items
- Update Cart
- Order Summary

---

## 🎁 Coupons

- Apply Discount Coupons
- Automatic Discount Calculation
- Coupon Validation

---

## 👨‍💼 Admin Panel

- Admin Login
- Create Products
- Delete Products
- Upload Product Images
- Toggle Featured Products
- View Analytics Dashboard

---

## 📊 Analytics

- Total Sales
- Total Revenue
- Total Products
- Total Users
- Daily Sales Graph

---

## 🖼️ Image Upload

- Cloudinary Integration
- Secure Image Storage
- Image Optimization

---

## ⚡ Performance

- Redis Caching
- Fast API Responses
- Optimized Database Queries

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Zustand
- Axios
- React Router DOM
- Lucide React
- Framer Motion

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Redis
- Cloudinary
- bcryptjs
- Cookie Parser
- Dotenv

---

# 📂 Project Structure

```
E-Commerce
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── lib
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── stores
│   │   └── lib
│   ├── package.json
│   └── vite.config.js
│
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Akash-bara/E-Commerce.git
```

Move into the project

```bash
cd E-Commerce
```

---

# Backend Setup

Move into backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

UPSTASH_REDIS_REST_URL=your_redis_url

UPSTASH_REDIS_REST_TOKEN=your_redis_token

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run backend

```bash
npm run dev
```

---

# Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

Backend will run at

```
http://localhost:5000
```

---

# API Endpoints

## Authentication

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
GET  /api/auth/profile
```

---

## Products

```
GET    /api/products
GET    /api/products/featured
GET    /api/products/category/:category
POST   /api/products
DELETE /api/products/:id
PATCH  /api/products/:id
```

---

## Cart

```
GET    /api/cart
POST   /api/cart
DELETE /api/cart
PUT    /api/cart
```

---

## Coupons

```
GET  /api/coupons
POST /api/coupons
```

---

## Analytics

```
GET /api/analytics
```

---

# Dependencies

## Backend

- Express
- Mongoose
- JWT
- bcryptjs
- Redis
- Cloudinary
- Cookie Parser
- Dotenv
- CORS

---

## Frontend

- React
- Tailwind CSS
- Axios
- Zustand
- Framer Motion
- Lucide React
- React Router DOM

---

# Security Features

- JWT Authentication
- HTTP Only Cookies
- Password Hashing
- Protected Routes
- Admin Authorization
- Environment Variables
- Secure API Access

---

# Future Improvements

- Stripe Payment Gateway
- Order History
- Wishlist
- Product Reviews
- Ratings
- Search Functionality
- Email Verification
- Forgot Password
- User Profile
- Inventory Management
- Order Tracking
- Dark Mode

---

# Learning Outcomes

Through this project, I gained hands-on experience with:

- MERN Stack Development
- REST API Design
- JWT Authentication
- MongoDB & Mongoose
- Cloudinary Integration
- Redis Caching
- Zustand State Management
- File Upload Handling
- Admin Dashboard Development
- Secure Authentication
- Full Stack Deployment

---

# Author

**Akash Bara**

GitHub

https://github.com/Akash-bara

LinkedIn

(Add your LinkedIn Profile)

---

# License

This project is licensed under the MIT License.

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!
