import { useState, createContext, useContext, useCallback } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-24 right-5 z-[100] flex flex-col gap-3 max-w-sm w-[calc(100%-2.5rem)] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 bg-dark-card border border-white/[0.08] rounded-2xl px-5 py-4 shadow-2xl shadow-black/40 toast-enter"
          >
            {toast.type === "success" && <CheckCircle size={18} strokeWidth={2} className="text-neon shrink-0" />}
            {toast.type === "error" && <XCircle size={18} strokeWidth={2} className="text-red-400 shrink-0" />}
            {toast.type === "info" && <Info size={18} strokeWidth={2} className="text-blue-400 shrink-0" />}
            <p className="text-sm text-white flex-1 font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-500 hover:text-white transition-colors shrink-0 p-1"
              aria-label="Dismiss notification"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
