/**
 * Auth Validators
 *
 * express-validator rules for each authentication endpoint.
 * Each export is an array of validator checks that runs before the controller.
 *
 * Why validate here (server-side)?
 *   - Client-side validation can be bypassed with Postman, curl, or browser DevTools.
 *   - Server-side validation is the real security boundary.
 *
 * Structure:
 *   router.post('/register', registerValidators, validate, registerController)
 *                             ^^^^^^^^^^^^^^^^^
 *                             Exported from this file
 */

import { body } from "express-validator";

// ---------------------------------------------------------------------------
// Registration Validators
// Validates: name, email, password, confirmPassword
// ---------------------------------------------------------------------------
export const registerValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(), // Converts "User@Gmail.com" → "user@gmail.com"

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      // Check that confirmPassword matches password
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

// ---------------------------------------------------------------------------
// Login Validators
// Validates: email, password
// ---------------------------------------------------------------------------
export const loginValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
