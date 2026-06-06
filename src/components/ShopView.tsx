import React from "react";
import { Star, Shield, Gift, Sparkles, ShoppingBag, Flame, TrendingUp, Check } from "lucide-react";
import { ProductBundle } from "../types";

interface ShopViewProps {
  bundles: ProductBundle[];
  onAddToCart: (bundle: ProductBundle) => void;
  onSelectProduct: () => void;
}

export default function ShopView({ bundles, onAddToCart, onSelectProduct }: ShopViewProps) {
  // Configured list with full trials and future upgrades
  const allShopItems = [
    {
      id: "trial-wedge",
      name: "First Order Trial Card",
      quantity: 1,
      price: 179,
      originalPrice: 229,
      savings: 50,
      badge: "🎁 INTRO OFFER",
      description: "Introductory price for first-time buyers. Sized for pocket transit. Limits 1 per buyer address.",
      sizeMl: 50,
      hasPocketSleeve: false,
      rating: 4.9,
      reviewCount: 142,
      isTrial: true
    },
    ...bundles.map(b => ({
      ...b,
      rating: b.id === "pack-2" ? 5.0 : b.id === "pack-3" ? 4.9 : 4.8,
      reviewCount: b.id === "pack-2" ? 418 : b.id === "pack-3" ? 289 : 94,
      isTrial: false,
      isFuture: false
    })),
    {
      id: "future-100ml",
      name: "ODORSTRIKE 100ml Pro",
      quantity: 1,
      price: 379,
      originalPrice: 429,
      savings: 50,
      badge: "🚀 PREMIUM VOLUME",
      description: "High-capacity repeat variant. Twice the molecular volume with custom metal sleeve nozzle.",
      sizeMl: 100,
      hasPocketSleeve: true,
      rating: 5.0,
      reviewCount: 76,
      isTrial: false,
      isFuture: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      
      {/* Editorial Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-strong-custom bg-brand-tint-custom px-3 py-1 rounded">
          Scent-Strike Collection Matrix
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-black text-ink-custom tracking-tight uppercase leading-none mt-4">
          Choose Your Scent Shield
        </h1>
        <p className="mt-3 text-sm sm:text-base text-ink-2-custom">
          Select from our localized direct packaging tiers. All multi-pack bundles bypass postal costs and include free express shipping to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Side: Native Bundle Economics Explanation */}
        <div className="lg:col-span-1 bg-surface-custom border border-border-custom p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-8 text-left">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-brand-strong-custom uppercase pl-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> Bundle Economics
            </span>
            <h3 className="font-display font-black text-2xl text-ink-custom uppercase leading-none">
              How You Save With Tiers
            </h3>
            <p className="text-xs text-ink-2-custom leading-relaxed">
              We bypass retail margins-agents and ship directly from our Hyderabad depot. Larger packs pack order shipping costs into a single box, passing direct savings back to the commuter.
            </p>

            <div className="border-t border-border-custom pt-4 space-y-3 font-sans text-xs">
              <div className="flex gap-2.5 items-start font-medium">
                <Check className="w-4 h-4 text-brand-custom mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-ink-custom leading-none">Always Free Freight</span>
                  <span className="block text-[10px] text-ink-3-custom font-mono mt-0.5">On orders above ₹499 (2+ packs)</span>
                </div>
              </div>
              
              <div className="flex gap-2.5 items-start font-medium">
                <Check className="w-4 h-4 text-brand-custom mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-ink-custom leading-none">Plain Cardboard Parcels</span>
                  <span className="block text-[10px] text-ink-3-custom font-mono mt-0.5">Discreet, plain brown cargo boxes</span>
                </div>
              </div>

              <div className="flex gap-2.5 items-start font-medium">
                <Check className="w-4 h-4 text-brand-custom mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-ink-custom leading-none font-bold">7-Day Transit Return</span>
                  <span className="block text-[10px] text-ink-3-custom font-mono mt-0.5">No-fret refund claim processing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-custom text-left">
            <span className="block font-mono text-[9px] text-ink-3-custom font-bold uppercase leading-none">Lab standard</span>
            <span className="block text-[10.5px] font-sans font-extrabold text-brand-strong-custom mt-1 leading-tight">
              100% SECURE HYDRO-CAGE FORMULA
            </span>
          </div>
        </div>

        {/* Collection items listed on the right (3 columns) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allShopItems.map((item) => {
            const isHighlighted = item.id === "pack-2" || item.id === "trial-wedge";
            
            return (
              <div 
                key={item.id} 
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all ${
                  isHighlighted 
                    ? "bg-white border-brand-custom shadow-md relative" 
                    : "bg-white border-border-custom shadow-xs"
                }`}
              >
                {/* Ribbon Tag */}
                {item.badge && (
                  <span className={`absolute -top-3 left-4 text-[9px] font-mono uppercase font-black px-3 py-1 rounded shadow-xs border ${
                    item.id === "trial-wedge" 
                      ? "bg-cta-tint-custom text-cta-strong-custom border-cta-custom/20"
                      : "bg-brand-custom text-white border-brand-custom"
                  }`}>
                    {item.badge}
                  </span>
                )}

                <div className="space-y-4 text-left">
                  {/* CSS structural schematic of cards bundle */}
                  <div 
                    className="w-full h-36 bg-surface-custom rounded-xl border border-border-custom flex items-center justify-center relative cursor-pointer overflow-hidden group"
                    onClick={onSelectProduct}
                  >
                    <div className="relative flex items-center">
                      {Array.from({ length: item.quantity }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-10 h-20 bg-slate-900 border border-border-custom rounded-lg p-1.5 shadow flex flex-col justify-between items-center transition-transform group-hover:scale-105"
                          style={{
                            marginLeft: i > 0 ? "-14px" : "0px",
                            zIndex: 10 + i
                          }}
                        >
                          <div className="w-1.5 h-0.5 bg-brand-custom rounded-full"></div>
                          <span className="text-[5.5px] font-display font-black text-white leading-none tracking-wider uppercase whitespace-nowrap">
                            SMELLOFF
                          </span>
                          <span className="text-[5px] font-mono text-brand-custom font-extrabold scale-75 whitespace-nowrap leading-none mb-1">
                            {item.sizeMl}ml
                          </span>
                        </div>
                      ))}

                      {/* Case accessory representation */}
                      {item.hasPocketSleeve && (
                        <div className="absolute -bottom-1 -right-3 bg-slate-900 border border-border-custom text-[6px] font-mono font-extrabold text-[#9EE5E8] px-1.5 py-0.5 rounded shadow-md uppercase leading-none">
                          👜 CASE Sleeve
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rating fold */}
                  <div className="flex gap-1.5 items-center">
                    <div className="flex text-amber-500 gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    </div>
                    <span className="font-mono text-[10px] font-extrabold text-ink-custom">{item.rating}</span>
                    <span className="text-[10px] text-ink-3-custom font-mono">({item.reviewCount} stories)</span>
                  </div>

                  {/* Name and descriptions */}
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-lg text-ink-custom uppercase tracking-tight leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-ink-2-custom leading-relaxed min-h-[3.2rem]">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Pricing Block & Primary CTA Action */}
                <div className="mt-6 border-t border-border-custom/65 pt-4 space-y-4 text-left">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[9px] font-mono text-ink-3-custom uppercase font-bold">Standard Value</span>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        {item.savings > 0 && (
                          <span className="text-price-strike-custom line-through font-mono text-xs">
                            ₹{item.originalPrice}
                          </span>
                        )}
                        <span className="font-mono font-black text-ink-custom text-lg">
                          ₹{item.price}
                        </span>
                      </div>
                      
                      {item.savings > 0 && (
                        <span className="block text-[8px] font-mono text-brand-custom font-extrabold uppercase mt-0.5 text-right">
                          SAVE ₹{item.savings} INDIVIDUALLY
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add bundle to bag action */}
                  <button
                    onClick={() => {
                      if (item.id === "trial-wedge") {
                        onAddToCart({
                          id: "pack-1-trial",
                          name: "ODORSTRIKE Trial Card",
                          quantity: 1,
                          price: 179,
                          originalPrice: 229,
                          savings: 50,
                          isWedge: true,
                          description: "First-Order Introductory Trial (50ml card pack). Limit 1.",
                          sizeMl: 50,
                          hasPocketSleeve: false
                        });
                      } else if (item.id === "future-100ml") {
                        onAddToCart({
                          id: "pack-future-100ml",
                          name: "ODORSTRIKE Pro Variant (100ml)",
                          quantity: 1,
                          price: 379,
                          originalPrice: 429,
                          savings: 50,
                          isScaffold: true,
                          description: "Extended volume repeated variant. Heavily aerosolized nozzle.",
                          sizeMl: 100,
                          hasPocketSleeve: true
                        });
                      } else {
                        onAddToCart(item as any as ProductBundle);
                      }
                    }}
                    className="w-full py-3.5 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
