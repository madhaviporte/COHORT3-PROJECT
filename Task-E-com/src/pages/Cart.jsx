import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
} from "../redux/cartSlice";
import CartItem from "../components/CartItem";
import { useToast } from "../components/Toast";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const subtotal = totalPrice;
  const discount = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const delivery = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} strokeWidth={1.4} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
          <p className="text-base text-gray-400 mb-8 max-w-sm mx-auto">
            Looks like you haven&apos;t added anything yet. Start exploring our products!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2.5 bg-neon hover:bg-neon-hover text-dark font-semibold px-8 py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(163,230,53,0.12)]"
          >
            <ShoppingBag size={18} strokeWidth={2} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 lg:py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Shopping Cart</h1>
            <p className="text-base text-gray-400 mt-1">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <button
            onClick={() => {
              dispatch(clearCart());
              addToast("Cart cleared", "info");
            }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-xl transition-all duration-200"
          >
            <Trash2 size={14} strokeWidth={1.8} />
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Cart items */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-6"
            >
              <ArrowLeft size={14} strokeWidth={2} /> Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="bg-dark-card border border-white/[0.08] rounded-3xl p-8 lg:p-10 sticky top-28">
              <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

              <div className="space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-neon">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery</span>
                  <span className={delivery === 0 ? "text-neon font-medium" : "text-white font-medium"}>
                    {delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-white/[0.06] pt-4 mt-4 flex justify-between items-baseline">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-white text-2xl">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToast("Checkout coming soon!", "info");
                }}
                className="w-full mt-8 bg-neon hover:bg-neon-hover text-dark font-bold py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.98] shadow-[0_0_20px_rgba(163,230,53,0.12)]"
              >
                Checkout — ${total.toFixed(2)}
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                Free shipping on orders over $50
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
