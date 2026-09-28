"use client";

import React from "react";
import { Button, ButtonVariant } from "@/src/components/atoms/Index";
import { Modal } from "./Modal";

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void | Promise<void>;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: ButtonVariant;
}

export function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Konfirmasi",
    cancelLabel = "Batal",
    confirmVariant = "primary"
}: ConfirmDialogProps) {
    const [isConfirm, setIsConfirm] = React.useState(false);

    async function handleConfirm() {
        setIsConfirm(true);

        try {
            await onConfirm();
            onClose();
        } finally {
            setIsConfirm(false);
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            description={description}
            dismissible={false}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose} disabled={isConfirm}>
                        {cancelLabel}
                    </Button>
                    <Button variant={confirmVariant} onClick={handleConfirm} isLoading={isConfirm}>
                        {confirmLabel}
                    </Button>
                </>
            }
        >
            {null}
        </Modal>
    );
}