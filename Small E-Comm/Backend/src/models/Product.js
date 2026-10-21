/**
 * Product Model
 *
 * Represents a product in the e-commerce catalog.
 *
 * Fields:
 *  - name        : Product title (required)
 *  - description : Longer product description (required)
 *  - price       : Positive number (required)
 *  - category    : Category string, e.g. "Electronics" (required)
 *  - image       : Optional URL pointing to a product image
 *  - stock       : Non-negative integer; defaults to 0
 *  - createdBy   : Reference to the User who created this product
 *                  Used for authorization — only creator can edit/delete
 *  - timestamps  : Mongoose auto-adds createdAt / updatedAt
 */

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    // Optional image URL — validated in the validator layer
    image: {
      type: String,
      default: null,
    },

    // Stock cannot be negative
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number",
      },
    },

    // Which user created this product — used for authorization checks
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // Links to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
