/**
 * AddProduct.jsx — Create New Product Page (Protected)
 *
 * Form fields: name, description, price, category, image URL, stock
 * On success: navigates to the product listing
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createProduct } from "../services/productService.js";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Food",
  "Other",
];

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    else if (form.description.trim().length < 10) errs.description = "Description must be at least 10 characters";
    if (!form.price) errs.price = "Price is required";
    else if (isNaN(form.price) || Number(form.price) <= 0) errs.price = "Price must be a positive number";
    if (!form.category) errs.category = "Please select a category";
    if (form.image && !/^https?:\/\/.+/.test(form.image)) errs.image = "Image must be a valid URL";
    if (form.stock !== "" && (isNaN(form.stock) || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock)))) {
      errs.stock = "Stock must be a non-negative whole number";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        category: form.category,
      };
      if (form.image.trim()) payload.image = form.image.trim();
      if (form.stock !== "") payload.stock = Number(form.stock);

      await createProduct(payload);
      navigate("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach(({ field, message }) => {
          backendErrors[field] = message;
        });
        setErrors(backendErrors);
      } else {
        setServerError(err.response?.data?.message || "Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-card-header">
          <h1>Add New Product</h1>
          <p>Fill in the details to list your product</p>
        </div>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form id="add-product-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="product-name">Product Name *</label>
            <input
              id="product-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="product-desc">Description *</label>
            <textarea
              id="product-desc"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your product in at least 10 characters..."
              rows={4}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Price and Stock row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="product-price">Price ($) *</label>
              <input
                id="product-price"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="1"
                className={errors.stock ? "input-error" : ""}
              />
              {errors.stock && <span className="field-error">{errors.stock}</span>}
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="product-category">Category *</label>
            <select
              id="product-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className={errors.category ? "input-error" : ""}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="field-error">{errors.category}</span>}
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="product-image">Image URL (optional)</label>
            <input
              id="product-image"
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
          </div>

          {/* Actions */}
          <div className="form-actions">
            <Link to="/" className="btn-secondary">Cancel</Link>
            <button
              id="create-product-submit"
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
