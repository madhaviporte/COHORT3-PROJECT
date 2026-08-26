import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <Link
      to="/home"
      className={`flex items-center gap-2.5 select-none ${className}`}
      aria-label="SkyMart Home"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-neon text-dark font-bold">
        <Zap size={22} fill="currentColor" strokeWidth={0} />
      </span>
      <span className="text-xl font-bold tracking-tight">
        <span className="text-white">Sky</span>
        <span className="text-neon">Mart</span>
      </span>
    </Link>
  );
}
