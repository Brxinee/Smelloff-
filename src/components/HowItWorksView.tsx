import React from "react";
import { Sparkles, Shield, Compass, BookOpen, Heart, ArrowRight } from "lucide-react";

interface HowItWorksViewProps {
  onSelectProduct: () => void;
}

export default function HowItWorksView({ onSelectProduct }: HowItWorksViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      
      {/* Editorial Title Banner */}
      <div className="border-b border-border-custom pb-8 mb-12 text-left">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-widest bg-brand-tint-custom px-2.5 py-1 rounded">
          Peer-Reviewed Molecular Science
        </span>
        <h1 className="text-4xl sm:text-7xl font-display font-black text-ink-custom tracking-tighter uppercase leading-[0.9] mt-3">
          The Molecular Science of Scent
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-2-custom max-w-2xl leading-relaxed">
          Sweat doesn't stink on its own. We explain exactly how odors bond to textile fibers, and how host-guest inclusion complejos trap them without perfumes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Core Scientific Chapters */}
        <div className="lg:col-span-8 space-y-12 text-left">
          
          {/* Chapter 1 */}
          <section className="space-y-4">
            <span className="font-mono text-xs uppercase font-bold text-brand-custom bg-surface-custom border border-border-custom px-2.5 py-1 rounded">
              Chapter I — Textile Bio-Breakdown
            </span>
            <h2 className="font-display font-bold text-2.5xl sm:text-4xl text-ink-custom uppercase tracking-tight mt-2.5">
              Why Clothes Hold Odors (Humid Bio-Breakdown)
            </h2>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Human sweat is biologically 99% odorless water and healthy lipids. However, skin microbiome bacteria — specifically <em>Corynebacterium</em> and <em>Staphylococcus</em> types — feed on these moist lipids, breaking them down into highly volatile, pungent carbon compounds that volatilize into the air.
            </p>
            
            {/* Table of chemical odorant categories */}
            <div className="bg-surface-custom p-4 sm:p-5 rounded-2xl border border-border-custom space-y-3">
              <span className="block font-mono text-[9px] uppercase font-black text-ink-3-custom tracking-wider">
                Scientific Volatile Compound Matrix (American Society for Microbiology)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-border-custom space-y-1">
                  <span className="block font-sans font-bold text-[13px] text-ink-custom leading-none uppercase">Isovaleric Acid</span>
                  <span className="block font-mono text-[10px] text-brand-custom">Type: Acidic Lipids / Cheesy foot odor</span>
                  <p className="text-[10px] text-ink-2-custom leading-relaxed">Forms when commuter sweat is metabolized inside tightly woven cotton fabric fibers.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-border-custom space-y-1">
                  <span className="block font-sans font-bold text-[13px] text-ink-custom leading-none uppercase">3-Methyl-2-hexenoic acid (3M2H)</span>
                  <span className="block font-mono text-[10px] text-brand-custom">Type: Persistent Perspiration Scent</span>
                  <p className="text-[10px] text-ink-2-custom leading-relaxed font-sans">The main culprit behind deep clothing underarm smell and nylon lining decay.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-border-custom space-y-1">
                  <span className="block font-sans font-bold text-[13px] text-ink-custom leading-none uppercase">Thioalcohols</span>
                  <span className="block font-mono text-[10px] text-brand-custom">Type: Heavy Onion-Like Perspiration Scent</span>
                  <p className="text-[10px] text-ink-2-custom leading-relaxed font-sans">Released during long Outer Ring Road motorbike rides under humid weather.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-border-custom space-y-1">
                  <span className="block font-sans font-bold text-[13px] text-ink-custom leading-none uppercase">2-Nonenal</span>
                  <span className="block font-mono text-[10px] text-brand-custom">Type: Stale Grease / Oxidized Sebum Scent</span>
                  <p className="text-[10px] text-ink-2-custom leading-relaxed font-sans">Forms as fiber sebum oxidizes in repeat-wear college sports shirts.</p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              When these chemicals transfer into clothing fabric during movement, synthetic materials (such as polyester polyester-blends) behave as massive structural oil reservoirs. Due to their hydrophobic properties, they cling to grease and re-release the smell long after wearing — even lingering through mild laundry machine wash cycles (confirmed by peer-reviewed textile malodour research PMC7692034).
            </p>
          </section>

          {/* Chapter 2 */}
          <section className="space-y-4 pt-4">
            <span className="font-mono text-xs uppercase font-bold text-brand-custom bg-surface-custom border border-border-custom px-2.5 py-1 rounded">
              Chapter II — Host-Guest Enclosure
            </span>
            <h2 className="font-display font-bold text-2.5xl sm:text-4xl text-ink-custom uppercase tracking-tight mt-2.5">
              How ODORSTRIKE Works (Toroidal Host-Guest Encapsulation)
            </h2>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Bypassing crude cosmetic mask ingredients, ODORSTRIKE works purely via <strong>molecular encapsulation</strong>. Our active agent, hydroxypropyl beta-cyclodextrin (HPβCD), is a specialized starch-derived torus ring sourced under strict legal metrology controls.
            </p>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              As detailed in international biochemical studies (ScienceDirect / P&G patent archives), these cyclodextrin molecules are physically <strong>toroidal (doughnut-shaped) with an oil-attracting (hydrophobic) interior cavity and a water-attracting (hydrophilic) exterior shell.</strong>
            </p>
            
            {/* Host guest graphic CSS */}
            <div className="bg-white border border-border-custom p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center">
              {/* Dynamic science mockup */}
              <div className="w-full sm:w-1/2 flex items-center justify-center p-4 bg-surface-custom border border-border-custom rounded-xl h-44 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full border-4 border-dashed border-brand-custom flex items-center justify-center animate-ripple pointer-events-none relative">
                  {/* Torus cavity */}
                  <div className="w-16 h-16 rounded-full border-4 border-solid border-brand-custom bg-white flex items-center justify-center text-center">
                    <span className="font-mono text-[7px] text-ink-custom uppercase font-black">HYDROPHOBIC<span className="block text-brand-custom text-[8px]">CAVITY</span></span>
                  </div>
                  
                  {/* Trapped molecule */}
                  <div className="absolute w-6 h-6 rounded-full bg-cta-custom border border-cta-strong-custom animate-pulse flex items-center justify-center">
                    <span className="text-[5px] text-white font-bold leading-none font-sans">ODOR</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 text-[9px] font-mono font-bold text-brand-strong-custom uppercase bg-white px-1.5 py-0.5 border rounded">
                  HPβCD Ring
                </div>
              </div>

              {/* Text bullet items */}
              <div className="w-full sm:w-1/2 text-left space-y-2">
                <span className="block font-mono text-[9px] uppercase font-bold text-ink-3-custom">Molecular Enclosure Steps</span>
                <ul className="text-xs space-y-2 text-ink-2-custom font-sans">
                  <li className="flex gap-2 items-start font-medium">
                    <strong className="text-brand-custom">1. Spray Mesh</strong> - Liquid mist delivers toroidal HPβCD rings deep between fabric meshes.
                  </li>
                  <li className="flex gap-2 items-start font-medium">
                    <strong className="text-brand-custom">2. Encapsulate</strong> - Hydrophobic interior cavities physically cage grease and gaseous odorant molecules.
                  </li>
                  <li className="flex gap-2 items-start font-medium">
                    <strong className="text-brand-custom">3. Lock Down</strong> - The volatilization complex drops to zero, neutralizing the scent before it reaches your nose.
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              By encapsulating the volatiles within structural rings, cyclodextrin halts their volatility safely. This is why we use words like **traps, captures, encapsulates, and neutralizes** (never "kills" or "destroys" since chemistry forms inert host complexes, maintaining strict scientific accuracy).
            </p>
          </section>

          {/* Chapter 3 */}
          <section className="space-y-4 pt-4">
            <span className="font-mono text-xs uppercase font-bold text-brand-custom bg-surface-custom border border-border-custom px-2.5 py-1 rounded">
              Chapter III — Fabric vs. Skin
            </span>
            <h2 className="font-display font-bold text-2.5xl sm:text-4xl text-ink-custom uppercase tracking-tight mt-2.5">
              Why Deodorant Fails Clothes (The Scent Battle)
            </h2>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Standard body sprays, antiperspirants, and skin roll-ons are chemically formulated to alter skin perspiration or block armpit sweat ducts. Once those sweat volatile compounds leave your skin and bond inside textile fibers, skin cosmetics become completely useless. They simply cannot unbind molecules from synthetic polyester yarns.
            </p>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              In contrast, ODORSTRIKE is engineered exclusively for clothing fibers. It seeks and encapsulates odor molecules directly where they reside — on the fabric.
            </p>
          </section>

          {/* Honesty block */}
          <section className="p-5 sm:p-6 bg-surface-custom rounded-2xl border border-border-custom space-y-2 text-left">
            <h4 className="font-sans font-bold text-brand-strong-custom text-sm uppercase tracking-wider flex items-center gap-1.5 leading-none">
              ⚠️ Hydro-Science Disclosure & Compliance Notice
            </h4>
            <p className="text-xs text-ink-2-custom leading-relaxed">
              ODORSTRIKE is designed to extend the period between wash cycles; <strong>it does not replace active laundering.</strong> Heavily soiled, mud-stained, or oil-dripped apparel must be laundered. This formula is safe for fabrics and inert textiles only; strictly not for use on human skin.
            </p>
          </section>

        </div>

        {/* Right Sticky Sidebar (4 columns) */}
        <div className="lg:col-span-4 bg-surface-custom border border-border-custom p-6 rounded-2xl space-y-6 text-left lg:sticky lg:top-24">
          <div className="space-y-4">
            <span className="block font-mono text-[10px] uppercase font-bold text-ink-3-custom">Scientific Summary</span>
            <h3 className="font-display font-black text-2xl text-ink-custom uppercase leading-none">
              Lab Specifications
            </h3>
            <p className="text-xs text-ink-2-custom leading-relaxed">
              Tested on corporate commutes inside the Ameerpet Metro cross-over and heavy bike transit lines in Hyderabad. 100% stable active starch toruses.
            </p>
          </div>

          <div className="border-t border-border-custom pt-6 space-y-4 font-mono text-[11px] font-bold text-ink-2-custom uppercase">
            <div className="flex justify-between">
              <span>Bio-Bacteria targeted</span>
              <span className="text-brand-custom">Corynebacterium, Staph</span>
            </div>
            <div className="flex justify-between">
              <span>Paper Validation</span>
              <span className="text-brand-custom">PMC7692034 Study</span>
            </div>
            <div className="flex justify-between">
              <span>Chemistry ring count</span>
              <span className="text-brand-custom">~320T per mist</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border-custom">
            <button
              onClick={onSelectProduct}
              className="w-full py-4 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
            >
              <span>Get Scent Protection</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
