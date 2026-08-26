import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import {
  setSearch,
  setCategory,
  setPriceRange,
  setMinRating,
  setSortBy,
  resetFilters,
  selectFilteredProducts,
} from "../redux/productSlice";
import { categories } from "../data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
];

export default function Shop() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const { search, selectedCategory, priceRange, minRating, sortBy } = useSelector(
    (state) => state.products
  );
  const filteredProducts = useSelector(selectFilteredProducts);

  // Apply URL params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const sort = searchParams.get("sort");
    if (cat) dispatch(setCategory(cat));
    if (sort) dispatch(setSortBy(sort));
  }, [searchParams, dispatch]);

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Shop</h1>
          <p className="text-base text-gray-400">
            Browse our curated collection of premium products
          </p>
        </div>

        {/* Search + Sort + Filter toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={(val) => dispatch(setSearch(val))}
              placeholder="Search products..."
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white focus:border-neon/40 focus:ring-1 focus:ring-neon/20 focus:outline-none cursor-pointer transition-all duration-200"
              aria-label="Sort products"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                showFilters
                  ? "bg-neon/10 border-neon/25 text-neon"
                  : "bg-white/[0.03] border-white/[0.06] text-gray-300 hover:text-white hover:bg-white/[0.05]"
              }`}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} strokeWidth={1.8} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-10 lg:gap-12">
          {/* Sidebar Filters - Desktop / Mobile Drawer */}          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-72 xl:w-80 shrink-0`}>
            <div className="lg:sticky lg:top-28 space-y-7">
              {/* Reset */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-neon transition-colors"
                >
                  <RotateCcw size={12} strokeWidth={2} /> Reset
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Category
                </h4>
                <div className="space-y-1.5">
                  <button
                    onClick={() => dispatch(setCategory("All"))}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                      selectedCategory === "All"
                        ? "bg-neon/10 text-neon font-medium"
                        : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => dispatch(setCategory(cat.name))}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        selectedCategory === cat.name
                          ? "bg-neon/10 text-neon font-medium"
                          : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {cat.name}{" "}
                      <span className="text-gray-600 text-xs">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1200"
                    value={priceRange[1]}
                    onChange={(e) =>
                      dispatch(setPriceRange([priceRange[0], parseInt(e.target.value)]))
                    }
                    className="w-full accent-neon h-1.5"
                    aria-label="Maximum price"
                  />
                  <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Minimum Rating
                </h4>
                <div className="space-y-1.5">
                  {[0, 3, 3.5, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => dispatch(setMinRating(r))}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        minRating === r
                          ? "bg-neon/10 text-neon font-medium"
                          : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {r === 0 ? "All ratings" : `${r}★ & above`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-8 font-medium">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
            <ProductGrid
              products={filteredProducts}
              emptyMessage="No products match your filters. Try adjusting them."
            />
          </div>
        </div>
      </main>
    </div>
  );
}
