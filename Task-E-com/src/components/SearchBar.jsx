import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products..." }) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        strokeWidth={1.8}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-11 pr-11 py-4 text-sm text-white placeholder-gray-500 focus:border-neon/40 focus:ring-1 focus:ring-neon/20 focus:outline-none transition-all duration-200"
        aria-label="Search products"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
