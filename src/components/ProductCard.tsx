/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ShoppingCart, HelpCircle, Flame, Gift, HelpCircle as InfoIcon } from "lucide-react";
import { ProductBundle } from "../types";

interface ProductCardProps {
  bundles: ProductBundle[];
  onAddToCart: (bundle: ProductBundle) => void;
}

export default function ProductCard({ bundles, onAddToCart }: ProductCardProps) {
  const [selectedBundleId, setSelectedBundleId] = useState<string>("pack-2"); // Default to Pack of 2 Best Seller

  const getPercentSavings = (bundle: ProductBundle) => {
    return Math.round((bundle.savings / bundle.originalPrice) * 100);
  };

  const handleProductCheckout = () => {
    const selected = bundles.find(b => b.id === selectedBundleId);
    if (selected) {
      onAddToCart(selected);
    }
  };

  const activeBundle = bundles.find(b => b.id === selectedBundleId) || bundles[1];

  return (
    <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-8 shadow-md flex flex-col lg:flex-row gap-8 items-stretch font-sans" id="product-showcase-container">
      
      {/* Visual Product Render Box */}
      <div className="lg:w-1/2 bg-gray-50/80 rounded-xl border border-gray-100 p-6 flex flex-col justify-between items-center min-h-[420px] relative overflow-hidden" id="product-render-canvas">
        
        {/* Aesthetic Corner badging */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="bg-slate-900 text-white font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded shadow-sm">
            Net Vol: 50ml
          </span>
          <span className="bg-lime-50 text-lime-900 border border-lime-100 font-mono font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded shadow-sm">
            ⚡ 320+ Sprays
          </span>
        </div>

        {/* CSS+SVG 3D interactive pocket bottle render */}
        <div className="flex-grow flex items-center justify-center py-8 relative w-full">
          <div className="w-56 h-80 relative flex items-center justify-center group pointer-events-none select-none">
            {/* Soft backdrop radial shadow to highlight craft */}
            <div className="absolute w-48 h-48 bg-lime-400/10 rounded-full blur-[40px] group-hover:bg-lime-400/15 transition-all"></div>
            
            {/* Pocket sprayer vessel */}
            <div className="w-44 h-[250px] bg-gray-950 border border-gray-800 rounded-3xl p-5 shadow-2xl relative flex flex-col justify-between items-center transition-transform hover:scale-[1.02] duration-300">
              {/* Atomizer nozzle and nozzle guard cap sleeve */}
              <div className="w-16 h-4 bg-gray-900 border-x border-t border-gray-800 rounded-t-xl absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-1.5 bg-gray-800 rounded-full"></div>
              </div>

              {/* Header labeling */}
              <div className="w-full text-center mt-5">
                <span className="block font-sans font-black text-white text-3xl tracking-tighter uppercase leading-none">
                  SMELL<span className="text-lime-500">OFF</span>
                </span>
                <span className="block font-mono text-[8px] tracking-[4px] uppercase text-gray-500 font-bold mt-1 pl-1 leading-none">
                  GARMENT PROTECTION
                </span>
              </div>

              {/* Dynamic quantity sticker graphic depending on selector */}
              <div className="w-full bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80 flex flex-col items-center">
                <span className="block font-mono text-[9px] text-lime-500 uppercase font-black tracking-widest">
                  Active Formula
                </span>
                <span className="block font-sans font-extrabold text-white text-base mt-0.5 tracking-tight">
                  {selectedBundleId === "pack-1" && "ODORSTRIKE Single"}
                  {selectedBundleId === "pack-2" && "ODORSTRIKE Twin Pack"}
                  {selectedBundleId === "pack-3" && "ODORSTRIKE Tri-Bundle"}
                </span>
                
                {/* Visual mini bottles */}
                <div className="flex gap-1.5 mt-2.5">
                  {Array.from({ length: selectedBundleId === "pack-1" ? 1 : selectedBundleId === "pack-2" ? 2 : 3 }).map((_, i) => (
                    <div key={i} className="w-3.5 h-6 bg-lime-500/85 border border-lime-400 rounded-sm flex items-center justify-center font-mono text-[7px] text-lime-950 font-bold leading-none shadow-sm animate-scaleIn">
                      M
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtitle claims */}
              <div className="w-full text-center pb-2">
                <span className="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">
                  Odor Encapsulation Mist
                </span>
                <span className="block text-[6px] font-mono text-gray-500 mt-1 uppercase tracking-wide">
                  Formulated for garments • Not for skin application
                </span>
              </div>
            </div>

            {/* Travel sleeve overlay mockup if Pack of 3 is active */}
            {selectedBundleId === "pack-3" && (
              <div className="absolute -bottom-2 right-4 bg-amber-950 text-amber-100 p-2 rounded-lg border border-amber-800 text-[9px] font-mono uppercase font-black shadow-lg flex items-center gap-1.5 animate-bounce">
                <Gift className="w-3 h-3 text-amber-400" /> + FREE Carry Case
              </div>
            )}
          </div>
        </div>

        {/* Static specifications footer */}
        <div className="w-full border-t border-gray-200/60 pt-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 font-bold leading-none">Form Factor</span>
            <span className="block font-sans font-bold text-gray-900 text-xs mt-1.5 leading-tight">Card Pocket Spray</span>
          </div>
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 font-bold leading-none">Scent drydown</span>
            <span className="block font-sans font-bold text-gray-900 text-xs mt-1.5 leading-tight">Crisp Clean Neutral</span>
          </div>
          <div>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 font-bold leading-none">Net Volume</span>
            <span className="block font-sans font-bold text-gray-900 text-xs mt-1.5 leading-tight">50ml / Bottle</span>
          </div>
        </div>

      </div>

      {/* Selling Details & Pricing Matrix */}
      <div className="lg:w-1/2 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Main headings */}
          <div>
            <div className="flex gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-900 text-[10px] font-mono font-bold uppercase tracking-wider border border-red-100">
                <Flame className="w-3.5 h-3.5 text-red-650" /> Fast-Drying Mist Formula
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-2 uppercase leading-none">
              ODORSTRIKE Mist
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              A high-precision, fabric-only molecular cage spray designed for active Indian commute sweating. Bypasses skin lipids to lock down odors locked inside clothing layers.
            </p>
          </div>

          {/* Pricing Selector Matrix */}
          <div>
            <span className="block text-xs font-mono text-gray-400 font-bold uppercase tracking-widest pl-1 mb-3">
              Select Your Clothes Shield Tier:
            </span>
            <div className="space-y-3">
              {bundles.map((bd) => {
                const isSelected = selectedBundleId === bd.id;
                return (
                  <button
                    key={bd.id}
                    onClick={() => setSelectedBundleId(bd.id)}
                    className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition cursor-pointer ${
                      isSelected
                        ? "bg-lime-50/40 border-lime-500 shadow-sm text-gray-950"
                        : "bg-white hover:bg-gray-50 border-gray-250 text-gray-500"
                    }`}
                    id={`bundle-card-${bd.id}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-950 text-sm leading-tight">
                          {bd.name}
                        </span>
                        {bd.badge && (
                          <span className="bg-lime-600 text-white text-[9px] font-mono uppercase font-black tracking-wider px-2 py-0.5 rounded shadow-sm">
                            {bd.badge}
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-gray-500 font-mono">
                        {bd.description}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="font-mono text-gray-400 line-through text-xs">
                          ₹{bd.originalPrice}
                        </span>
                        <span className="font-mono font-extrabold text-gray-950 text-base sm:text-lg">
                          ₹{bd.price}
                        </span>
                      </div>
                      {bd.savings > 0 && (
                        <span className="block text-[10px] font-mono text-lime-700 font-bold uppercase leading-none mt-1">
                          Save ₹{bd.savings} ({getPercentSavings(bd)}% off)
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key items bullet specifications */}
          <div className="border-t border-gray-150 pt-4.5 space-y-2.5">
            <span className="block text-xs font-mono text-gray-400 font-bold uppercase tracking-widest">
              Physical Science Specs
            </span>
            <ul className="text-xs space-y-2 text-gray-650">
              <li className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-lime-600 mt-0.5 font-bold">✓</span>
                <span><strong>No perfume masking</strong>: Dries odorless with a completely neutral crisp background, ensuring you smell pristine, not masked.</span>
              </li>
              <li className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-lime-600 mt-0.5 font-bold">✓</span>
                <span><strong>Zero-residue water base</strong>: Safe on dark clothing, business satin, gym mesh fabrics, and heavy blazers. Leaves zero rings.</span>
              </li>
              <li className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-lime-600 mt-0.5 font-bold">✓</span>
                <span><strong>Drugs & Cosmetics Non-Cosmetic formula</strong>: Engineered for fabrics only. Strictly not for application on skin. Bypasses cosmetic CDSCO rules safely.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA button section */}
        <div className="pt-6 border-t border-gray-150 mt-6 lg:mt-0 space-y-2.5">
          <button
            onClick={handleProductCheckout}
            className="w-full py-4 px-6 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            id="product-add-to-bag-btn"
          >
            <ShoppingCart className="w-5.5 h-5.5 text-lime-500" />
            <span>ADD {activeBundle.quantity} BOTTLES TO SHOPPING BAG</span>
          </button>

          <p className="text-[10px] text-gray-400 font-mono text-center uppercase tracking-wide">
            💳 Secured payment checkout via Razorpay • Cash on Delivery support included.
          </p>
        </div>

      </div>
    </div>
  );
}
