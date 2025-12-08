"use client";

import { useState, useCallback } from "react";

export interface Toast {
  id: number;
  message: string;
  variant: "success" | "error" | "info";
}

export function useSimpleToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: "success" | "error" | "info" = "info") => {
      const id = Date.now();
      const newToast: Toast = { id, message, variant };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        removeToast(id);
      }, 3000);

      return id;
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string) => toast(message, "success"),
    [toast]
  );

  const error = useCallback(
    (message: string) => toast(message, "error"),
    [toast]
  );

  const info = useCallback(
    (message: string) => toast(message, "info"),
    [toast]
  );

  return {
    toasts,
    toast,
    success,
    error,
    info,
    removeToast,
  };
}
