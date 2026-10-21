/**
 * productService.js — Product API Calls
 *
 * All functions that talk to /api/products/* live here.
 */

import api from "./api.js";

// GET /api/products — public, paginated
// params: { page, limit, search, category }
export const fetchProducts = async (params = {}) => {
  const response = await api.get("/api/products", { params });
  return response.data;
};

// GET /api/products/:id — public
export const fetchProduct = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// POST /api/products — protected
export const createProduct = async (productData) => {
  const response = await api.post("/api/products", productData);
  return response.data;
};

// PUT /api/products/:id — protected, creator only
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/api/products/${id}`, productData);
  return response.data;
};

// DELETE /api/products/:id — protected, creator only
export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};
