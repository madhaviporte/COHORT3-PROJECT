/**
 * MyProducts.jsx — User Dashboard / My Products Page (Protected)
 *
 * Shows the currently logged-in user's products with stats.
 * Provides quick access to edit and delete their own products.
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService.js";
import { useAuth } from "../context/useAuth.js";
import ProductCard from "../components/ProductCard.jsx";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // We fetch all products and filter client-side by user.id.
  // If the API supported a ?createdBy=me param, we'd use that instead.
  const loadMyProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch a large page to capture all user products
      const data = await fetchProducts({ page: 1, limit: 100 });
      const mine = (data.products || []).filter(
        (p) => p.createdBy?._id === user?.id
      );
      setProducts(mine);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your products");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMyProducts();
  }, [loadMyProducts]);

  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  // Compute stats
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const avgPrice =
    products.length > 0
      ? (
          products.reduce((sum, p) => sum + p.price, 0) / products.length
        ).toFixed(2)
      : "0.00";
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>My Products</h1>
          <p>Welcome back, {user?.name}! Here are your listings.</p>
        </div>
        <Link to="/add-product" className="btn-primary" id="dash-add-btn">
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      {!loading && !error && (
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total Listings</span>
            <span className="stat-value">{products.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Stock</span>
            <span className="stat-value">{totalStock}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Price</span>
            <span className="stat-value">${avgPrice}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Out of Stock</span>
            <span className="stat-value">{outOfStock}</span>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="state-container">
          <div className="spinner" />
          <p>Loading your products...</p>
        </div>
      ) : error ? (
        <div className="state-container">
          <div className="alert alert-error">{error}</div>
          <button className="btn-primary" onClick={loadMyProducts}>
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="state-container empty-state">
          <span className="empty-icon">📦</span>
          <h3>No products yet</h3>
          <p>Start by adding your first product listing.</p>
          <Link to="/add-product" className="btn-primary">
            + Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleProductDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
