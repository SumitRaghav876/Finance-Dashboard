# 💰 Finance Dashboard Backend

A production-ready RESTful backend API for a finance dashboard system — built with **Node.js**, **Express**, **MongoDB**, and **ES6 modules**. Designed with clean architecture, role-based access control, and real-world engineering practices.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Role-Based Access Control](#role-based-access-control)
- [API Reference](#api-reference)
- [Design Decisions](#design-decisions)
- [Security Practices](#security-practices)
- [Error Handling](#error-handling)
- [Assumptions Made](#assumptions-made)

---

## 🧠 Overview

This backend powers a multi-role finance dashboard where users can manage financial records and view analytics based on their access level.

**Core capabilities:**
- JWT-based authentication with secure password hashing
- Three-tier role system: `admin`, `analyst`, `viewer`
- Full CRUD for financial transactions with soft delete
- Aggregation-powered dashboard analytics (totals, trends, category breakdown)
- Input validation and centralized error handling

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES6 modules) |
| Framework | Express.js v5 |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| Validation | express-validator |
| Architecture | MVC + Service Layer |

---

## 📁 Project Structure

```
finance-backend/
├── src/
│   ├── app.js                        # Entry point
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── models/
│   │   ├── User.js                   # User schema with roles
│   │   └── Transaction.js            # Transaction schema with soft delete
│   ├── utils/
│   │   └── passwordPlugin.js         # Reusable Mongoose plugin for hashing
│   ├── services/
│   │   ├── authService.js            # Register, login, token signing
│   │   ├── transactionService.js     # Transaction business logic
│   │   └── dashboardService.js       # Aggregation analytics
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   └── dashboardController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── dashboardRoutes.js
│   └── middleware/
│       ├── auth.js                   # JWT verification
│       ├── authorize.js              # Role-based access control
│       ├── errorHandler.js           # Global error handler
│       ├── validate.js               # Validation result checker
│       └── validators.js             # Request validation rules
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd finance-backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Start server
npm start
```

Server starts at `http://localhost:3000`

### Health Check
```
GET /health
→ { "status": "ok", "message": "Server is running" }
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 🔐 Role-Based Access Control

Three roles with clearly defined permissions:

| Action | Viewer | Analyst | Admin |
|---|:---:|:---:|:---:|
| View transactions | ✅ | ✅ | ✅ |
| View recent activity | ✅ | ✅ | ✅ |
| View dashboard totals | ❌ | ✅ | ✅ |
| View category breakdown | ❌ | ✅ | ✅ |
| View monthly trends | ❌ | ✅ | ✅ |
| Create transactions | ❌ | ❌ | ✅ |
| Update transactions | ❌ | ❌ | ✅ |
| Delete transactions | ❌ | ❌ | ✅ |

RBAC is enforced via two middleware layers:
- `protect` — verifies JWT and attaches user to request
- `authorize(...roles)` — checks if user's role is permitted

---

## 📡 API Reference

Base URL: `/api/v1`

All protected routes require:
```
Authorization: Bearer <token>
```

---

### 🔑 Auth

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login and get token | ❌ |

**Register:**
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "<jwt_token>",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
}
```

---

### 💸 Transactions

| Method | Endpoint | Description | Roles |
|---|---|---|---|
| GET | `/transactions` | List all transactions | All |
| GET | `/transactions/:id` | Get single transaction | All |
| POST | `/transactions` | Create transaction | Admin |
| PATCH | `/transactions/:id` | Update transaction | Admin |
| DELETE | `/transactions/:id` | Soft delete transaction | Admin |

**Create Transaction:**
```json
POST /api/v1/transactions
Authorization: Bearer <token>
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2024-06-01",
  "description": "Monthly salary"
}
```

Valid types: `income`, `expense`

Valid categories: `salary`, `freelance`, `investment`, `business`, `food`, `transport`, `housing`, `healthcare`, `education`, `entertainment`, `utilities`, `shopping`, `travel`, `other`

---

### 📊 Dashboard

| Method | Endpoint | Description | Roles |
|---|---|---|---|
| GET | `/dashboard/totals` | Income, expense, net balance | Analyst, Admin |
| GET | `/dashboard/categories` | Spending by category | Analyst, Admin |
| GET | `/dashboard/trends/monthly` | Monthly income vs expense | Analyst, Admin |
| GET | `/dashboard/activity` | Recent transactions | All |

**Totals Response:**
```json
{
  "success": true,
  "data": {
    "totalIncome": 15000,
    "totalExpense": 6500,
    "netBalance": 8500
  }
}
```

**Monthly Trends Response:**
```json
{
  "success": true,
  "data": [
    { "_id": { "month": 6, "year": 2024 }, "total": 5000 },
    { "_id": { "month": 7, "year": 2024 }, "total": 3200 }
  ]
}
```

---

## 💡 Design Decisions

### 1. Service Layer Pattern
Business logic lives in services, not controllers. Controllers only handle HTTP (req/res). This makes logic reusable, maintainable, and easy to reason about as the app grows.

### 2. Reusable Mongoose Plugin
Password hashing is extracted into `passwordPlugin.js` — applied to any schema with one line. Follows the DRY principle and centralizes all password-related security logic in one place.

### 3. Soft Delete
Transactions are never permanently deleted — only flagged with `isDeleted: true`. Financial records need audit trails. Hard deletes would break historical reporting and compliance.

### 4. MongoDB Aggregation for Analytics
Dashboard analytics use MongoDB's aggregation pipeline instead of fetching all records into memory. This keeps computation close to the data and performs well at scale.

### 5. Centralized Error Handling
A single `errorHandler.js` middleware catches all errors. Controllers simply throw and the handler formats the response consistently — no duplicated error logic across the codebase.

### 6. `authorize()` as a Factory Function
```javascript
authorize('admin', 'analyst') // returns middleware dynamically
```
This pattern is flexible — any combination of roles can be enforced on any route without writing new middleware each time.

---

## 🔒 Security Practices

- Passwords hashed with **bcrypt** (salt rounds: 10)
- Password field has `select: false` — never returned in API responses
- JWT tokens expire in **7 days**
- Role validation enforced on every protected route
- Input sanitized and validated via `express-validator`
- User identity always taken from `req.user` (JWT), never trusted from `req.body`

---

## 📐 Error Handling

All errors follow a consistent response structure:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

Validation errors include field-level details:

```json
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Valid email is required" },
    { "field": "amount", "message": "Amount must be a positive number" }
  ]
}
```

| Status Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized — invalid or missing token |
| 403 | Forbidden — insufficient role |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📝 Assumptions Made

1. **Role assignment at registration** is open for testing purposes. In a production system, only admins would be able to assign roles to other users.
2. **Soft delete only** for transactions — financial data should never be permanently destroyed for audit and compliance reasons.
3. **All authenticated users see all transactions** — this is a shared company finance dashboard, not a personal finance app.
4. **Description is optional** on transactions — not all financial entries require additional notes.
