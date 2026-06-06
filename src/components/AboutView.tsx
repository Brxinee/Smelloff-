import React from "react";
import { Sparkles, Shield, Heart, ArrowRight, Check } from "lucide-react";

interface AboutViewProps {
  onSelectProduct: () => void;
}

export default function AboutView({ onSelectProduct }: AboutViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      
      {/* Editorial Title banner */}
      <div className="border-b border-border-custom pb-8 mb-12 text-left">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-widest bg-brand-tint-custom px-2.5 py-1 rounded">
          Smelloff Manifesto • Hyderabad, India
        </span>
        <h1 className="text-4xl sm:text-7xl font-display font-black text-ink-custom tracking-tighter uppercase leading-[0.9] mt-4">
          Caging Odor, <span className="text-brand-custom block">Preserving Pride.</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-2-custom max-w-2xl leading-relaxed">
          We believe grooming should be backed by pure chemistry, not synthetic marketing hype. ODORSTRIKE was engineered for one purpose: to eliminate the secret sweat anxiety that Indian young men experience daily on transit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Manifesto Story (8 columns) */}
        <div className="lg:col-span-8 space-y-8 text-left">
          
          <section className="space-y-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-custom uppercase tracking-tight">
              1. The Real Insight: Sweat Anxiety
            </h2>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Standard colognes and body deodorants are formulated as cosmetics for skin application. They try to address body odor before it starts, or cover it up with heavy, synthetic fragrance oils. But metabolic sweat doesn't stay long on dry skin; it immediately transfers and embeds inside cotton, linen, and synthetic shirt fibers. 
            </p>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Once there, Corynebacterium cells break down the sweat lipids into highly volatile, offensive organic compounds like cheesy isovaleric acids within minutes. This creates a severe smell barrier. <strong>People do not fear sweating; they fear others noticing the stale odor on their clothing first.</strong>
            </p>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Primacy colognes simply overlay this stink, combining sweat lipids and floral musks into a heavy, pungent chemical aura. We designed ODORSTRIKE to bypass skin chemistry entirely. It is applied exclusively to the textile fiber, capturing the odor at the molecular level where standard washes cannot easily reach in the middle of a commute day.
            </p>
          </section>

          <section className="space-y-4 pt-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-custom uppercase tracking-tight">
              2. Proudly Formulated in Hyderabad
            </h2>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Smelloff was founded and heavily field-tested under the humid roads and intense temperatures of Hyderabad, Telangana. From our Hyderabad dispatch center, our mission is simple: to make highly effective, peer-reviewed fabric-science mists accessible to every office worker, motorbike riders, and college student in India.
            </p>
            <p className="text-sm sm:text-base text-ink-2-custom leading-relaxed">
              Because modern Indian consumers are highly skeptical of generic cosmetics claims, we do not hide our ingredients, certifications, or mechanism. We openly document our cyclodextrin physical entrapment chemistry, proving how simple starch-based molecules are standard-setters in international textile engineering.
            </p>
          </section>

          {/* Core Values points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-surface-custom p-5 rounded-xl border border-border-custom space-y-2">
              <span className="text-xl">🔬</span>
              <h4 className="font-sans font-bold text-ink-custom text-sm">Fabric-First Formulations</h4>
              <p className="text-[11px] text-ink-2-custom leading-relaxed">Formulated exclusively for laundry fibers. We bypass skin cosmetics to strike odors where they sit.</p>
            </div>

            <div className="bg-surface-custom p-5 rounded-xl border border-border-custom space-y-2">
              <span className="text-xl">🇮🇳</span>
              <h4 className="font-sans font-bold text-ink-custom text-sm">Extreme Temperature Tested</h4>
              <p className="text-[11px] text-ink-2-custom leading-relaxed">Tested intensely under local metro, motorbike ORR, and humid field operations.</p>
            </div>

            <div className="bg-surface-custom p-5 rounded-xl border border-border-custom space-y-2">
              <span className="text-xl">🤝</span>
              <h4 className="font-sans font-bold text-ink-custom text-sm">Direct-to-Consumer Integrity</h4>
              <p className="text-[11px] text-ink-2-custom leading-relaxed">No expensive middleman markups. Genuinely affordable molecular shields direct to your door.</p>
            </div>
          </div>

          {/* Interactive solo founder letter */}
          <div className="bg-surface-custom p-6 sm:p-8 rounded-2xl border border-border-custom space-y-4 mt-8">
            <span className="inline-block font-mono text-[9px] uppercase font-bold text-brand-custom">
              A Personal Note From Our Founder
            </span>
            <blockquote className="italic font-sans text-xs sm:text-sm text-ink-2-custom leading-relaxed">
              "Indian young professionals endure heavy commutes every single morning. Your clothes should be a source of pride and confidence, not silent worry. We did not build ODORSTRIKE in a corporate marketing boardroom; we formulated it as a clean, matte pocket essential. It targets sweat compounds inside synthetic meshes in 10 seconds, leaving fabrics flat and neutral. We stand entirely backed by clinical literature."
            </blockquote>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-custom pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-mono font-bold text-xs select-none">
                  SML
                </div>
                <div className="text-left font-sans text-xs">
                  <span className="block font-bold text-ink-custom">Dr. Srikar Reddy</span>
                  <span className="block text-ink-3-custom font-mono text-[9px] mt-0.5">Solo Founder, Smelloff Operations Hub</span>
                </div>
              </div>
              
              {/* Signature representation */}
              <div className="font-serif italic font-extrabold flex items-center text-brand-custom select-none text-lg">
                Srikar Reddy
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel Aesthetic Details (4 columns) */}
        <div className="lg:col-span-4 bg-surface-custom border border-border-custom p-6 sm:p-8 rounded-2xl space-y-6 text-left lg:sticky lg:top-24">
          <div className="space-y-4">
            <span className="block font-mono text-[10px] uppercase font-bold text-ink-3-custom">Our Formulation Integrity</span>
            <h3 className="font-display font-black text-2xl text-ink-custom uppercase leading-none">
              Claim-Safe Lab Principles
            </h3>
            <p className="text-xs text-ink-2-custom leading-relaxed">
              Under current pharmaceutical and metrology frameworks in India, fabric-only mists are categorized as textile processing aids rather than skin cosmetics. This allows us to avoid expensive biocide ingredients. ODORSTRIKE is 100% skin contact safe, non-toxic, and water-based, but formulated exclusively for clothing surfaces.
            </p>
          </div>

          <div className="border-t border-border-custom pt-6 space-y-3 font-sans text-xs">
            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-border-custom">
              <span className="text-ink-2-custom font-semibold">Active Cage Compound</span>
              <span className="font-mono text-[9.5px] font-bold text-brand-custom">HPβ-Cyclodextrin</span>
            </div>
            
            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-border-custom">
              <span className="text-ink-2-custom font-semibold">Drying Performance</span>
              <span className="font-mono text-[9.5px] font-bold text-brand-custom">&lt; 10 Seconds</span>
            </div>

            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-border-custom">
              <span className="text-ink-2-custom font-semibold">Regulatory Standard</span>
              <span className="font-mono text-[9.5px] font-bold text-brand-custom">Legal Metrology Compliant</span>
            </div>

            <div className="flex justify-between items-center bg-white p-2.5 rounded border border-border-custom">
              <span className="text-ink-2-custom font-semibold">Safety Profile</span>
              <span className="font-mono text-[9.5px] font-bold text-brand-custom">Phthalate-Free Inert</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onSelectProduct}
              className="w-full py-4 px-6 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>Shop ODORSTRIKE — ₹229</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
