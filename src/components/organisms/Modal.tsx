"use client";

import React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/src/lib/cn";
import { Heading, Text } from "@/src/components/atoms/Index";
import { useLockBodyScroll } from "@/src/hooks/useLockBodyScroll";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    dismissible?: boolean;
    className?: string;
}

export function Modal({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    dismissible = false,
    className,
}: ModalProps) {
    const dialogRef = React.useRef<HTMLDivElement>(null);
    const titleId = React.useId();
    const descId = React.useId();
    const [mounted, setMounted] = React.useState(false);

    useLockBodyScroll(open);

    React.useEffect(() => setMounted(true), []);

    React.useEffect(() => {
        if (!open || !dismissible) return;
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, dismissible, onClose]);

    React.useEffect(() => {
        if (open) dialogRef.current?.focus();
    }, [open]);

    if (!mounted || !open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                aria-hidden="true"
                onClick={dismissible ? onClose : undefined}
                className="absolute inset-0 bg-black/50 animate-in fade-in duration-150"
            />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={description ? descId : undefined}
                tabIndex={-1}
                className={cn(
                    "relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl",
                    "focus:outline-none animate-in zoom-in-95 fade-in duration-150",
                    className
                )}
            >
                {(title || description) && (
                    <div className="mb-4 space-y-1">
                        {title && (
                            <Heading level={4} id={titleId}>
                                {title}
                            </Heading>
                        )}
                        {description && (
                            <Text id={descId} size="sm" tone="muted">
                                {description}
                            </Text>
                        )}
                    </div>
                )}
                {children}
                {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
            </div>
        </div>,
        document.body
    );
}