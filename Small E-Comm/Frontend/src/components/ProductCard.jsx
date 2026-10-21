/**
 * ProductCard.jsx
 *
 * Displays a single product in the grid.
 * If the logged-in user is the creator, shows Edit and Delete buttons.
 *
 * Props:
 *   product    : The product object from the API
 *   onDelete   : Callback function called when the product is deleted
 */

import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteProduct } from "../services/productService.js";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80";

const ProductCard = ({ product, onDelete }) => {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Check if the current user is the creator of this product
  const isOwner = user && product.createdBy?._id === user.id;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      onDelete(product._id); // Notify parent to remove from list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product");
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="product-card">
      {/* Product image — click goes to detail page */}
      <Link to={`/products/${product._id}`} className="card-image-wrapper" style={{ display: "block" }}>
        <img
          src={product.image || DEFAULT_IMAGE}
          alt={product.name}
          className="card-image"
          onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
        />
        <span className="card-category">{product.category}</span>
      </Link>

      {/* Product info */}
      <div className="card-body">
        <Link to={`/products/${product._id}`} style={{ textDecoration: "none" }}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <p className="card-desc">{product.description}</p>

        <div className="card-footer">
          <div className="card-meta">
            <span className="card-price">${Number(product.price).toFixed(2)}</span>
            <span className={`card-stock ${product.stock === 0 ? "out-of-stock" : ""}`}>
              {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
            </span>
          </div>

          {/* Only show edit/delete to the product's creator */}
          {isOwner && (
            <div className="card-actions">
              <Link
                to={`/edit-product/${product._id}`}
                className="btn-edit"
                id={`edit-${product._id}`}
              >
                ✏️ Edit
              </Link>
              <button
                className="btn-delete"
                id={`delete-${product._id}`}
                onClick={() => setShowConfirm(true)}
                disabled={deleting}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-dialog">
            <p>Are you sure you want to delete <strong>{product.name}</strong>?</p>
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

export default ProductCard;
