"use client";

import React from "react";
import { Input, InputProps, Label, Text } from "@/src/components/atoms/Index";

export interface FormFieldProps extends Omit<InputProps, "id"> {
    id?: string;
    label: string;
    helperText?: string;
    error?: string;
    required?: boolean;
}

export function FormField({
    id,
    label,
    helperText,
    error,
    required,
    className,
    ...inputProps
}: FormFieldProps) {
    const autoId = React.useId();
    const fieldId = id ?? autoId;
    const helperId = `${fieldId}-helper`;
    const message = error ?? helperText;

    return (
        <div className="space-y-1.5">
            <Label htmlFor={fieldId} required={required}>
                {label}
            </Label>
            <Input 
                id={fieldId}
                invalid={!!error}
                required={required}
                aria-describedby={message ? helperId : undefined}
                className={className}
                {...inputProps}
            />
            {message && (
                <Text id={helperId} size="sm" tone={error ? "danger" : "muted"}>
                    {message}
                </Text>
            )}
        </div>
    );
}