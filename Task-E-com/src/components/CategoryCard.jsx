import { Link } from "react-router-dom";
import { Laptop, Shirt, Sparkles, Home, Dumbbell, Watch } from "lucide-react";

const iconMap = {
  Laptop: Laptop,
  Shirt: Shirt,
  Sparkles: Sparkles,
  Home: Home,
  Dumbbell: Dumbbell,
  Watch: Watch,
};

export default function CategoryCard({ category }) {
  const IconComp = iconMap[category.icon] || Laptop;

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center justify-center gap-4 bg-white/3 border border-white/6 rounded-2xl p-6 sm:p-7 hover:border-neon/25 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: category.color + "12", color: category.color }}
      >
        <IconComp size={28} strokeWidth={1.5} />
      </div>
      <span className="text-sm font-semibold text-white group-hover:text-neon transition-colors">
        {category.name}
      </span>
      <span className="text-xs text-gray-500">{category.count} items</span>
    </Link>
  );
}
