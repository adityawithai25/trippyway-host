"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: number;
  message: string;
  variant: "success" | "error" | "info";
}

interface SimpleToastProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const variantStyles = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  error: "bg-red-50 border-red-200 text-red-900",
  info: "bg-blue-50 border-blue-200 text-blue-900",
};

const variantIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const iconColors = {
  success: "text-emerald-600",
  error: "text-red-600",
  info: "text-blue-600",
};

export function SimpleToast({ toasts, onRemove }: SimpleToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = variantIcons[toast.variant];
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg",
              "animate-in slide-in-from-bottom-4 duration-[250ms]",
              "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-80",
              variantStyles[toast.variant]
            )}
          >
            <Icon className={cn("w-5 h-5 shrink-0 mt-0.5", iconColors[toast.variant])} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => onRemove(toast.id)}
              className="shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors duration-[150ms]"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
