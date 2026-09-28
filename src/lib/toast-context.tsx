"use client";

import React from "react";

export type ToastVariant = "default" | "success" | "danger";

export interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
}

interface ToastContextValue {
    toasts: Toast[];
    showToast: (message: string, variant?: ToastVariant) => void;
    dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);
const AUTO_DISMISS_MS = 3000;

export function ToastProvider({
    children
}: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const dismissToast = React.useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = React.useCallback(
        (message: string, variant: ToastVariant = "default") => {
            const id = crypto.randomUUID();
            setToasts((prev) => [...prev, { id, message, variant }]);
            setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
        },
        [dismissToast]
    );

    return (
        <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
            {children}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = React.useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
    return ctx;
}