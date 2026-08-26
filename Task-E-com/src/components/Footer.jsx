import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 lg:py-20 xl:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-5" />
            <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-xs">
              Premium e-commerce experience. Shop the future, today. Quality products, lightning-fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/home", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/about", label: "About" },
                { to: "/cart", label: "Cart" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-neon transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wide">Customer Service</h4>
            <ul className="space-y-3">
              {["Help Center", "Shipping Info", "Returns & Exchanges", "Order Tracking"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-500 hover:text-neon transition-colors duration-200 cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500">support@skymart.com</li>
              <li className="text-sm text-gray-500">+1 (555) 123-4567</li>
              <li className="text-sm text-gray-500">San Francisco, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            © 2026 SkyMart &middot; Built with React &middot; Redux &middot; Tailwind CSS
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-gray-600 hover:text-neon transition-colors duration-200" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-neon transition-colors duration-200" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-neon transition-colors duration-200" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
