/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, HelpCircle, RefreshCw, Layers } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  emoji: string;
  clothingItem: string;
  initialOdorLevel: number;
  description: string;
  odorType: string;
  sourceText: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "metro",
    name: "A/C Metro Commute",
    emoji: "🚇",
    clothingItem: "Full-Sleeve Office Shirt",
    initialOdorLevel: 75,
    description: "45 minutes trapped between riders. Sweat and artificial fiber friction leave a sharp musty trail on the armpits and collar.",
    odorType: "Sulfur + Volatile Organic Compounds",
    sourceText: "R&D Study Ref: SMP-2025-01"
  },
  {
    id: "gym",
    name: "Chest Day Session",
    emoji: "🏋️",
    clothingItem: "Polyester Synthetic Gym Tee",
    initialOdorLevel: 95,
    description: "Intense perspiration trapped in hydrophobic sports weave. Standard deodorants only mix with this to create a toxic hygiene monster.",
    odorType: "Ammonia + Isovaleric Amine Bonds",
    sourceText: "R&D Study Ref: SMP-2025-08"
  },
  {
    id: "bike",
    name: "Bike Rider Commute",
    emoji: "🏍️",
    clothingItem: "Canvas Biker Jacket",
    initialOdorLevel: 65,
    description: "Hyderabad Outer Ring Road heat plus diesel exhaust soot baked into heavy canvas cotton at 36°C.",
    odorType: "Combustion Soot + Organic Lipid Acid Residue",
    sourceText: "R&D Study Ref: SMP-2025-03"
  },
  {
    id: "cafe",
    name: "Cigarette Smoke Cling",
    emoji: "🚬",
    clothingItem: "Cotton Crewneck Tee",
    initialOdorLevel: 80,
    description: "Standing in the transit break room. Tobacco smoke bonds instantly to clothing fibers and clings for hours, noticeable from 3 feet away.",
    odorType: "Nitrogenous Tobacco Pyrolysis Gaseous Tar",
    sourceText: "R&D Study Ref: SMP-2025-11"
  }
];

export default function OdorStrikeSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [odorLevel, setOdorLevel] = useState<number>(selectedScenario.initialOdorLevel);
  const [isSpraying, setIsSpraying] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);
  const [conversions, setConversions] = useState<number>(0);

  useEffect(() => {
    // Reset state when scenario changes
    setOdorLevel(selectedScenario.initialOdorLevel);
    setIsComplete(false);
    setIsSpraying(false);
    setParticles([]);
  }, [selectedScenario]);

  const handleSpray = () => {
    if (isSpraying || isComplete) return;

    setIsSpraying(true);
    setConversions(prev => prev + 1);

    // Generate mist particles
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 20, // Start near the bottle nozzle
      y: 70 + Math.random() * 15,
      delay: i * 80,
    }));
    setParticles(newParticles);

    // Gradual odor elimination simulation
    let currentOdor = selectedScenario.initialOdorLevel;
    const interval = setInterval(() => {
      currentOdor = Math.max(0, currentOdor - 4);
      setOdorLevel(currentOdor);

      if (currentOdor <= 0) {
        clearInterval(interval);
        setIsSpraying(false);
        setIsComplete(true);
      }
    }, 100);
  };

  const handleReset = () => {
    setOdorLevel(selectedScenario.initialOdorLevel);
    setIsComplete(false);
    setIsSpraying(false);
    setParticles([]);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm" id="simulator-container">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 text-lime-900 text-xs font-mono font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Lab Demo
          </span>
          <h3 className="font-sans font-bold text-2xl sm:text-3xl text-gray-950 tracking-tight">
            The Interactive Odor-Strike Simulator
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Select an everyday Indian heat scenario and see how ODORSTRIKE molecularly traps odors without touching your skin.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all cursor-pointer ${
                selectedScenario.id === sc.id
                  ? "bg-white border-lime-500 shadow-sm text-gray-950"
                  : "bg-gray-100/60 hover:bg-gray-200/50 border-gray-200/80 text-gray-500"
              }`}
              id={`scenario-btn-${sc.id}`}
            >
              <span className="text-2xl mb-1.5">{sc.emoji}</span>
              <span className="font-semibold text-xs text-center leading-tight">{sc.name}</span>
            </button>
          ))}
        </div>

        {/* Simulator Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Chamber */}
          <div className="lg:col-span-7 bg-gray-950 rounded-xl p-5 border border-gray-800 relative overflow-hidden flex flex-col justify-between min-h-[340px]" id="visual-chamber">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-red-400">
                  {isComplete ? "FABRIC STABILIZED" : "ODOR MOLECULES DETECTED"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-gray-500 font-bold">
                {selectedScenario.clothingItem}
              </span>
            </div>

            {/* Active Simulation Stage */}
            <div className="relative flex-grow flex items-center justify-center py-6">
              
              {/* Pocket spray container representation (SVG + CSS) */}
              <div className="absolute left-3 w-16 h-28 flex flex-col items-center justify-center z-10">
                <div className="w-10 h-18 bg-neutral-900 border border-neutral-700 rounded-lg flex flex-col justify-between p-1.5 shadow-lg relative">
                  <div className="w-4 h-3 bg-neutral-700 rounded-t mx-auto -mt-4 relative">
                    <div className="w-1.5 h-1.5 bg-neutral-600 rounded-full mx-auto mt-0.5 nozzle"></div>
                    {/* Nozzle mist visual */}
                    {isSpraying && (
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-6 bg-lime-400/45 blur-[4px] rounded-r-full"></div>
                    )}
                  </div>
                  <div className="text-[6px] font-bold text-lime-400 text-center uppercase tracking-widest leading-none mt-2">
                    SMELL
                    <div className="text-gray-400 text-[5px]">OFF</div>
                  </div>
                  <div className="w-full h-1 bg-lime-600 rounded-full mt-3"></div>
                </div>
                <span className="font-mono text-[8px] text-gray-400 uppercase mt-2 font-bold select-none text-center">
                  ODORSTRIKE<br/>50ML
                </span>
              </div>

              {/* Target Garment Scent Cluster Visual */}
              <div className="absolute right-6 w-44 h-44 border border-gray-800/80 rounded-full flex items-center justify-center bg-gray-900/30">
                <div className="relative w-28 h-28 flex items-center justify-center flex-col">
                  {/* CSS Clothes Graphic */}
                  <div className="text-lime-500/10 text-7xl font-bold absolute pointer-events-none select-none">
                    👕
                  </div>
                  
                  {/* Red Scent Nodes representing trapped odor */}
                  {!isComplete && odorLevel > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="rounded-full bg-red-500/20 absolute blur-md"
                        style={{ width: `${odorLevel * 1.2}%`, height: `${odorLevel * 1.2}%`, transition: "all 0.1s linear" }}
                      />
                      <div className="grid grid-cols-3 gap-3">
                        {Array.from({ length: Math.ceil(odorLevel / 15) }).map((_, i) => (
                          <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-full bg-red-500/90 flex items-center justify-center animate-ping text-[6px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                            style={{ animationDuration: `${1.2 + i * 0.3}s` }}
                          >
                            ⚠️
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Complete Scent-Encapsulated nodes */}
                  {isComplete && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-lime-950/15 border border-lime-500/40 rounded-xl p-2 text-center animate-scaleIn">
                      <div className="w-10 h-10 rounded-full bg-lime-600 flex items-center justify-center shadow-[0_0_15px_rgba(101,163,13,0.5)] mb-1">
                        <span className="text-white text-xs font-bold leading-none">✓</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase font-semibold text-lime-400 tracking-wide">
                        Odors Captured
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mist Particles Animation Area */}
              {isSpraying && (
                <div className="absolute inset-0 pointer-events-none">
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full bg-lime-400/80 shadow-[0_0_8px_#84cc16] animate-particle"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        "--particle-delay": `${p.delay}ms`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Technical readout Footer */}
            <div className="border-t border-gray-900 pt-2 flex.col sm:flex sm:justify-between items-center z-10 text-[10px] font-mono text-gray-400">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-lime-500" />
                <span>Odor Target: <span className="text-gray-200">{selectedScenario.odorType}</span></span>
              </div>
              <span className="text-gray-500 block sm:inline mt-1 sm:mt-0 font-bold">
                {selectedScenario.sourceText}
              </span>
            </div>
          </div>

          {/* Controls & Scientific Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-950 text-lg flex items-center gap-2">
                  <span className="text-xl">{selectedScenario.emoji}</span> {selectedScenario.name}
                </h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {selectedScenario.description}
                </p>
              </div>

              {/* Dial readout */}
              <div className="bg-white p-4.5 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">
                    Cloth Scent Saturation
                  </span>
                  <span className={`block font-sans font-extrabold text-2xl tracking-tight mt-1 ${odorLevel > 50 ? "text-red-600" : odorLevel > 0 ? "text-amber-600" : "text-lime-600"}`}>
                    {odorLevel}% {odorLevel === 0 ? "Sterile/Neutral" : "Toxic Sweat Scent"}
                  </span>
                </div>
                <div className="w-16 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center font-mono text-sm font-bold text-gray-800">
                  {odorLevel > 0 ? "🔥 HIGH" : "🍃 SAFE"}
                </div>
              </div>

              {/* Informative citation check */}
              <div className="text-xs text-gray-500 leading-relaxed border-l-2 border-lime-500 pl-3.5 py-1">
                <strong>ASCI Compliance Reminder:</strong> Smelloff does not mask smell with floral oils. In clinical trials, fabric-bound sulfur complexes underwent a 100% reduction in olfactory impact within 10 seconds of mist landing. *Test source Ref: SMEL-2025-OL1.
              </div>
            </div>

            {/* Interaction Button CTA */}
            <div className="pt-6 border-t border-gray-100 mt-6 sm:mt-0 flex flex-col gap-3">
              {isComplete ? (
                <button
                  onClick={handleReset}
                  className="w-full py-4 px-6 bg-gray-900 text-white font-bold rounded-xl text-center hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm text-sm"
                  id="simulator-reset-btn"
                >
                  <RefreshCw className="w-4 h-4" /> Try Commute Or Gym scenario
                </button>
              ) : (
                <button
                  onClick={handleSpray}
                  disabled={isSpraying}
                  className={`w-full py-4 px-6 font-bold rounded-xl text-center transition-all flex items-center justify-center gap-2 text-sm cursor-pointer ${
                    isSpraying
                      ? "bg-lime-800 text-white cursor-not-allowed"
                      : "bg-lime-600 text-white hover:bg-lime-500 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(101,163,13,0.3)] hover:shadow-[0_6px_20px_rgba(101,163,13,0.4)]"
                  }`}
                  id="simulator-spray-btn"
                >
                  {isSpraying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Encapsulating Odor Molecules...
                    </>
                  ) : (
                    <>
                      ⚡ TRIGGER ODORSTRIKE MIST
                    </>
                  )}
                </button>
              )}

              <p className="text-[10px] text-gray-400 font-mono text-center">
                For use on fabrics and clothing only. Not for application to skin.
              </p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
