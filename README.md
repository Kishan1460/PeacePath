# Node.js Authentication API

A REST API built with Node.js, Express, MongoDB, JWT, and bcrypt for user authentication.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing with bcrypt
- MongoDB Integration
- Error Handling Middleware
- Request Logging with Morgan

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Morgan

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/auth-api.git
cd auth-api
```

### Install dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## API Endpoints

### Register User

**POST** `/api/users/register`

Request Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "_id": "123456",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "token": "jwt_token"
}
```

---

### Login User

**POST** `/api/users/login`

Request Body:

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

---

### Get User Profile

**GET** `/api/users/profile`

Headers:

```http
Authorization: Bearer <token>
```

---

## Project Structure

```text
project/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── userRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```



## Author

Kishan Bisht

Backend Authentication API built with Node.js and Express.