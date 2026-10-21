/**
 * server.js — Application Entry Point
 *
 * Responsibilities:
 *   1. Load environment variables from .env
 *   2. Validate that all required env vars exist (fail fast if missing)
 *   3. Connect to MongoDB
 *   4. Start the HTTP server
 *
 * We connect to the database BEFORE listening for requests.
 * This ensures the app never serves traffic without a database connection.
 */

import "dotenv/config";  // Must be first — loads .env before anything else
import app from "./app.js";
import connectDB from "./src/config/db.js";

// ---------------------------------------------------------------------------
// Environment variable validation
// If any required variable is missing, crash immediately with a clear message.
// This is much better than mysterious "undefined" errors later in the app.
// ---------------------------------------------------------------------------
const REQUIRED_ENV_VARS = [
  "PORT",
  "MONGODB_URI",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "FRONTEND_URL",
];

const missingVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
if (missingVars.length > 0) {
  console.error(
    `[Startup Error] Missing required environment variables: ${missingVars.join(", ")}`
  );
  console.error("Please check your .env file against .env.example");
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Start the server
// ---------------------------------------------------------------------------
const startServer = async () => {
  try {
    // Connect to MongoDB first — if this fails, we don't start the server
    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();