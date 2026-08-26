import { Truck, ShieldCheck, Heart, Star, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Lightning-fast shipping on all orders. Free delivery on purchases over $50.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      desc: "Your data and payments are protected with industry-leading security.",
    },
    {
      icon: Heart,
      title: "Customer First",
      desc: "We prioritize your satisfaction above everything else. 30-day returns.",
    },
    {
      icon: Star,
      title: "Quality Products",
      desc: "Hand-picked, premium products that meet our rigorous quality standards.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-14 lg:py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold text-neon uppercase tracking-[0.2em] mb-6">About Us</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-7 tracking-tight leading-tight">
            About <span className="text-neon">SkyMart</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re on a mission to make premium products accessible to everyone.
            SkyMart is your destination for carefully curated electronics, fashion,
            beauty products, and more — all at competitive prices.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-dark-card border border-white/[0.06] rounded-3xl p-8 sm:p-10 lg:p-12 mb-20">
          <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">Our Mission</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-5 max-w-3xl">
            Founded in 2026, SkyMart was born from a simple idea: online shopping should
            be enjoyable, trustworthy, and accessible. We believe everyone deserves access
            to quality products without breaking the bank.
          </p>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
            Our team works tirelessly to source the best products from around the world,
            negotiate the best prices, and deliver them right to your doorstep with care.
            Every product on SkyMart is hand-selected for quality, value, and style.
          </p>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-12 text-center tracking-tight">Why Choose SkyMart</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-dark-card border border-white/[0.06] rounded-3xl p-7 sm:p-8 hover:border-neon/15 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-neon/10 flex items-center justify-center text-neon mb-5">
                  <Icon size={26} strokeWidth={1.6} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-dark-card border border-white/[0.06] rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20K+", label: "Products" },
              { value: "50K+", label: "Happy Customers" },
              { value: "4.9★", label: "Average Rating" },
              { value: "99%", label: "Satisfaction Rate" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-bold text-neon mb-2">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
