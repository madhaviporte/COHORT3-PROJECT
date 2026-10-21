/**
 * Validation Middleware
 *
 * This is a reusable middleware that runs AFTER express-validator checks.
 * It reads the validation results and, if any errors exist, sends a
 * consistent 400 error response. If validation passes, it calls next()
 * to allow the request to reach the controller.
 *
 * Usage:
 *   router.post('/register', registerValidators, validate, registerController)
 *                                                ^^^^^^^
 *                                          This runs here, between validators and controller
 */

import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  // validationResult() collects all errors added by express-validator
  const errors = validationResult(req);

  // If there are no errors, continue to the controller
  if (errors.isEmpty()) {
    return next();
  }

  // Format errors into a consistent structure the frontend can rely on:
  // { field: "email", message: "Please enter a valid email" }
  const formattedErrors = errors.array().map((error) => ({
    field: error.path,    // Which field caused the error
    message: error.msg,   // The human-readable error message
  }));

  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: formattedErrors,
  });
};

export default validate;
