import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, ProductBundle } from "../types";

interface CartState {
  cart: CartItem[];
  addToCart: (bundle: ProductBundle) => void;
  removeFromCart: (bundleId: string) => void;
  updateQuantity: (bundleId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (bundle) => {
        set((state) => {
          const existing = state.cart.find((item) => item.bundle.id === bundle.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.bundle.id === bundle.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { bundle, quantity: 1 }] };
        });
      },
      removeFromCart: (bundleId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.bundle.id !== bundleId),
        }));
      },
      updateQuantity: (bundleId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bundleId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.bundle.id === bundleId
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (acc, item) => acc + item.bundle.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "smelloff-cart-storage",
    }
  )
);
