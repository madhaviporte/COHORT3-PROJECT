import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 99 }) {
  return (
    <div className="flex items-center border border-white/[0.08] rounded-xl overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>
      <span className="w-11 h-10 flex items-center justify-center text-sm font-semibold text-white bg-white/[0.03] border-x border-white/[0.06]">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
