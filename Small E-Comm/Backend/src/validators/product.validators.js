/**
 * Product Validators
 *
 * express-validator rules for Product CRUD endpoints.
 *
 * Validates:
 *  - createProductValidators  : POST /api/products
 *  - updateProductValidators  : PUT  /api/products/:id
 *  - productIdValidator       : Any route with :id param
 *  - getProductsQueryValidators : GET /api/products query params
 */

import { body, param, query } from "express-validator";
import mongoose from "mongoose";

// ---------------------------------------------------------------------------
// Helper: Check if a string is a valid MongoDB ObjectId
// Used in the custom() validator for :id route params
// ---------------------------------------------------------------------------
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// ---------------------------------------------------------------------------
// Validate :id route parameter
// Used on GET /api/products/:id, PUT /api/products/:id, DELETE /api/products/:id
// ---------------------------------------------------------------------------
export const productIdValidator = [
  param("id")
    .custom(isValidObjectId)
    .withMessage("Invalid product ID format"),
];

// ---------------------------------------------------------------------------
// Validate fields when CREATING a product (POST /api/products)
// All fields required except image
// ---------------------------------------------------------------------------
export const createProductValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative whole number"),
];

// ---------------------------------------------------------------------------
// Validate fields when UPDATING a product (PUT /api/products/:id)
// All fields are optional — but at least one must be provided (enforced in controller)
// ---------------------------------------------------------------------------
export const updateProductValidators = [
  param("id")
    .custom(isValidObjectId)
    .withMessage("Invalid product ID format"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),

  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative whole number"),
];

// ---------------------------------------------------------------------------
// Validate query parameters for GET /api/products (pagination + search)
// ---------------------------------------------------------------------------
export const getProductsQueryValidators = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search term is too long"),

  query("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category filter is too long"),
];
