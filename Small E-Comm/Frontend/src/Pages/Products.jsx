/**
 * Products.jsx — Product Listing Page
 *
 * Public page — shows all products in a paginated grid.
 * Features:
 *  - Search by name / description
 *  - Filter by category
 *  - Pagination
 *  - Loading, empty, and error states
 *  - Logged-in users see their own product's Edit/Delete actions (via ProductCard)
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService.js";
import { useAuth } from "../context/useAuth.js";
import ProductCard from "../components/ProductCard.jsx";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
  "Food",
  "Other",
];

const Products = () => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // debounced
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  // Debounce: wait 500ms after user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [category]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 9 };
      if (search) params.search = search;
      if (category !== "All") params.category = category;

      const data = await fetchProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [loadProducts]);

  // Remove a deleted product from the list without a reload
  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  return (
    <div className="products-page">
      {/* Page header */}
      <div className="products-header">
        <div>
          <h1>Product Catalog</h1>
          <p className="products-subtitle">
            {pagination ? `${pagination.totalCount} products available` : ""}
          </p>
        </div>
        {user && (
          <Link to="/add-product" className="btn-primary" id="add-product-btn">
            + Add Product
          </Link>
        )}
      </div>

      {/* Search and filter bar */}
      <div className="filter-bar">
        <input
          id="search-input"
          type="text"
          placeholder="🔍 Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`category-tab ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      {loading ? (
        <div className="state-container">
          <div className="spinner" />
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="state-container">
          <div className="alert alert-error">{error}</div>
          <button className="btn-primary" onClick={loadProducts}>
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="state-container empty-state">
          <span className="empty-icon">📦</span>
          <h3>No products found</h3>
          <p>
            {search || category !== "All"
              ? "Try a different search or category"
              : "Be the first to add a product!"}
          </p>
          {user && (
            <Link to="/add-product" className="btn-primary">
              Add Product
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Product grid */}
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleProductDeleted}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                id="prev-page-btn"
                className="page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination.hasPrevPage}
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                id="next-page-btn"
                className="page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
