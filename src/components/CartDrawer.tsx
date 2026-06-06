import React, { useEffect } from "react";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Sparkles, AlertCircle } from "lucide-react";
import { CartItem, ProductBundle } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: (cart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
  onGoToCheckout: () => void;
  bundles: ProductBundle[];
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  setCart,
  onGoToCheckout,
  bundles
}: CartDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.bundle.price * item.quantity, 0);
  };

  const FREE_SHIPPING_THRESHOLD = 499;
  const subtotal = getSubtotal();
  const freeShipPercent = Math.min(100, Math.floor((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const missingAmount = FREE_SHIPPING_THRESHOLD - subtotal;

  const updateQuantity = (bundleId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.bundle.id === bundleId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (bundleId: string) => {
    setCart(prev => prev.filter(item => item.bundle.id !== bundleId));
  };

  // Cross sell item specification: Odorstrike Companion Sleeve for gym/metro commutes
  const CROSS_SELL_ITEM: ProductBundle = {
    id: "cross-sell-sleeve",
    name: "Odorstrike 50ml Pocket Protective Card",
    quantity: 1,
    price: 149,
    originalPrice: 199,
    badge: "commute add-on",
    description: "Ultra-slim lightweight commuter card spray. Recharges any clothing with cyclodextrin lock layers in traffic.",
    sizeMl: 15,
    savings: 25
  };

  const handleAddCrossSell = () => {
    // Check if item already exists in cart
    const exists = cart.find(item => item.bundle.id === CROSS_SELL_ITEM.id);
    if (!exists) {
      setCart(prev => [...prev, { bundle: CROSS_SELL_ITEM, quantity: 1 }]);
    } else {
      updateQuantity(CROSS_SELL_ITEM.id, 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none" aria-modal="true" role="dialog">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-gray-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-border-custom h-full text-left">
          
          {/* Header section */}
          <div className="px-5 py-4 border-b border-border-custom flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-custom animate-pulse"></span>
              <h3 className="font-display font-black text-base sm:text-lg text-ink-custom uppercase tracking-tight">
                Your Commute Shield Bag
              </h3>
              <span className="bg-brand-custom text-white font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="p-1.5 text-ink-2-custom hover:text-ink-custom hover:bg-surface-custom rounded-full border border-border-custom hover:scale-105 transition-all cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Core Body */}
          <div className="flex-grow overflow-y-auto p-5 space-y-6">
            
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <span className="text-5xl block animate-bounce mb-3">🎒</span>
                <h4 className="font-display font-black text-lg text-ink-custom uppercase">
                  Your Commute Bag is empty
                </h4>
                <p className="text-xs text-ink-2-custom max-w-xs mx-auto leading-relaxed">
                  Protect your formal clothing and training wear from heavy metropolitan sweat odors. Add an ODORSTRIKE molecular pack to proceed.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-gray-950 hover:bg-gray-800 text-white text-xs font-mono font-bold rounded-xl uppercase tracking-wider cursor-pointer shadow"
                >
                  Return to Storefront
                </button>
              </div>
            ) : (
              <>
                {/* 1. FreeShipProgress Bar */}
                <div className="bg-[#DCF0F1]/55 border border-brand-custom/20 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs text-ink-custom font-sans">
                    <span className="font-semibold text-brand-strong-custom">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="flex items-center gap-1.5">
                          🎉 BlueDart Express Shipping unlocked!
                        </span>
                      ) : (
                        <span>Only <strong className="font-mono text-zinc-950">₹{missingAmount}</strong> more for FREE BlueDart Shipping!</span>
                      )}
                    </span>
                    <span className="font-mono text-[10px] font-extrabold">{freeShipPercent}%</span>
                  </div>
                  
                  {/* Outer bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-brand-custom/5">
                    {/* Goal-gradient progress bar */}
                    <div 
                      className="h-full bg-gradient-to-r from-brand-custom to-[#C94E12] transition-all duration-500 rounded-full"
                      style={{ width: `${freeShipPercent}%` }}
                    />
                  </div>
                  
                  <p className="text-[9.5px] text-ink-2-custom leading-normal border-t border-brand-custom/10 pt-2 mt-2">
                    {subtotal >= FREE_SHIPPING_THRESHOLD 
                      ? "Your delivery will ship under prioritized express delivery lanes completely free of freight costs."
                      : `Saving shipping costs increases value. Secure our ₹499 value duo pack to avoid flat ₹40 logistics fees.`}
                  </p>
                </div>

                {/* 2. Cart items list */}
                <div className="space-y-4">
                  <span className="block font-mono text-[9px] uppercase font-black text-ink-3-custom tracking-wider tracking-widest pl-0.5">
                    Items Inside Scent-Strike Bag
                  </span>

                  <div className="divide-y divide-border-custom/50 space-y-4">
                    {cart.map((item, index) => (
                      <div 
                        key={item.bundle.id} 
                        className={`flex gap-3.5 pt-4 ${index === 0 ? "pt-0 border-t-0" : "border-t"}`}
                      >
                        {/* Avatar representation block */}
                        <div className="w-12 h-12 bg-gray-950 border border-neutral-850 rounded-xl flex flex-col justify-center items-center text-center text-white p-1 select-none shrink-0 font-display">
                          <span className="text-[10px] font-mono font-black text-brand-custom leading-none uppercase">SML</span>
                          <span className="text-[8px] text-gray-500 font-bold leading-none uppercase mt-0.5">{item.bundle.sizeMl}ml</span>
                        </div>

                        <div className="flex-grow flex flex-col justify-between text-left">
                          <div>
                            <div className="flex justify-between items-baseline">
                              <h4 className="font-sans font-bold text-sm text-ink-custom leading-tight">
                                {item.bundle.name}
                              </h4>
                              <span className="font-mono text-sm font-black text-zinc-950 ml-2 whitespace-nowrap">
                                ₹{item.bundle.price * item.quantity}
                              </span>
                            </div>
                            <p className="text-xs text-ink-2-custom leading-relaxed mt-0.5">
                              {item.bundle.description}
                            </p>
                          </div>

                          <div className="flex justify-between items-center mt-3 select-none">
                            {/* Stepper code */}
                            <div className="flex items-center gap-1 bg-surface-custom border border-border-custom rounded-lg p-0.5 shadow-xs">
                              <button 
                                onClick={() => updateQuantity(item.bundle.id, -1)}
                                className="w-6.5 h-6.5 flex items-center justify-center font-bold text-ink-2-custom hover:bg-white hover:text-black rounded transition-all cursor-pointer leading-normal text-sm"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-black w-5 text-center text-ink-custom text-[11px]">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.bundle.id, 1)}
                                className="w-6.5 h-6.5 flex items-center justify-center font-bold text-ink-2-custom hover:bg-white hover:text-black rounded transition-all cursor-pointer leading-normal text-sm"
                              >
                                +
                              </button>
                            </div>

                            {/* Delete */}
                            <button
                              onClick={() => removeItem(item.bundle.id)}
                              className="p-1.5 text-ink-2-custom hover:text-red-600 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer border border-border-custom"
                              title="Delete pack"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-zinc-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Cross-sell add-on container */}
                {!cart.find(item => item.bundle.id === CROSS_SELL_ITEM.id) && (
                  <div className="border border-brand-custom/20 rounded-2xl p-4 bg-gray-50 flex gap-3 text-left">
                    <div className="w-10 h-10 bg-slate-900 border border-gray-850 rounded-xl flex items-center justify-center text-xs shadow-inner shrink-0 mt-0.5 select-none font-bold">
                      💳
                    </div>
                    
                    <div className="flex-grow space-y-1.5 text-left">
                      <div className="flex justify-between items-baseline">
                        <span className="font-sans font-bold text-[11.5px] uppercase text-ink-custom">
                          Pocket Transit Sleeve Card
                        </span>
                        <span className="font-mono text-xs font-black text-brand-custom">₹149</span>
                      </div>
                      <p className="text-[10.5px] text-ink-2-custom leading-relaxed">
                        Add a lightweight travel atomizer inside a dynamic safety card—fits cleanly into laptop bags and sports jackets.
                      </p>
                      
                      <button
                        onClick={handleAddCrossSell}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-custom hover:bg-brand-strong-custom text-white font-mono text-[9px] uppercase font-black rounded-lg transition-all cursor-pointer shadow-xs leading-none"
                      >
                        <Plus className="w-3 h-3 text-white" /> Add to cart & save 25%
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

          </div>

          {/* Bottom Invoice and CTAs footer */}
          {cart.length > 0 && (
            <div className="border-t border-border-custom p-5 bg-gray-50 space-y-4">
              <div className="space-y-2 text-xs text-ink-2-custom font-sans">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-mono text-zinc-950 font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Courier Freight</span>
                  <span className="font-mono text-zinc-950">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="text-brand-custom font-black font-mono uppercase">FREE</span>
                    ) : (
                      "₹40"
                    )}
                  </span>
                </div>
                <div className="border-t border-border-custom pt-3 text-sm flex justify-between font-bold text-ink-custom">
                  <span className="uppercase font-display font-black text-[12px] tracking-wide">Est. Total Amount</span>
                  <span className="font-mono font-black text-[#C94E12] text-lg">₹{subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 40)}</span>
                </div>
              </div>

              {/* Secure seal bar */}
              <div className="bg-white px-3 py-2 border border-border-custom rounded-lg flex items-center justify-between text-[9px] font-mono text-ink-3-custom select-none">
                <span className="flex items-center gap-1.5 uppercase font-bold text-ink-custom text-[8.5px] tracking-widest"><ShieldCheck className="w-4 h-4 text-brand-custom" /> Secure checkout seal</span>
                <span>Razorpay Gateway</span>
              </div>

              {/* Primary CTA Checkout */}
              <button
                onClick={onGoToCheckout}
                className="w-full py-4 bg-gray-950 hover:bg-gray-800 text-white font-sans font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to dispatch entry</span>
                <ArrowRight className="w-5 h-5 text-brand-custom" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
