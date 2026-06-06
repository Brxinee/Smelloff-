/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductBundle {
  id: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
  badge?: string | null;
  description: string;
  sizeMl: number;
  savings: number;
  isWedge?: boolean;
  isScaffold?: boolean;
  hasPocketSleeve?: boolean;
}

export interface CartItem {
  bundle: ProductBundle;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  pincode: string;
  city: string;
  state: string;
  landmark?: string;
}

export interface Order {
  id: string;
  bundle?: ProductBundle; // For single item orders
  bundles?: CartItem[];   // Supporting entire cart checkout!
  quantity?: number;
  shippingAddress: ShippingAddress;
  paymentMethod: "UPI" | "CARD" | "COD";
  paymentStatus: "PAID" | "PENDING";
  shippingFee: number;
  totalAmount: number;
  orderDate: string;
  trackingStatus: "PLACED" | "PREPARED" | "SHIPPED" | "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED";
  trackingHistory: {
    status: string;
    location: string;
    time: string;
    description: string;
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  age: number;
  situation: string;
  rating: number;
  heading: string;
  content: string;
  date: string;
  helpfulCount?: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  age: number;
  situation: string;
  rating: number;
  heading: string;
  content: string;
  date: string;
  helpfulCount: number;
}

export enum Page {
  HOME = "home",
  PRODUCT = "product",
  SHOP = "shop",
  ABOUT = "about",
  HOW_IT_WORKS = "how_it_works",
  BLOG = "blog",
  BLOG_POST = "blog_post",
  CONTACT = "contact",
  PRIVACY = "privacy",
  TERMS = "terms",
  REFUND = "refund",
  SHIPPING = "shipping",
  ORDER_TRACKER = "order_tracker",
  COOKIES = "cookies"
}
