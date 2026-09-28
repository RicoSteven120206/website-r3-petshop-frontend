export interface Category {
    slug: string;
    name: string;
    image: string;
    parentSlug?: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    categorySlug: string;
    price: number;
    compareAtPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    images?: string[];
    description: string;
    stock: number;
    tags?: string[];
    variants?: ProductVariant[];
    petType?: PetType;
    sku?: string;
    weight?: number;
    isRecommended?: boolean;
} 

export interface ProductVariant {
    id: string;
    label: string;
    priceDelta?: number;
    stock: number;
}

export type PetType = "anjing" | "kucing" | "ikan";

export interface Review {
    id: string;
    productId: string;
    authorName: string;
    rating: number;
    date: string;
    comment: string;
    verifiedPurchase?: boolean;
    images?: string[];
}

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc" | "newest";

export interface PaginationMeta {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface CartLine {
    productId: string;
    variantId?: string;
    quantity: number;
}

export interface WishlistItem {
    productId: string;
    addedAt: string;
}

export interface Customer {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatarUrl?: string;
}

export interface Pet {
    id: string;
    ownerId: string;
    name: string;
    type: PetType;
    breed?: string;
    birthDate?: string;
    weight?: number;
    avatarUrl?: string;
    notes?: string;
}

export interface Address {
    id?: string;
    fullname: string;
    phone: string;
    address: string;
    city: string;
    province?: string;
    postalCode: string;
    notes?: string;
    isDefault?: boolean;
}

export interface ShippingMethod {
    id: string;
    courierName: string;
    serviceName: string;
    price: number;
    estimatedDays: string;
}

export type PaymentMethodType = "credit-card" | "debit-card" | "bank-transfer" | "e-wallet" | "cod";


export interface PaymentMethod {
    id: string;
    type: PaymentMethodType;
    label: string;
    logoUrl?: string; 
}

export type Coupon = {
    code: string;
    description: string;
    type: "percentage" | "fixed";
    value: number;
    minPurchase: number;
    expiresAt?: string;
};

export type OrderStatus = 
    | "pending-payment"
    | "processing"
    | "shipped"
    | "delivered"
    | "canceled";

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    variantLabel?: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    shippingAddress: Address;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shippingFee: number;
    discount?: number;
    total: number;
    status: OrderStatus;
    createdAt: string;
    trackingNumber?: string;
}

export type notificationVariant = "default" | "success" | "danger";
