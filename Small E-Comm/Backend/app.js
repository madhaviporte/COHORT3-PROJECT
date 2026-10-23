/**
 * app.js — Express Application Setup
 *
 * This file creates and configures the Express app.
 * It does NOT start the server (that's server.js's job).
 *
 * Order matters for middleware:
 *   1. CORS       — must be first so preflight requests are handled correctly
 *   2. Body parsers / cookie-parser
 *   3. Routes
 *   4. 404 handler   — catches any request that didn't match a route
 *   5. Error handler  — catches all errors passed via next(err)
 */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import errorHandler from "./src/middleware/errorhandler.js";

const app = express();

// ---------------------------------------------------------------------------
// Trust proxy — REQUIRED in deployment (Render, Heroku, Vercel, etc.)
// Behind a hosting proxy, Express sees the proxy's IP as the client unless
// it is told how many proxy hops to trust. Without this setting:
//   1. req.ip is the SAME proxy IP for every visitor, so the login rate
//      limiter would count all users together (10 logins / 15 min for the
//      entire deployment) and lock everyone out with 429.
//   2. express-rate-limit logs an ERR_ERL_UNEXPECTED_X_FORWARDED_FOR error.
// Value "1" = trust exactly one proxy hop (the hosting provider's router),
// which is the recommended, least-permissive setting. With no proxy locally,
// req.ip still resolves to the real socket address, so dev is unchanged.
// ---------------------------------------------------------------------------
app.set("trust proxy", 1);

// ---------------------------------------------------------------------------
// CORS Configuration
// Allows only the frontend origin to make requests with credentials (cookies).
// Credentials: true is required for httpOnly cookies to be sent cross-origin.
//
// CSRF note: We use sameSite cookies + require Authorization header on mutations.
// A CSRF attack from another origin cannot forge the Authorization header, so
// state-changing endpoints are protected even on the cookie-based refresh route.
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: process.env.FRONTEND_URL,  // e.g. "http://localhost:5173"
    credentials: true,                  // Allow cookies to be sent/received
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies (e.g., { "email": "...", "password": "..." })
app.use(express.json());

// Parse URL-encoded form bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests (needed for the refresh token cookie)
app.use(cookieParser());

// ---------------------------------------------------------------------------
// Health check route — useful for deployment monitoring
// ---------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running",
    version: "1.0.0",
  });
});

// ---------------------------------------------------------------------------
// API Routes
// All auth routes are prefixed with /api/auth
// All product routes are prefixed with /api/products
// ---------------------------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ---------------------------------------------------------------------------
// 404 Handler
// Catches any request that didn't match a defined route above
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ---------------------------------------------------------------------------
// Centralized Error Handler
// Must be last — runs when any middleware calls next(err)
// ---------------------------------------------------------------------------
app.use(errorHandler);

export default app;