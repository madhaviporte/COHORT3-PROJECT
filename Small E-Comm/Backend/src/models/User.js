/**
 * User Model
 *
 * Stores user credentials and a HASHED refresh token.
 * We NEVER store the plain refresh token — only its bcrypt hash.
 * This way, even if the database is breached, tokens cannot be reused.
 *
 * Fields:
 *  - name          : User's display name
 *  - email         : Unique, normalized email address
 *  - password      : bcrypt hash of the user's password (never plain text)
 *  - refreshTokenHash : bcrypt hash of the currently valid refresh token
 *                       (null when logged out)
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,        // MongoDB index — prevents duplicate accounts
      lowercase: true,     // Normalize to lowercase before saving
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      // Password is hashed before saving — see auth controller
    },

    // We store only the HASH of the refresh token, not the token itself.
    // On refresh, we compare the incoming token against this hash.
    // On logout, we set this to null to invalidate any existing refresh token.
    refreshTokenHash: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
