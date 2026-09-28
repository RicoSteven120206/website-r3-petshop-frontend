"use client";

import * as React from "react";
import { Button, Heading, Input, Text } from "@/src/components/atoms/Index";

const columns = [
  { title: "Belanja", links: ["Anjing", "Kucing", "Burung", "Ikan & Akuarium"] },
  { title: "Bantuan", links: ["Lacak pesanan", "Pengembalian", "Pengiriman", "Hubungi kami"] },
  { title: "Perusahaan", links: ["Tentang kami", "Karir", "Blog"] },
];

/**
 * Footer — organism. Newsletter signup + link columns + bottom bar.
 */
export function Footer() {
  const [email, setEmail] = React.useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    // wire up to your newsletter provider
    setEmail("");
  }

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-1">
            <Heading level={5}>Dapatkan promo terbaru</Heading>
            <Text size="sm" tone="muted">
              Diskon & tips perawatan hewan langsung ke inbox kamu.
            </Text>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <Heading level={6}>{col.title}</Heading>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <Text size="sm" tone="muted">
            © {new Date().getFullYear()} PetShop. Semua hak dilindungi.
          </Text>
        </div>
      </div>
    </footer>
  );
}