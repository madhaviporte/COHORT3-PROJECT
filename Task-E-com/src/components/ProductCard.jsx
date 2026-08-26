import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative bg-dark-card border border-white/[0.06] rounded-2xl overflow-hidden hover:border-neon/25 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(163,230,53,0.06)]">
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#0e0e0e]">
          {!imgLoaded && <div className="absolute inset-0 skeleton" />}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-neon text-dark text-[11px] font-bold px-2.5 py-1 rounded-lg">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute top-3 right-3 bg-blue-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              New
            </span>
          )}
        </div>

        {/* Info — use space-y-4 for generous breathing room */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-[11px] text-neon font-semibold uppercase tracking-widest">
            {product.category}
          </p>
          <h3 className="text-sm sm:text-[15px] font-semibold text-white line-clamp-2 group-hover:text-neon transition-colors min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>
          <Rating rating={product.rating} reviews={product.reviews} />
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex items-center gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 bg-neon hover:bg-neon-hover text-dark text-sm font-semibold min-h-[44px] px-5 py-3 rounded-xl transition-all duration-200 active:scale-[0.97]"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart size={15} strokeWidth={2.2} />
          Add to Cart
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`p-3 rounded-xl border transition-all duration-200 ${
            liked
              ? "bg-red-500/10 border-red-500/25 text-red-400"
              : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12]"
          }`}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={16} strokeWidth={1.8} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
