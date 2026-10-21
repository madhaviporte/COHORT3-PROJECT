/**
 * App.jsx — Root Component
 *
 * Sets up routing for all pages.
 * Wraps everything in AuthProvider so any component can access auth state.
 *
 * Route structure:
 *   /                      → Products (public)
 *   /products/:id          → ProductDetail (public)
 *   /login                 → Login (public)
 *   /register              → Register (public)
 *   /add-product           → AddProduct (protected)
 *   /edit-product/:id      → EditProduct (protected)
 *   /my-products           → MyProducts / Dashboard (protected)
 *   *                      → NotFound (404)
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Products from "./Pages/Products.jsx";
import ProductDetail from "./Pages/ProductDetail.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AddProduct from "./Pages/AddProduct.jsx";
import EditProduct from "./Pages/EditProduct.jsx";
import MyProducts from "./Pages/MyProducts.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar appears on every page */}
        <Navbar />

        {/* Main content area — pushed down by fixed navbar */}
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes — wrapped in ProtectedRoute */}
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-products"
              element={
                <ProtectedRoute>
                  <MyProducts />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
