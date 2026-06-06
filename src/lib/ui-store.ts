import { create } from "zustand";

interface UiState {
  isCartOpen: boolean;
  isNavOpen: boolean;
  isCheckoutOpen: boolean;
  currentProductBundle: any | null; // Track selected bundle for fast checkout view
  setCartOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean, bundle?: any | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  isNavOpen: false,
  isCheckoutOpen: false,
  currentProductBundle: null,
  setCartOpen: (open) => set({ isCartOpen: open }),
  setNavOpen: (open) => set({ isNavOpen: open }),
  setCheckoutOpen: (open, bundle = null) =>
    set({ isCheckoutOpen: open, currentProductBundle: bundle }),
}));
