/**
 * Product Controller
 *
 * Handles all product CRUD operations:
 *   createProduct  → POST   /api/products
 *   getProducts    → GET    /api/products  (paginated + searchable)
 *   getProduct     → GET    /api/products/:id
 *   updateProduct  → PUT    /api/products/:id
 *   deleteProduct  → DELETE /api/products/:id
 *
 * Authorization rule: only the user who CREATED a product can update/delete it.
 * This is checked by comparing product.createdBy with req.user.id.
 *
 * HTTP status codes used:
 *   201 Created       — new resource created
 *   200 OK            — successful read/update/delete
 *   400 Bad Request   — invalid input (e.g. empty update, bad data)
 *   401 Unauthorized  — no valid token
 *   403 Forbidden     — valid token but not the owner
 *   404 Not Found     — product doesn't exist
 *   500               — unexpected server error
 */

import Product from "../models/Product.js";

// Allowed fields for updates — prevents mass-assignment / unexpected fields
const ALLOWED_UPDATE_FIELDS = [
  "name",
  "description",
  "price",
  "category",
  "image",
  "stock",
];

// ===========================================================================
// POST /api/products  (Protected)
// ===========================================================================
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    // Associate the product with the logged-in user
    // req.user is set by the authenticate middleware
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: image || null,
      stock: stock !== undefined ? stock : 0,
      createdBy: req.user.id,
    });

    // Populate the creator's name/email so the response is more useful
    await product.populate("createdBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// GET /api/products  (Public)
// Supports: ?page=1&limit=10&search=keyword&category=Electronics
// ===========================================================================
export const getProducts = async (req, res, next) => {
  try {
    // Parse pagination params — use safe defaults if not provided
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    // Build a MongoDB query filter object
    const filter = {};

    // Text search: match name or description (case-insensitive regex)
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search.trim(), "i");
      filter.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    // Category filter (case-insensitive)
    if (req.query.category) {
      filter.category = new RegExp(`^${req.query.category.trim()}$`, "i");
    }

    // Run both queries in parallel for efficiency
    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .populate("createdBy", "name email") // Include creator info
        .sort({ createdAt: -1 })             // Newest first
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// GET /api/products/:id  (Public)
// ===========================================================================
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// PUT /api/products/:id  (Protected — creator only)
// ===========================================================================
export const updateProduct = async (req, res, next) => {
  try {
    // First, confirm the product exists
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Authorization: only the creator may update
    // .toString() is needed because product.createdBy is an ObjectId (not a string)
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    // Build the update object — only include allowed fields that were provided
    const updates = {};
    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Reject empty updates (nothing was actually provided in the request body)
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    // Apply updated and return the new document
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true } // new=true returns the updated doc
    ).populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ===========================================================================
// DELETE /api/products/:id  (Protected — creator only)
// ===========================================================================
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Authorization check — same as update
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
