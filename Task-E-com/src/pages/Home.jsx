import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  Star,
  Tag,
  Truck,
  ShieldCheck,
  BadgeCheck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { selectCartTotalQuantity, selectCartTotalPrice } from "../redux/cartSlice";
import { categories } from "../data/products";

export default function Home() {
  const allProducts = useSelector((state) => state.products.allProducts);
  const cartCount = useSelector(selectCartTotalQuantity);
  const cartPrice = useSelector(selectCartTotalPrice);

  const topRated = allProducts.filter((p) => p.isTopRated).slice(0, 6);
  const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 6);

  const features = [
    { icon: Truck, label: "Fast Delivery", sub: "Free shipping on orders $50+" },
    { icon: ShieldCheck, label: "Secure Payments", sub: "100% secure checkout" },
    { icon: BadgeCheck, label: "Best Prices", sub: "Price match guarantee" },
    { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-20 lg:space-y-24 pt-10 lg:pt-16 pb-20">
        {/* Hero */}
        <Hero />

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <StatsCard
            icon={<ShoppingCart size={20} strokeWidth={1.8} />}
            value={cartCount}
            label="Cart Items"
            sublabel="In your bag"
          />
          <StatsCard
            icon={<DollarSign size={20} strokeWidth={1.8} />}
            value={`$${cartPrice.toFixed(2)}`}
            label="Cart Value"
            sublabel="Total estimated"
          />
          <StatsCard
            icon={<Star size={20} strokeWidth={1.8} />}
            value={topRated.length}
            label="Top Products"
            sublabel="Highly rated"
          />
          <StatsCard
            icon={<Tag size={20} strokeWidth={1.8} />}
            value={categories.length}
            label="Categories"
            sublabel="Browse all"
          />
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Shop by Category</h2>
            <Link
              to="/shop"
              className="text-sm text-neon font-medium hover:underline flex items-center gap-1.5 group"
            >
              View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-7">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} category={cat} />
            ))}
          </div>
        </section>

        {/* Top Rated + New Arrivals side by side */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Top Rated */}
          <div className="bg-dark-card border border-white/[0.06] rounded-3xl p-8 sm:p-9">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                  <Star size={17} className="text-yellow-400" fill="currentColor" />
                </span>
                Top Rated
              </h2>
              <Link
                to="/shop?sort=rating"
                className="text-xs text-neon font-medium hover:underline flex items-center gap-1 group"
              >
                View All <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {topRated.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0e0e0e] shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-neon transition-colors">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-neon mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-500 shrink-0">{product.rating}★</span>
                </Link>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="bg-dark-card border border-white/[0.06] rounded-3xl p-8 sm:p-9">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-neon/10 flex items-center justify-center">
                  <Star size={17} className="text-neon" fill="currentColor" />
                </span>
                New Arrivals
              </h2>
              <Link
                to="/shop?sort=newest"
                className="text-xs text-neon font-medium hover:underline flex items-center gap-1 group"
              >
                View All <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {newArrivals.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0e0e0e] shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-neon transition-colors">
                      {product.name}
                    </p>
                    <p className="text-sm font-bold text-neon mt-1">${product.price.toFixed(2)}</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-neon/10 text-neon rounded-lg shrink-0">
                    New
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-6 hover:border-neon/15 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center text-neon shrink-0">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{sub}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
