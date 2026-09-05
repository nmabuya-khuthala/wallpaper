'use client';

import React, { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle2 size={18} className="text-[#2D5016]" />,
    error:   <AlertCircle size={18} className="text-[#E05A4A]" />,
    info:    <Info size={18} className="text-[#1B4F8C]" />,
  };

  const bgMap: Record<ToastType, string> = {
    success: 'bg-white border-l-4 border-[#2D5016]',
    error:   'bg-white border-l-4 border-[#E05A4A]',
    info:    'bg-white border-l-4 border-[#1B4F8C]',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg animate-fade-in-up',
        bgMap[toast.type],
      )}
      role="alert"
    >
      <span className="shrink-0 mt-0.5">{icons[toast.type]}</span>
      <p className="text-sm text-[#2C2C2C] font-sans flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-0.5 rounded hover:bg-[#F0E8D8] text-[#9A9A9A] hover:text-[#2C2C2C] transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
