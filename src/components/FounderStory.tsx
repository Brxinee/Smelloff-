/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Send, MapPin, Award, CheckCircle } from "lucide-react";

export default function FounderStory() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans" id="founder-story-page">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-gray-150 shadow-md">
        
        {/* Head Badge */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-8 text-xs font-mono text-gray-500 uppercase font-bold tracking-wider">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-lime-600" /> Hyderabad, India
          </div>
          <span>Solo Founder Note</span>
        </div>

        {/* Content Editorial */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight mb-2 uppercase">
            "Perfume over sweat makes a monster."
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-lime-600 font-bold">
            The Origin of Smelloff
          </span>

          <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed">
            Hey, I'm <strong>Rohit</strong>, the solo founder of Smelloff.
          </p>
          
          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            If you live or work in any major Indian city—whether you're riding a bike through Gachibowli traffic in 37°C Hyderabad, squeezing into the Mumbai local, or walking 500 meters from the metro station to your Delhi office—the story is always the same. 
          </p>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            By the time you reach your desk or sit down at a café, you're slightly sweaty. That sweat dries, but the odor compounds stay locked inside the fibers of your shirt.
          </p>

          <blockquote className="my-6 border-l-4 border-gray-900 bg-gray-50 p-4 rounded-r-xl italic text-gray-800 text-sm leading-relaxed">
            "I used to keep a ₹3,000 designer cologne in my backpack. One day, before an important client evaluation at my tech job, I sprayed it heavily onto my damp cotton shirt. In the elevator, a colleague politely stepped back. Later, in the washroom mirror, I smelled it. It was terrible. The clean lavender oil had mixed with the sulfurous perspiration vapors from my bike ride to create a heavy, foul 'sweet-rotten' hybrid. I didn't smell fancy — I smelled desperate."
          </blockquote>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            Perfumes are formulated to release complex fragrance accords from your warm skin lipids. They are <strong>not</strong> designed to delete organic residue clinging to fabric. Spraying expensive cologne on sweaty shirts is like trying to paint over a muddy wall. It just highlights the dirt.
          </p>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            I realized we needed a product that is:
          </p>
          <ul className="mt-2 text-sm sm:text-base space-y-2.5 text-gray-700 list-decimal list-inside pl-2">
            <li><strong>Molecular, not masking:</strong> It should physically encapsulate and neutralise odor compounds rather than covering them up.</li>
            <li><strong>Pocket-sized & mobile:</strong> Formulated as a sleek 50ml card spray that fits in a back pocket or laptop sleeve, accessible on-the-go before dates, client meetings, or evening drinks.</li>
            <li><strong>Strictly Fabric-Based:</strong> Formulated for fabrics where odor clings, completely bypassing the skin to avoid chemical underarm cosmetics.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-950 mt-8 mb-3 uppercase tracking-tight">
            How ODORSTRIKE Was Born
          </h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            I spent nine months partnering with custom textile chemistry labs in Telangana. I had a simple criteria: "The mist must be clear, dry instantly, leave zero residue, make sweat odors disappear on cotton or polyester in under 15 seconds, and have a completely clean, neutral scent dry-down."
          </p>
          <p className="mt-2 text-gray-700 text-sm sm:text-base leading-relaxed">
            We tested over thirty formulations before settling on <strong>ODORSTRIKE</strong>. It uses cyclic cage polymers. These compounds match the molecular shape of sulfur and amine gases like a lock and key, clamping shut over the odor nodes so they can't spread in the air.
          </p>

          <p className="mt-6 text-gray-700 text-sm sm:text-base leading-relaxed font-semibold">
            We do not have a massive marketing budget. We do not pay bollywood celebrities. Every coin goes into ensuring that when you spray ODORSTRIKE, your fabric goes back to smelling like absolutely nothing: pure, neutral, pristine fabric.
          </p>

          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            Thanks for backing an indie, solo-founder Indian business. Try it once—if you don't feel it works on your toughest fabrics, drop me a message and I'll refund you myself, no questions asked.
          </p>

          {/* Signoff */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div>
              <span className="block font-serif text-lg italic text-gray-900 font-bold">Rohit</span>
              <span className="block text-xs font-mono uppercase tracking-wider text-gray-500 font-bold mt-1">
                Founder, Smelloff India
              </span>
            </div>
            <div className="flex items-center gap-1 bg-lime-50 rounded-lg px-2.5 py-1 border border-lime-100 text-lime-900 text-[10px] font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-lime-600" /> 100% Bootstrapped
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
