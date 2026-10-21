/**
 * EditProduct.jsx — Edit Existing Product Page (Protected)
 *
 * 1. Fetches the current product data on mount
 * 2. Pre-populates the form
 * 3. Submits only changed fields to PUT /api/products/:id
 * 4. Handles 404 (product not found) and 403 (not the owner)
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchProduct, updateProduct } from "../services/productService.js";

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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [originalForm, setOriginalForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load existing product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        const p = data.product;
        const formData = {
          name: p.name,
          description: p.description,
          price: String(p.price),
          category: p.category,
          image: p.image || "",
          stock: String(p.stock),
        };
        setForm(formData);
        setOriginalForm(formData);
      } catch (err) {
        if (err.response?.status === 404) {
          setFetchError("Product not found");
        } else {
          setFetchError("Failed to load product");
        }
      } finally {
        setFetching(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    else if (form.description.trim().length < 10) errs.description = "Must be at least 10 characters";
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

    // Only send fields that actually changed
    const updates = {};
    if (form.name !== originalForm.name) updates.name = form.name.trim();
    if (form.description !== originalForm.description) updates.description = form.description.trim();
    if (form.price !== originalForm.price) updates.price = Number(form.price);
    if (form.category !== originalForm.category) updates.category = form.category;
    if (form.image !== originalForm.image) updates.image = form.image.trim() || null;
    if (form.stock !== originalForm.stock) updates.stock = Number(form.stock);

    if (Object.keys(updates).length === 0) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      await updateProduct(id, updates);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 403) {
        setServerError("You are not authorized to edit this product");
      } else if (err.response?.status === 404) {
        setServerError("Product not found");
      } else if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach(({ field, message }) => {
          backendErrors[field] = message;
        });
        setErrors(backendErrors);
      } else {
        setServerError(err.response?.data?.message || "Failed to update product");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="state-container">
        <div className="alert alert-error">{fetchError}</div>
        <Link to="/" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="form-card-header">
          <h1>Edit Product</h1>
          <p>Update the fields you want to change</p>
        </div>

        {serverError && <div className="alert alert-error">{serverError}</div>}

        <form id="edit-product-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="edit-name">Product Name *</label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="edit-desc">Description *</label>
            <textarea
              id="edit-desc"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={errors.description ? "input-error" : ""}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Price and Stock */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-price">Price ($) *</label>
              <input
                id="edit-price"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="edit-stock">Stock</label>
              <input
                id="edit-stock"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                step="1"
                className={errors.stock ? "input-error" : ""}
              />
              {errors.stock && <span className="field-error">{errors.stock}</span>}
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="edit-category">Category *</label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-image">Image URL (optional)</label>
            <input
              id="edit-image"
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={errors.image ? "input-error" : ""}
            />
            {errors.image && <span className="field-error">{errors.image}</span>}
          </div>

          <div className="form-actions">
            <Link to="/" className="btn-secondary">Cancel</Link>
            <button
              id="update-product-submit"
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
