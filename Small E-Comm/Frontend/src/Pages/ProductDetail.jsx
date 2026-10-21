/**
 * ProductDetail.jsx — Single Product Detail Page (Public)
 *
 * Displays full product info and lets the owner edit or delete.
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProduct, deleteProduct } from "../services/productService.js";
import { useAuth } from "../context/AuthContext.jsx";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data.product);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Product not found"
            : "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const isOwner = user && product?.createdBy?._id === user.id;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(id);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="state-container">
        <div className="spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-container">
        <div className="alert alert-error">{error}</div>
        <Link to="/" className="btn-primary">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button
        className="product-detail-back"
        onClick={() => navigate(-1)}
        id="back-btn"
      >
        ← Back
      </button>

      <div className="product-detail-grid">
        {/* Image */}
        <div className="product-detail-image-wrapper">
          <img
            src={product.image || DEFAULT_IMAGE}
            alt={product.name}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE;
            }}
          />
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <span className="detail-category">{product.category}</span>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-price">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-badges">
            <span
              className={`badge ${
                product.stock > 0 ? "badge-stock-ok" : "badge-stock-out"
              }`}
            >
              {product.stock > 0
                ? `✓ ${product.stock} in stock`
                : "✗ Out of stock"}
            </span>
          </div>

          <div className="detail-meta">
            <p className="detail-meta-row">
              Seller:{" "}
              <span>{product.createdBy?.name || "Unknown"}</span>
            </p>
            <p className="detail-meta-row">
              Listed:{" "}
              <span>
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>

          {isOwner && (
            <div className="detail-actions">
              <Link
                to={`/edit-product/${product._id}`}
                className="btn-primary"
                id={`detail-edit-${product._id}`}
              >
                ✏️ Edit Product
              </Link>
              <button
                className="btn-secondary"
                id={`detail-delete-${product._id}`}
                onClick={() => setShowConfirm(true)}
                disabled={deleting}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm dialog */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>
              Are you sure you want to delete{" "}
              <strong>{product.name}</strong>?
            </p>
            <div className="confirm-actions">
              <button
                className="btn-confirm-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
