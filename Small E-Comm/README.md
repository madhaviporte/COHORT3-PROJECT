# ShopHub – E-Commerce Product Management System

ShopHub is a full-stack e-commerce application built using the MERN stack. It allows users to browse products, search and filter listings, and manage their own products after logging in.

I built this project to practice working with React, Express, MongoDB, and JWT-based authentication in a real-world application.

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcryptjs
- Access tokens and refresh tokens for session management
- Refresh tokens stored as hashes in the database and sent through HTTP-only cookies
- Browse products with search, category filters, and pagination
- Add, edit, and delete products
- Users can update or delete only their own products
- My Products dashboard for managing personal listings
- Form validation and error handling
- Protected routes for authenticated users
- Responsive interface for different screen sizes

## Tech Stack

**Frontend**
- React 19
- Vite
- React Router DOM
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

**Authentication and Security**
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- express-rate-limit
- cookie-parser
- CORS
- dotenv

## Project Structure

```text
Small E-Comm/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── validators/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── Pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm
- A MongoDB Atlas account and database

### 1. Get the project ready

Open a terminal in the project directory:

```bash
cd "Small E-Comm"
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder. Use `.env.example` as a reference and add your own MongoDB connection string and secrets.

Example configuration:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
FRONTEND_URL=http://localhost:5173
```

Generate separate secrets for the access and refresh tokens. Keep the actual values private and never commit your `.env` file to GitHub.

### 3. Set up the frontend

Open a second terminal in the project directory:

```bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Run the application

Start the backend from the `Backend` folder:

```bash
npm run dev
```

The backend should run at `http://localhost:3000`.

Start the frontend from the `Frontend` folder in a separate terminal:

```bash
npm run dev
```

Vite will display the local URL, usually `http://localhost:5173`.

Open that URL in your browser to use the application.

## API Endpoints

### Authentication

Base path: `/api/auth`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/register` | Public | Create an account |
| POST | `/login` | Public | Log in |
| POST | `/refresh-token` | Cookie required | Refresh the access token |
| POST | `/logout` | Protected | Log out |
| GET | `/me` | Protected | Get the logged-in user's profile |

### Products

Base path: `/api/products`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/` | Public | Get the product list |
| GET | `/:id` | Public | Get a product by ID |
| POST | `/` | Protected | Create a product |
| PUT | `/:id` | Product owner | Update a product |
| DELETE | `/:id` | Product owner | Delete a product |

### Product Listing Query Parameters

The product listing endpoint supports the following parameters:

| Parameter | Default | Purpose |
|---|---|---|
| `page` | `1` | Select the page |
| `limit` | `10` | Set the number of products