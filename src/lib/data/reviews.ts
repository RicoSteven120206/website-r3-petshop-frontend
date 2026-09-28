import { Review } from "@/src/lib/types";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    authorName: "Dewi A.",
    rating: 5,
    date: "12 Agu 2026",
    comment: "Anjing saya suka banget, bulunya jadi lebih halus setelah rutin makan ini.",
  },
  {
    id: "r2",
    productId: "p1",
    authorName: "Budi S.",
    rating: 4,
    date: "3 Agu 2026",
    comment: "Kualitas bagus, cuma pengirimannya agak lama.",
  },
  {
    id: "r3",
    productId: "p1",
    authorName: "Rina W.",
    rating: 5,
    date: "28 Jul 2026",
    comment: "Sudah langganan 3 bulan, anjing saya sehat terus.",
  },
  {
    id: "r4",
    productId: "p6",
    authorName: "Andi P.",
    rating: 5,
    date: "15 Agu 2026",
    comment: "Efektif banget buat kutu, wanginya juga enak.",
  },
];

export function getReviewsByProduct(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}