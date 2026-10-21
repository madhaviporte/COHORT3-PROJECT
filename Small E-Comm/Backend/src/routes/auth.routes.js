/**
 * Auth Routes
 *
 * Maps HTTP methods + paths → [ validators ] → validate → controllers
 *
 * Route summary:
 *   POST /api/auth/register      → Register new user
 *   POST /api/auth/login         → Login, get tokens
 *   POST /api/auth/refresh-token → Exchange refresh cookie for new access token
 *   POST /api/auth/logout        → Logout (requires valid access token)
 *   GET  /api/auth/me            → Get current user profile (requires token)
 *
 * Rate limiting is applied to /login to prevent brute-force attacks.
 */

import express from "express";
import rateLimit from "express-rate-limit";

import { register, login, refreshToken, logout, getMe } from "../controllers/auth.controller.js";
import { registerValidators, loginValidators } from "../validators/auth.validators.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// ---------------------------------------------------------------------------
// Login rate limiter: max 10 attempts per 15 minutes per IP
// Prevents brute-force password guessing
// ---------------------------------------------------------------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,  // Include rate limit info in headers
  legacyHeaders: false,
});

// POST /api/auth/register
router.post(
  "/register",
  registerValidators,  // 1. Run express-validator checks
  validate,            // 2. If errors exist, return 400. Otherwise continue.
  register             // 3. Actually register the user
);

// POST /api/auth/login
router.post(
  "/login",
  loginLimiter,        // Rate limit first
  loginValidators,     // Validate fields
  validate,            // Return 400 if invalid
  login                // Process login
);

// POST /api/auth/refresh-token
// No auth required — this is how a logged-out session gets restored
router.post("/refresh-token", refreshToken);

// POST /api/auth/logout
// authenticate checks the Bearer token before running logout
router.post("/logout", authenticate, logout);

// GET /api/auth/me
router.get("/me", authenticate, getMe);

export default router;
