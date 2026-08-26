import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, emptyMessage = "No products found." }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5">
          <PackageSearch size={36} strokeWidth={1.4} className="text-gray-600" />
        </div>
        <p className="text-gray-400 text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
