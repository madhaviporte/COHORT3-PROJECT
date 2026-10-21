# ShopHub — E-Commerce Product Management System

A full-stack MERN application for browsing and managing product listings with secure JWT authentication.

---

## Features

- 🔐 **JWT Auth** — 15-minute access tokens (in-memory) + 7-day refresh tokens (httpOnly cookies with hash rotation)
- 🛍️ **Product CRUD** — Create, read, update, delete products (ownership enforced)
- 🔍 **Search & Filter** — Real-time search with debouncing + category tabs
- 📄 **Pagination** — Server-side paginated product listing
- 👤 **Dashboard** — "My Products" view with stats for authenticated users
- 🛡️ **Security** — bcrypt passwords, CORS, rate limiting, express-validator

---

## Tech Stack

| Layer     | Technologies                                              |
|-----------|-----------------------------------------------------------|
| Frontend  | React 19 + Vite, React Router DOM v7, Axios              |
| Backend   | Node.js, Express.js 5, MongoDB Atlas, Mongoose            |
| Auth      | JWT (jsonwebtoken), bcryptjs, httpOnly cookies           |
| Validation| express-validator                                         |
| Other     | express-rate-limit, cookie-parser, cors, dotenv, nodemon |

---

## Project Structure

```
Small E-Comm/
├── Backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── product.controller.js
│   │   ├── middleware/
│   │   │   ├── authenticate.js
│   │   │   ├── errorhandler.js
│   │   │   └── validate.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── product.routes.js
│   │   └── validators/
│   │       ├── auth.validators.js
│   │       └── product.validators.js
│   ├── app.js
│   ├── server.js
│   ├── .env          (not committed)
│   └── .env.example
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── Pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── MyProducts.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── productService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── .env          (not committed)
│   └── .env.example
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js ≥ 18
- A MongoDB Atlas cluster (free tier works fine)

### 1. Clone / navigate to the project

```bash
cd "Small E-Comm"
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create `Backend/.env` (use `.env.example` as reference):

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>
ACCESS_TOKEN_SECRET=<generate with: node -e "require('crypto').randomBytes(64).toString('hex')|console.log">
REFRESH_TOKEN_SECRET=<same as above, different value>
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend setup

```bash
cd ../Frontend
npm install
```

Create `Frontend/.env` (use `.env.example` as reference):

```env
VITE_API_URL=http://localhost:3000
```

---

## Running the App

Open **two terminals**:

**Terminal 1 — Backend:**
```bash
cd Backend
npm run dev
# Server running on http://localhost:3000
```

**Terminal 2 — Frontend:**
```bash
cd Frontend
npm run dev
# App running on http://localhost:5173
```

---

## API Endpoints

### Auth  (`/api/auth`)

| Method | Path            | Access   | Description                           |
|--------|-----------------|----------|---------------------------------------|
| POST   | /register       | Public   | Register new user                     |
| POST   | /login          | Public   | Login, returns access token + cookie  |
| POST   | /refresh-token  | Public   | Exchange refresh cookie for new token |
| POST   | /logout         | Protected| Revoke token & clear cookie           |
| GET    | /me             | Protected| Get current user profile              |

### Products  (`/api/products`)

| Method | Path   | Access            | Description                         |
|--------|--------|-------------------|-------------------------------------|
| GET    | /      | Public            | List products (pagination, search)  |
| GET    | /:id   | Public            | Get single product                  |
| POST   | /      | Protected         | Create product                      |
| PUT    | /:id   | Protected (owner) | Update product                      |
| DELETE | /:id   | Protected (owner) | Delete product                      |

**Query parameters for `GET /api/products`:**

| Param    | Type   | Default | Description                |
|----------|--------|---------|----------------------------|
| page     | number | 1       | Page number                |
| limit    | number | 10      | Items per page (max 100)   |
| search   | string | —       | Search by name/description |
| category | string | —       | Filter by category name    |

---

## Testing the Application

1. Start backend (port 3000) and frontend (port 5173)
2. Open `http://localhost:5173`
3. Register a new account at `/register`
4. Log in at `/login`
5. Add a product at `/add-product`
6. Browse the catalog at `/`
7. Click a product title or image to see the detail page
8. Visit `/my-products` for your dashboard
9. Edit or delete products you own
10. Log out — session is cleared from cookies and memory

---

## Security Notes

- Passwords are **bcrypt-hashed** (salt rounds = 10) — never stored in plain text
- Access tokens live **in memory only** (React state) — not in localStorage
- Refresh tokens are stored as **bcrypt hashes** in MongoDB — raw token never persists
- Refresh token is sent via **httpOnly cookie** — JavaScript cannot read it
- Every successful refresh **rotates** the token (old one is immediately invalidated)
- Login endpoint is **rate-limited** (10 attempts / 15 min per IP)
- CORS is restricted to `http://localhost:5173` only
