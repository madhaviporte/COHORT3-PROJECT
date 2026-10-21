/**
 * Authentication Middleware
 *
 * Protects routes that require a logged-in user.
 *
 * How it works:
 * 1. Looks for "Authorization: Bearer <token>" in the request header
 * 2. Verifies the JWT signature using ACCESS_TOKEN_SECRET
 * 3. Checks the token hasn't expired (tokens live for 15 minutes)
 * 4. Attaches safe user info (id, name, email) to req.user
 * 5. Calls next() so the controller can run
 *
 * If anything fails, sends 401 Unauthorized immediately.
 *
 * Usage:
 *   router.post('/products', authenticate, createProduct)
 *                             ^^^^^^^^^^^
 *                         Runs before controller
 */

import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    // Read the Authorization header
    const authHeader = req.headers.authorization;

    // Header must exist and follow "Bearer <token>" format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // Extract the token part (everything after "Bearer ")
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing",
      });
    }

    // Verify the token. This throws if:
    //   - the signature is wrong (tampered token)
    //   - the token has expired
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Extra safety: make sure this is actually an access token,
    // not a refresh token or some other JWT from a different system
    if (decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type",
      });
    }

    // Attach only the safe fields — never attach the full token payload
    // The controller can now read req.user.id, req.user.name, etc.
    req.user = {
      id: decoded.userId,
      name: decoded.name,
      email: decoded.email,
    };

    next(); // Hand off to the next middleware or controller
  } catch (error) {
    // JsonWebTokenError   → signature invalid / malformed
    // TokenExpiredError   → token past its expiry date
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token has expired",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};

export default authenticate;
