/**
 * Product Routes
 *
 * Maps HTTP methods + paths → [ validators ] → validate → authenticate → controllers
 *
 * Route summary:
 *   POST   /api/products      → Create product   (Protected)
 *   GET    /api/products      → List products    (Public, paginated)
 *   GET    /api/products/:id  → Get single product (Public)
 *   PUT    /api/products/:id  → Update product   (Protected, creator only)
 *   DELETE /api/products/:id  → Delete product   (Protected, creator only)
 */

import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  createProductValidators,
  updateProductValidators,
  productIdValidator,
  getProductsQueryValidators,
} from "../validators/product.validators.js";

import validate from "../middleware/validate.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

// POST /api/products — create (authenticated users only)
router.post(
  "/",
  authenticate,               // 1. Verify access token
  createProductValidators,    // 2. Validate request body
  validate,                   // 3. Return 400 if invalid
  createProduct               // 4. Create the product
);

// GET /api/products — public, supports pagination & search
router.get(
  "/",
  getProductsQueryValidators, // Validate page, limit, search, category
  validate,
  getProducts
);

// GET /api/products/:id — public
router.get(
  "/:id",
  productIdValidator,         // Validate :id is a valid ObjectId
  validate,
  getProduct
);

// PUT /api/products/:id — protected, creator only
router.put(
  "/:id",
  authenticate,
  updateProductValidators,    // Validates both :id and body fields
  validate,
  updateProduct
);

// DELETE /api/products/:id — protected, creator only
router.delete(
  "/:id",
  authenticate,
  productIdValidator,
  validate,
  deleteProduct
);

export default router;
