import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";
import QuantitySelector from "./QuantitySelector";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-5 sm:gap-6 bg-dark-card border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-white/[0.1] transition-all duration-200">
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#0e0e0e] shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] text-neon font-semibold uppercase tracking-widest mb-1">
                {item.category}
              </p>
              <h3 className="text-sm sm:text-[15px] font-semibold text-white truncate">
                {item.name}
              </h3>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all duration-200 shrink-0"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => dispatch(increaseQuantity(item.id))}
            onDecrease={() => dispatch(decreaseQuantity(item.id))}
          />
          <p className="text-xl font-bold text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
