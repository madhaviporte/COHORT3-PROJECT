/**
 * Auth Controller
 *
 * Handles all authentication logic:
 *   register     → POST /api/auth/register
 *   login        → POST /api/auth/login
 *   refreshToken → POST /api/auth/refresh-token
 *   logout       → POST /api/auth/logout
 *   getMe        → GET  /api/auth/me
 *
 * ─── Token Strategy (plain-English explanation) ─────────────────────────────
 *
 *  ACCESS TOKEN (15 min)
 *   • A JWT signed with ACCESS_TOKEN_SECRET.
 *   • Sent back in the JSON response body.
 *   • Frontend stores it in MEMORY only (a React state variable).
 *   • Sent on every protected API call as  "Authorization: Bearer <token>".
 *   • Because it's short-lived, even a stolen token is useful for < 15 min.
 *
 *  REFRESH TOKEN (7 days)
 *   • A cryptographically random 64-byte hex string — NOT a JWT.
 *   • Sent to the browser as an httpOnly cookie.
 *     → JavaScript code CANNOT read an httpOnly cookie (XSS protection).
 *   • Only its bcrypt HASH is stored in MongoDB.
 *     → Even if someone dumps the database, the raw token is unknown.
 *   • Used ONLY to obtain a new access token when the old one expires.
 *   • Every successful refresh ROTATES the token (issues a brand-new one).
 *     → Old token is immediately invalidated, limiting replay attacks.
 *
 * ─── CSRF Consideration ─────────────────────────────────────────────────────
 *  Cookie sameSite:"strict" (dev) / "none"+secure (prod cross-origin) prevents
 *  cross-site requests from including the cookie, which defends against CSRF.
 *  Protected mutations also require a valid JWT in the Authorization header,
 *  adding a second layer that a CSRF attack cannot provide.
 * ────────────────────────────────────────────────────────────────────────────
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";

// ---------------------------------------------------------------------------
// Cookie options — applied when setting AND clearing the refresh token cookie
// ---------------------------------------------------------------------------
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,                                             // No JS access
  secure: process.env.NODE_ENV === "production",              // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,                          // 7 days in ms
  path: "/",
};

// ---------------------------------------------------------------------------
// Helper — build a signed JWT access token
// Carries userId, name, email, and type="access"
// authenticate.js rejects any token where type !== "access"
// ---------------------------------------------------------------------------
const generateAccessToken = (user) =>
  jwt.sign(
    { userId: user._id, name: user.name, email: user.email, type: "access" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

// ---------------------------------------------------------------------------
// Helper — create an opaque random refresh token (NOT a JWT)
// crypto.randomBytes is cryptographically secure
// ---------------------------------------------------------------------------
const generateRefreshToken = () => crypto.randomBytes(64).toString("hex");

// ---------------------------------------------------------------------------
// Helper — bcrypt-hash a refresh token before DB storage
// ---------------------------------------------------------------------------
const hashToken = (token) => bcrypt.hash(token, 10);

// ===========================================================================
// POST /api/auth/register
// ===========================================================================
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // confirmPassword was already verified by registerValidators — ignore it here

    // Reject duplicate email with 409 Conflict
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // Hash password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    // Return 201 without password, hash, or any token
    return res.status(201).json({
      success: true,
      message: "Account created successfully. Please log in.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// POST /api/auth/login
// ===========================================================================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Generic 401 for both "user not found" and "wrong password"
    // This prevents user-enumeration (attacker can't tell which was wrong)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Issue tokens
    const accessToken = generateAccessToken(user);
    const rawRefreshToken = generateRefreshToken();

    // Cookie value format: "<userId>:<rawToken>"
    // This lets the refresh endpoint find the correct user to compare against
    const cookieToken = `${user._id}:${rawRefreshToken}`;

    // Store only the bcrypt hash of the raw token in the DB
    user.refreshTokenHash = await hashToken(rawRefreshToken);
    await user.save();

    // Send refresh token as httpOnly cookie — JavaScript cannot read this
    res.cookie("refreshToken", cookieToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,          // Frontend: store in React state / memory, NOT localStorage
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// POST /api/auth/refresh-token
// Called by the frontend Axios interceptor when a 401 is received
// ===========================================================================
export const refreshToken = async (req, res, next) => {
  try {
    const incomingToken = req.cookies.refreshToken;

    if (!incomingToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // The refresh token is an opaque hex string, NOT a JWT.
    // We cannot verify it without a DB lookup.
    // Strategy: we encode the userId inside the cookie value using a simple
    // separator so we know which user's hash to check.
    // Format stored in cookie:  "<userId>:<randomHexToken>"
    const separatorIndex = incomingToken.indexOf(":");
    if (separatorIndex === -1) {
      res.clearCookie("refreshToken", { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });
      return res.status(401).json({
        success: false,
        message: "Refresh token format invalid",
      });
    }

    const userId = incomingToken.substring(0, separatorIndex);
    const rawToken = incomingToken.substring(separatorIndex + 1);

    const user = await User.findById(userId);

    // User deleted or already logged out
    if (!user || !user.refreshTokenHash) {
      res.clearCookie("refreshToken", { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });
      return res.status(401).json({
        success: false,
        message: "Refresh token revoked or user not found",
      });
    }

    // Compare the submitted raw token against the stored bcrypt hash
    const isValid = await bcrypt.compare(rawToken, user.refreshTokenHash);

    if (!isValid) {
      // Hash mismatch → possible token reuse attack
      // Revoke all tokens for this user to force full re-login
      user.refreshTokenHash = null;
      await user.save();
      res.clearCookie("refreshToken", { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });
      return res.status(401).json({
        success: false,
        message: "Refresh token reuse detected. Please log in again.",
      });
    }

    // All good — ROTATE: issue a brand-new access + refresh token pair
    const newAccessToken = generateAccessToken(user);
    const newRawToken = generateRefreshToken();
    const newCookieToken = `${user._id}:${newRawToken}`;

    // Atomically replace the stored hash (old token is now invalid)
    user.refreshTokenHash = await hashToken(newRawToken);
    await user.save();

    res.cookie("refreshToken", newCookieToken, REFRESH_COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// POST /api/auth/logout
// Requires a valid access token → authenticate middleware runs first
// ===========================================================================
export const logout = async (req, res, next) => {
  try {
    // req.user is attached by authenticate middleware
    const user = await User.findById(req.user.id);

    if (user) {
      // Null out the hash → any existing refresh cookie is now useless
      user.refreshTokenHash = null;
      await user.save();
    }

    // Tell the browser to delete the cookie
    res.clearCookie("refreshToken", { ...REFRESH_COOKIE_OPTIONS, maxAge: 0 });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// GET /api/auth/me
// Returns the authenticated user's public profile
// ===========================================================================
export const getMe = async (req, res, next) => {
  try {
    // Exclude password and token hash from the DB result
    const user = await User.findById(req.user.id).select(
      "-password -refreshTokenHash"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
