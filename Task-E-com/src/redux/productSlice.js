import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: products,
    search: "",
    selectedCategory: "All",
    priceRange: [0, 1200],
    minRating: 0,
    sortBy: "featured",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.selectedCategory = "All";
      state.priceRange = [0, 1200];
      state.minRating = 0;
      state.sortBy = "featured";
    },
  },
});

export const {
  setSearch,
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
} = productSlice.actions;

export const selectFilteredProducts = (state) => {
  const { allProducts, search, selectedCategory, priceRange, minRating, sortBy } =
    state.products;

  let filtered = [...allProducts];

  // Search
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Category
  if (selectedCategory !== "All") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Price range
  filtered = filtered.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Rating
  if (minRating > 0) {
    filtered = filtered.filter((p) => p.rating >= minRating);
  }

  // Sort
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    default:
      // featured — top rated first
      filtered.sort((a, b) => (b.isTopRated ? 1 : 0) - (a.isTopRated ? 1 : 0));
  }

  return filtered;
};

export default productSlice.reducer;
