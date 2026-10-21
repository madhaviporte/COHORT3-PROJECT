/**
 * Error Handler Middleware
 *
 * This is the LAST middleware registered in app.js.
 * Express recognizes a function with 4 parameters (err, req, res, next)
 * as an error handler. Any error passed to next(err) or thrown in async
 * code lands here.
 *
 * Security note: Stack traces and internal error details are NEVER sent
 * to the client in production. We log them server-side only.
 */

const errorHandler = (err, req, res, next) => {
  // Log the full error on the server for debugging
  console.error(`[Error] ${err.message}`);

  // In development, also print the stack trace — helpful for debugging
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // If the error came with a specific status code, use it; otherwise 500
  const statusCode = err.statusCode || err.status || 500;

  // Never expose internal details to the client in production
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Something went wrong. Please try again later."
      : err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
