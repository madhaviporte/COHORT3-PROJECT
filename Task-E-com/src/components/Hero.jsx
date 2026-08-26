import { Link } from "react-router-dom";
import { ArrowRight, Package, Truck } from "lucide-react";
import { useSelector } from "react-redux";

export default function Hero() {
  const { user } = useSelector((state) => state.auth);
  const greeting = new Date().getHours() < 12
    ? "Good Morning"
    : new Date().getHours() < 18
    ? "Good Afternoon"
    : "Good Evening";

  return (
    <section className="bg-dark-card border border-white/[0.06] rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 lg:gap-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-5">
          {greeting} ☀️
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15] mb-5 tracking-tight">
          Welcome back,{" "}
          <span className="text-neon">{user?.name || "Guest"}!</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed max-w-md">
          Discover today&apos;s picks &mdash; hand-curated products across electronics, fashion, and more.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-neon hover:bg-neon-hover text-dark font-semibold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(163,230,53,0.12)]"
          >
            Shop Now <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.03] text-white font-medium px-7 py-3.5 rounded-xl text-sm transition-all duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 shrink-0 w-full md:w-auto">
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 hover:border-neon/20 transition-all duration-300">
          <div className="w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center text-neon">
            <Package size={21} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xl font-bold text-white leading-tight">20+</p>
            <p className="text-xs text-gray-500 mt-0.5">Products available</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-5 py-4 hover:border-neon/20 transition-all duration-300">
          <div className="w-11 h-11 rounded-xl bg-neon/10 flex items-center justify-center text-neon">
            <Truck size={21} strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-xl font-bold text-white leading-tight">Free</p>
            <p className="text-xs text-gray-500 mt-0.5">Delivery over $50</p>
          </div>
        </div>
      </div>
    </section>
  );
}
