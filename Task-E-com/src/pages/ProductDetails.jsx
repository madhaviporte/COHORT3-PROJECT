import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { addToCart } from "../redux/cartSlice";
import Rating from "../components/Rating";
import ProductCard from "../components/ProductCard";
import QuantitySelector from "../components/QuantitySelector";
import { useToast } from "../components/Toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const allProducts = useSelector((state) => state.products.allProducts);

  const product = allProducts.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-xl text-gray-400 mb-5">Product not found</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-neon hover:underline text-sm font-semibold"
          >
            <ArrowLeft size={16} strokeWidth={2} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    addToast(`${product.name} added to cart!`, "success");
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} /> Back
        </button>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 mb-24">
          {/* Image */}
          <div className="bg-dark-card border border-white/[0.06] rounded-3xl overflow-hidden">
            <div className="aspect-square bg-[#0e0e0e]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-neon uppercase tracking-[0.2em] mb-6">
              {product.category}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white mb-6 tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="mb-10">
              <Rating rating={product.rating} reviews={product.reviews} size="md" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-12">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-neon bg-neon/10 px-3 py-1 rounded-lg">
                    -{product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-14">
              {product.description}
            </p>

            {/* Quantity + Actions */}
            <div className="flex items-center gap-4 mb-14">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => Math.min(q + 1, 99))}
                onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-neon hover:bg-neon-hover text-dark font-bold px-8 py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(163,230,53,0.12)]"
              >
                <ShoppingCart size={18} strokeWidth={2} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-white/[0.03] border border-neon/25 hover:bg-neon/10 text-neon font-bold px-8 py-4 rounded-2xl text-sm transition-all duration-200"
              >
                <Zap size={18} strokeWidth={2} />
                Buy Now
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  liked
                    ? "bg-red-500/10 border-red-500/25 text-red-400"
                    : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12]"
                }`}
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} strokeWidth={1.8} fill={liked ? "currentColor" : "none"} />
              </button>
              <button
                className="p-4 rounded-2xl border bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12] transition-all duration-200"
                aria-label="Share product"
              >
                <Share2 size={18} strokeWidth={1.8} />
              </button>
            </div>

            {/* Product info cards */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: ShieldCheck, label: "Secure Payment" },
                { icon: RotateCcw, label: "30-Day Returns" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center"
                >
                  <Icon size={20} strokeWidth={1.8} className="text-neon" />
                  <span className="text-[11px] font-medium text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
