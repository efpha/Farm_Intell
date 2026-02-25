import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X, Leaf } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, default 4000
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Hook ────────────────────────────────────────────────────────────────────

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG: Record<
  ToastType,
  {
    icon: React.FC<{ className?: string }>;
    bar: string;       // progress bar color
    iconColor: string;
    bg: string;
    border: string;
    title: string;
  }
> = {
  success: {
    icon: CheckCircle,
    bar: "bg-emerald-500",
    iconColor: "text-emerald-500",
    bg: "bg-white/95",
    border: "border-emerald-200",
    title: "text-emerald-800",
  },
  error: {
    icon: XCircle,
    bar: "bg-red-500",
    iconColor: "text-red-500",
    bg: "bg-white/95",
    border: "border-red-200",
    title: "text-red-800",
  },
  warning: {
    icon: AlertTriangle,
    bar: "bg-amber-400",
    iconColor: "text-amber-500",
    bg: "bg-white/95",
    border: "border-amber-200",
    title: "text-amber-800",
  },
  info: {
    icon: Info,
    bar: "bg-sky-400",
    iconColor: "text-sky-500",
    bg: "bg-white/95",
    border: "border-sky-200",
    title: "text-sky-800",
  },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 4000;
  const cfg = CONFIG[toast.type];
  const Icon = cfg.icon;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mount animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Progress bar countdown
  useEffect(() => {
    const step = 100 / (duration / 50);
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(intervalRef.current!);
          handleDismiss();
          return 0;
        }
        return p - step;
      });
    }, 50);
    return () => clearInterval(intervalRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 350);
  };

  return (
    <div
      style={{
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: visible && !leaving ? "translateX(0) scale(1)" : "translateX(110%) scale(0.92)",
        opacity: visible && !leaving ? 1 : 0,
      }}
      className={`
        relative w-80 rounded-2xl border shadow-xl backdrop-blur-sm overflow-hidden
        ${cfg.bg} ${cfg.border}
      `}
      role="alert"
    >
      {/* Subtle leaf watermark */}
      <div className="absolute -right-3 -top-3 opacity-5 pointer-events-none">
        <Leaf className="h-16 w-16 text-emerald-600 rotate-12" />
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${cfg.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${cfg.title}`}>{toast.title}</p>
          {toast.message && (
            <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{toast.message}</p>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full bg-gray-100">
        <div
          className={`h-full transition-all ease-linear ${cfg.bar}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ─── Provider ────────────────────────────────────────────────────────────────

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((opts: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...opts, id }]);
  }, []);

  const success = useCallback((title: string, message?: string) => toast({ type: "success", title, message }), [toast]);
  const error   = useCallback((title: string, message?: string) => toast({ type: "error",   title, message }), [toast]);
  const warning = useCallback((title: string, message?: string) => toast({ type: "warning", title, message }), [toast]);
  const info    = useCallback((title: string, message?: string) => toast({ type: "info",    title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}

      {/* Toast Stack — fixed, top-right */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};