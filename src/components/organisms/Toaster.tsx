"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/src/lib/cn";
import { useToast, ToastVariant } from "@/src/lib/toast-context";

const variantStyles: Record<ToastVariant, string> = {
    default: "bg-neutral-900 text-white",
    success: "bg-emerald-600 text-white",
    danger: "bg-red-600 text-white",
};

export function Toaster() {
    const { toasts, dismissToast } = useToast();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return createPortal(
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role="status"
                    onClick={() => dismissToast(toast.id)}
                    className={cn(
                        "cursor-pointer rounded-md px-4 py-2.5 text-sm shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-150",
                        variantStyles[toast.variant]
                    )}
                >
                    {toast.message}
                </div>
            ))}
        </div>,
        document.body
    );
}