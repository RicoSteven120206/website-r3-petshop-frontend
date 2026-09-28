"use client";

import React from "react";
import { Heading, Label, Textarea } from "@/src/components/atoms/Index";
import { FormField } from "../molecules/FormField";
import { Address } from "@/src/lib/types";

export type AddressFormValues = Address;

export interface AddressFormProps {
    values: Address;
    onChange: (values: Address) => void;
    errors?: Partial<Record<keyof Address, string>>;
}

export function AddressForm({
    values,
    onChange,
    errors
}: AddressFormProps) {
    function set<K extends keyof Address>(key: K, value: Address[K]) {
        onChange({ ...values, [key]: value });
    }

    return (
        <div className="space-y-4">
            <Heading level={5}>Alamat pengiriman</Heading>

            <FormField 
                label="Nama Penerima"
                required
                value={values.fullname}
                onChange={(e) => set("fullname", e.target.value)}
                error={errors?.fullname}
            />
            <FormField 
                label="Nomor Telepon"
                required
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors?.phone}
            />
            <FormField 
                label="Alamat Lengkap"
                required
                value={values.address}
                onChange={(e) => set("address", e.target.value)}
                error={errors?.address}
            />
            <div>
                <FormField 
                    label="Kota"
                    required
                    value={values.city}
                    onChange={(e) => set("city", e.target.value)}
                    error={errors?.city}
                />
                <FormField 
                    label="Kode Pos"
                    required
                    value={values.postalCode}
                    onChange={(e) => set("postalCode", e.target.value)}
                    error={errors?.postalCode}
                />
            </div>
            <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-900">Catatan Opsional</Label>
                <Textarea 
                    rows={3}
                    placeholder="Contoh: titip di pos satpam"
                    value={values.notes ?? ""}
                    onChange={(e) => set("notes", e.target.value)}
                />
            </div>
        </div>
    );
}