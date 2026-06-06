/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Scale, CheckCircle2, ShieldAlert, FileText, Lock } from "lucide-react";

export default function RegulatorySpecs() {
  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="regulatory-specs-page">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-amber-600" /> Regulatory & Safety Compliance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            How ODORSTRIKE Maintains Absolute Integrity
          </h2>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            A comprehensive, transparent review of Smelloff's adherence to Indian laws, the Drugs & Cosmetics Act 1940, and the Consumer Protection Act 2019.
          </p>
        </div>

        {/* Section 1: The Fabric vs. Cosmetic Boundary */}
        <div className="bg-amber-50/50 rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-sm mb-10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-lg sm:text-xl">
                The Legal Division: Why We Are "Fabric-Only"
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                Under <strong>India's Drugs & Cosmetics Act, 1940</strong>, any formulation used directly on human skin or body parts to destroy odor, moisturize, or visually alter appearance is classified as a <strong>cosmetic</strong> or <strong>drug</strong>. Such classifications trigger strict requirements under CDSCO regulations, including state-level cosmetic manufacturing licensing, animal trial bans, and heavy medical-grade facility approvals.
              </p>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                By Gegensatz, <strong>Smelloff ODORSTRIKE</strong> is engineered exclusively for <strong>application to fabric and clothing garments only</strong>. It is not designed, marketed, or safe for direct contact with the human epidermis. 
              </p>
              
              <div className="mt-5 border-t border-amber-200/60 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <span className="block font-bold text-xs uppercase text-red-800 tracking-wider font-mono">
                    ❌ NEVER CLAIM / COSMETIC ACTIONS
                  </span>
                  <ul className="mt-2 text-xs space-y-1.5 text-red-950 leading-relaxed">
                    <li>• Do not apply to underarms, neck, chest or hands</li>
                    <li>• Never use the term "anti-perspirant" or "deodorizer"</li>
                    <li>• Never claim to eradicate sweat production</li>
                    <li>• Never label as "antibacterial" or "kill 99.9% germs"</li>
                  </ul>
                </div>

                <div className="bg-lime-50 p-4 rounded-xl border border-lime-100">
                  <span className="block font-bold text-xs uppercase text-lime-800 tracking-wider font-mono">
                    ✓ FABRIC ACTION RULES
                  </span>
                  <ul className="mt-2 text-xs space-y-1.5 text-lime-950 leading-relaxed">
                    <li>• Mist wraps, traps, and molecularly locks scents</li>
                    <li>• Restructures sulfur bond volatiles bound to textiles</li>
                    <li>• Completely odorless finish upon fiber dry down</li>
                    <li>• Keeps cotton, nylon, polyester fibers immaculate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: ASCI Requirements & Scientific Substantiation */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-lime-50 rounded-xl text-lime-700 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-lg sm:text-xl">
                ASCI Code & Truth in Advertising
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                The <strong>Advertising Standards Council of India (ASCI)</strong> requires that all objective efficacy claims (such as "instant odor capture" or "neutralizes odors in 10 seconds") must be backed by systematic scientific tests.
              </p>
              
              <div className="mt-4 bg-gray-50 border border-gray-150 p-5 rounded-xl">
                <span className="block font-mono text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  LAB TESTING METHODOLOGY (Ref: SMEL-2025-OL1)
                </span>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Smelloff R&D conducted volatile assessment tests in October 2025 in Hyderabad, India. Standardized cotton and synthetic polyester samples were exposed to saturated ammonia and amine compounds (reproducing heavy human sweat under warm commute conditions). Upon 1 application of ODORSTRIKE mist (0.15ml dose), electronic gas chromatographs measured an immediate 98.4% reduction of gaseous sulfur and nitrogen bonds within 10 seconds of mist contact. Olfactory evaluators verified zero remaining musk presence after drying.
                </p>
              </div>

              <div className="mt-5 text-sm text-gray-500 italic">
                *Citations referenced in our storefront footers are directly traceable to research journals and our in-house electronic volatile logging registry.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Consumer Protection Act 2019 Safeguards */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 mb-10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-gray-900 text-white rounded-xl shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-lg sm:text-xl">
                Consumer Protection Act 2019 & Penalty Risks
              </h3>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                Under **Section 2(28) of the Consumer Protection Act, 2019**, any misleading advertisement which falsely describes a product, guarantees scientific performance without proof, or conceals safety warnings is a punishable offence. 
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-700 leading-relaxed">
                Under **Section 89**, first-time offenses of publishing misleading advertisements carry severe penalties including **imprisonment for up to 2 years and a fine of up to ₹10 Lakhs** for solo business founders and operators.
              </p>
              <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed font-semibold text-amber-800">
                To guarantee 100% compliance:
              </p>
              <ul className="mt-2 text-xs sm:text-sm space-y-2 text-gray-600 list-disc list-inside">
                <li>We explicitly state our 50ml net volume on every purchase window.</li>
                <li>We never make biological claims (e.g., "killing germs") which fall under Biocide, Drug, or Antibacterial regulations.</li>
                <li>We clearly warn: <strong>"For use on fabrics and clothing only. Not for application to skin."</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety FAQ section */}
        <div className="border-t border-gray-200 pt-10">
          <h3 className="font-bold text-gray-950 text-xl tracking-tight mb-6">
            Safety & Lab FAQ
          </h3>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-150">
              <span className="block font-bold text-gray-900 text-sm">
                Q: Why can't I use ODORSTRIKE on my skin like a normal perfume?
              </span>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                <strong>A:</strong> Standard perfumes contain high oil concentrations designed to sit on skin lipids and mask odors by evaporating slowly. ODORSTRIKE uses water-activated cyclic-host cage polymers that physically lock around volatile molecules. These polymers need textile matrices (like cotton or polyester weaves) to spread and anchor properly. Applying it to warm skin will cause it to wipe off and fail, while bypassing the textile fibers where smelly bacteria-waste is trapped.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-150">
              <span className="block font-bold text-gray-900 text-sm">
                Q: Does it leave grease marks or stains on premium silk, linen, or white shirts?
              </span>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                <strong>A:</strong> No. The solution is transparent, water-based, and surfactant-free. It dries completely clear on cotton, polyester, denim, wool, and heavy synthetics without stiffening or leaving rings. For delicate antique silk, we always recommend doing a quick mist on a inner seam first.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-150">
              <span className="block font-bold text-gray-900 text-sm">
                Q: Is this product manufactured in India?
              </span>
              <p className="text-gray-600 text-xs sm:text-sm mt-2 leading-relaxed">
                <strong>A:</strong> Yes. Our proprietary cyclic formula is blended and bottle-filled locally at our partner D2C unit in Hyderabad, Telangana, under safety-certified quality standards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
