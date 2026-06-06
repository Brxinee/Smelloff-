import React, { useState, useEffect, useRef } from "react";
import { 
  Star, Shield, RefreshCw, ShoppingBag, Truck, Check, HelpCircle, 
  ChevronLeft, ChevronRight, Plus, Minus, Info, ArrowRight, ThumbsUp 
} from "lucide-react";
import { ProductBundle, Review } from "../types";
import reviewsData from "../content/reviews.json";

// Typed local reviews
const initialReviews: Review[] = reviewsData as Review[];

// Gallery images/slides describing ODORSTRIKE Fabric Mist
const GALLERY_IMAGES = [
  { id: 1, label: "ODORSTRIKE Hero", desc: "Sleek 50ml pocket-sized matte atomizer card", bg: "bg-[#F4F7F6]" },
  { id: 2, label: "Pocket Sizing", desc: "Fits flat and flush inside your slim denim or work shirt pockets", bg: "bg-[#E8EDEB]" },
  { id: 3, label: "Mist Distribution", desc: "Droplet-optimized micro-nozzle targeting volatile compounds in thread spaces", bg: "bg-[#E8EDEB]" },
  { id: 4, label: "Toroid Structure", desc: "Starch-derived torus rings physically trapping metabolic sweat molecules", bg: "bg-[#F4F7F6]" },
  { id: 5, label: "Safety Profile", desc: "Water-based formula, non-staining, 100% cosmetic preservative-free", bg: "bg-[#E8EDEB]" }
];

interface ProductPDPViewProps {
  bundles: ProductBundle[];
  onAddToCart: (bundle: ProductBundle) => void;
  onOpenCart: () => void;
  onNavigateToPage: (page: any) => void;
}

export default function ProductPDPView({ 
  bundles, 
  onAddToCart, 
  onOpenCart,
  onNavigateToPage 
}: ProductPDPViewProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedPackId, setSelectedPackId] = useState("pack-1"); // Solo is default (₹229)
  const [quantity, setQuantity] = useState(1);
  const [trialWedgeActive, setTrialWedgeActive] = useState(true);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);
  
  // Reviews with helpful counts persisted in local state
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [upvotedReviews, setUpvotedReviews] = useState<string[]>([]);

  const buyBoxRef = useRef<HTMLDivElement>(null);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide trial wedge for returning buyers
    const isReturning = localStorage.getItem("smelloff_returning_customer") === "true";
    if (isReturning) {
      setTrialWedgeActive(false);
    }

    const handleScroll = () => {
      if (buyBoxRef.current) {
        const bottom = buyBoxRef.current.getBoundingClientRect().bottom;
        // Show sticky bar once user scrolls past the buy box
        setShowStickyBar(bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate chosen bundle details
  const getSelectedBundle = (): ProductBundle => {
    if (selectedPackId === "trial-wedge-custom") {
      return {
        id: "pack-1-trial",
        name: "ODORSTRIKE First Order Trial",
        price: 179,
        originalPrice: 229,
        quantity: 1,
        sizeMl: 50,
        description: "Special ₹179 trial pricing for first-time direct buyers.",
        savings: 50,
        isWedge: true,
        hasPocketSleeve: false
      };
    } else if (selectedPackId === "scaffold-100ml") {
      return {
        id: "pack-future-100ml",
        name: "ODORSTRIKE Pro Edition — 100ml",
        price: 379,
        originalPrice: 429,
        quantity: 1,
        sizeMl: 100,
        description: "High-capacity variant scaffold. Launching monsoon cycle.",
        savings: 50,
        isScaffold: true,
        hasPocketSleeve: true
      };
    }
    return bundles.find(b => b.id === selectedPackId) || bundles[0];
  };

  const activeBundle = getSelectedBundle();

  const handleAddToCartClick = () => {
    const itemToAdd = { ...activeBundle };
    for (let i = 0; i < quantity; i++) {
      onAddToCart(itemToAdd);
    }
    onOpenCart();
  };

  const handleUpvoteReview = (reviewId: string) => {
    if (upvotedReviews.includes(reviewId)) return;
    setUpvotedReviews(prev => [...prev, reviewId]);
    setReviewsList(prev => 
      prev.map(r => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)
    );
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white min-h-screen text-ink-custom font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-ink-3-custom mb-8 tracking-widest text-left select-none">
          <button onClick={() => onNavigateToPage("home")} className="hover:text-brand-custom cursor-pointer transition-colors">Home</button>
          <span>/</span>
          <span className="text-brand-custom">ODORSTRIKE FABRIC MIST PDP</span>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-border-custom pb-16">
          
          {/* COLUMN 1: INTERACTIVE SWIPING GALLERY (LEFT) */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`w-full aspect-square sm:aspect-video lg:aspect-square ${GALLERY_IMAGES[activeImageIdx].bg} text-ink-custom border border-border-custom rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative shadow-sm group transition-all duration-300 overflow-hidden`}>
              
              {/* Corner status pills */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 text-left">
                <span className="bg-ink-custom text-white font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow">
                  {GALLERY_IMAGES[activeImageIdx].label}
                </span>
                <span className="bg-brand-custom/10 text-brand-strong-custom font-mono text-[8px] uppercase font-bold tracking-widest px-2.5 py-1 rounded border border-brand-custom/20">
                  SMelloff Labs Telangana
                </span>
              </div>

              {/* Central high-contrast illustration node */}
              <div className="flex-grow flex items-center justify-center relative select-none">
                {activeImageIdx === 0 && (
                  <div className="w-40 h-64 bg-slate-900 border-2 border-border-custom rounded-3xl p-5 flex flex-col justify-between items-center shadow-xl animate-scaleIn">
                    <div className="w-12 h-1 bg-brand-custom rounded-full"></div>
                    <div className="text-center">
                      <span className="block font-display font-black text-2xl text-white tracking-widest leading-none">SMELLOFF</span>
                      <span className="block font-mono text-[7px] text-[#A8E2E6] font-bold tracking-wider mt-1">FABRIC SHIELD</span>
                    </div>
                    <div className="bg-cta-custom text-white text-[9px] font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                      ODORSTRIKE
                    </div>
                    <span className="font-mono text-[8px] text-gray-400 font-medium">50ML ATOMIZER</span>
                  </div>
                )}
                
                {activeImageIdx === 1 && (
                  <div className="p-6 bg-white border border-border-custom rounded-2.5xl flex flex-col items-center max-w-xs text-center space-y-3.5 shadow-md animate-fadeIn">
                    <span className="text-3.5xl">👖</span>
                    <h5 className="font-display font-black text-sm text-ink-custom uppercase tracking-wide">POCKET-SCALE FORM FACTOR</h5>
                    <p className="text-xs text-ink-2-custom leading-relaxed">
                      Sleek like an ID card. Slides flatly inside trousers, business shirts, jackets, or fitness bags without bulging.
                    </p>
                  </div>
                )}

                {activeImageIdx === 2 && (
                  <div className="relative w-44 h-44 border-2 border-brand-custom/20 rounded-full flex items-center justify-center animate-ripple">
                    <span className="text-brand-strong-custom font-mono text-xs font-black uppercase tracking-wider bg-white px-4 py-2 border border-border-custom rounded-lg shadow-sm">
                      Microdroplet Mist
                    </span>
                  </div>
                )}

                {activeImageIdx === 3 && (
                  <div className="p-5 bg-white border border-border-custom rounded-xl space-y-2.5 max-w-xs animate-scaleIn text-left shadow-sm">
                    <span className="block text-[8px] font-mono text-brand-custom font-extrabold uppercase tracking-widest">Toroidal Torus cage</span>
                    <div className="w-full h-1 bg-border-custom rounded-full">
                      <div className="w-3/4 h-full bg-brand-custom rounded-full"></div>
                    </div>
                    <p className="text-xs text-ink-2-custom leading-relaxed font-sans">
                      Starch rings physically cage organic sweat acids, preventing volatising smell molecules from taking flight.
                    </p>
                  </div>
                )}

                {activeImageIdx === 4 && (
                  <div className="space-y-2 text-left bg-white border border-border-custom p-5 rounded-xl max-w-sm shadow-sm">
                    <span className="font-mono text-[10px] font-bold text-brand-custom uppercase block">Formulation Specs</span>
                    <div className="space-y-1.5 text-xs text-ink-2-custom">
                      <p>✓ 100% Water-based suspension core</p>
                      <p>✓ 0% Phthalates or synthetic chemical dyes</p>
                      <p>✓ Safe contact background on clothes & skin</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lower description tag */}
              <div className="text-left bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-border-custom/50">
                <p className="font-sans font-extrabold text-ink-custom text-sm leading-snug">
                  {GALLERY_IMAGES[activeImageIdx].desc}
                </p>
              </div>

              {/* Swiper Arrow elements */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(prev => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border-custom hover:bg-surface-custom transition-all cursor-pointer shadow-sm text-ink-custom"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIdx(prev => (prev + 1) % GALLERY_IMAGES.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-border-custom hover:bg-surface-custom transition-all cursor-pointer shadow-sm text-ink-custom"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail selector rail */}
            <div className="flex gap-2 pb-1 overflow-x-auto select-none no-scrollbar">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-bold tracking-wider uppercase border transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx 
                      ? "bg-brand-custom text-white border-brand-custom" 
                      : "bg-surface-custom border-border-custom text-ink-2-custom hover:bg-white"
                  }`}
                >
                  0{img.id} {img.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* COLUMN 2: THE BUY BOX (RIGHT) */}
          <div className="lg:col-span-5 text-left space-y-6" ref={buyBoxRef}>
            
            {/* Title Block & Topline Reviews */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] sm:text-xs tracking-widest font-black uppercase text-brand-custom">
                India's First Fabric-Only Molecular Scent Lock
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-1">
                ODORSTRIKE Fabric Mist
              </h1>
              <p className="text-sm text-ink-2-custom leading-relaxed">
                Active clinical starch formula. Penetrates textile layers instantly to capture and encapsulate heavy commute sweat odors. Applied solely to clothing fabrics.
              </p>

              {/* Anchor-linked reviews rate above fold */}
              <div className="flex items-center gap-2 pt-1 font-mono text-xs select-none">
                <div className="flex text-amber-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <a 
                  href="#pdp-reviews-fold" 
                  onClick={scrollToReviews}
                  className="font-extrabold underline text-ink-custom hover:text-brand-custom cursor-pointer"
                >
                  (418 verified stories)
                </a>
                <span className="text-brand-strong-custom font-extrabold bg-brand-tint-custom px-2 py-0.5 rounded text-[9px]">
                  ✓ METRO TESTED IN HYD
                </span>
              </div>
            </div>

            {/* Price anchoring module */}
            <div className="p-4 bg-surface-custom rounded-2xl border border-border-custom flex justify-between items-center sm:items-baseline">
              <div className="text-left">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-3-custom font-black">Segment Package Price</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  {activeBundle.savings > 0 && (
                    <span className="text-price-strike-custom line-through font-mono text-xs">
                      ₹{activeBundle.originalPrice * quantity}
                    </span>
                  )}
                  <span className="text-xl sm:text-2xl font-mono font-black text-ink-custom">
                    ₹{activeBundle.price * quantity}
                  </span>
                </div>
              </div>

              {activeBundle.savings > 0 && (
                <span className="bg-cta-tint-custom text-cta-strong-custom border border-cta-custom/20 font-mono text-[9px] sm:text-xs font-black uppercase px-2.5 py-1 rounded shadow-xs">
                  SAVE ₹{activeBundle.savings * quantity} (-{Math.round((activeBundle.savings / activeBundle.originalPrice) * 100)}%)
                </span>
              )}
            </div>

            {/* Pack Selector Bundle Cards */}
            <div className="space-y-3">
              <span className="block text-xs font-mono font-bold text-ink-3-custom uppercase tracking-widest pl-1">
                Select Scent Shield Bundle:
              </span>
              
              <div className="grid grid-cols-1 gap-2.5">
                {bundles.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedPackId(b.id)}
                    className={`w-full text-left p-3.5 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                      selectedPackId === b.id
                        ? "bg-white border-brand-custom shadow-sm text-ink-custom"
                        : "bg-surface-custom hover:bg-gray-100 border-border-custom text-ink-2-custom"
                    }`}
                  >
                    <div className="text-left font-sans">
                      <div className="flex gap-2 items-center leading-none">
                        <span className="block font-bold text-xs">{b.name} — ₹{b.price}</span>
                        {b.badge && (
                          <span className="bg-brand-custom text-white text-[8px] font-mono font-black px-1.5 py-0.5 rounded leading-none">
                            {b.badge}
                          </span>
                        )}
                      </div>
                      <span className="block text-[10px] text-ink-3-custom leading-tight font-mono mt-1">{b.description}</span>
                    </div>
                    <span className="font-mono text-xs font-bold whitespace-nowrap">₹{b.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trial Wedge Block for First-Timers */}
            {trialWedgeActive && (
              <div className="bg-cta-tint-custom p-4 rounded-xl border border-cta-custom/20 space-y-3 animate-scaleIn">
                <div className="flex gap-2.5 items-start">
                  <span className="text-xl">🎁</span>
                  <div className="text-left">
                    <h5 className="font-sans font-bold text-xs text-cta-strong-custom uppercase">First order? Try 1 for ₹179</h5>
                    <p className="text-[10.5px] text-ink-2-custom leading-relaxed mt-0.5">
                      New to Smelloff? Bypassing generic marketing traps, we offer one single 50ml card bottle for ₹179. No subscriptions, no catches. Genuinely try of fiber encapsulation.
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedPackId("trial-wedge-custom")}
                  className={`w-full py-2.5 border font-mono text-[9px] uppercase font-black tracking-widest rounded-lg transition-all cursor-pointer ${
                    selectedPackId === "trial-wedge-custom"
                      ? "bg-cta-custom text-white border-cta-custom shadow-sm"
                      : "bg-white hover:bg-cta-tint-custom border-cta-custom/30 text-cta-strong-custom"
                  }`}
                >
                  {selectedPackId === "trial-wedge-custom" ? "✓ Trial offer applied" : "Claim introductory ₹179 price"}
                </button>
              </div>
            )}

            {/* Future option scaffolding 100ml */}
            <div className="bg-surface-custom p-3 rounded-xl border border-border-custom text-xs flex justify-between items-center select-none font-mono opacity-85">
              <div>
                <span className="block font-sans font-bold text-[11px] uppercase">Upgraded Volume Spec</span>
                <span className="block text-[9px] text-ink-3-custom">Next dispatch: 100ml variant is ₹379</span>
              </div>
              <button
                onClick={() => setSelectedPackId("scaffold-100ml")}
                className={`px-3 py-1.5 border hover:bg-white rounded transition-all text-[9.5px] uppercase font-extrabold cursor-pointer ${
                  selectedPackId === "scaffold-100ml" ? "bg-brand-custom text-white border-brand-custom" : "border-border-custom text-ink-2-custom"
                }`}
              >
                100ml variant
              </button>
            </div>

            {/* Quantity control & primary action button */}
            <div className="flex gap-3.5 items-center border-t border-border-custom pt-5 select-none">
              <div className="flex items-center gap-1 bg-surface-custom border border-border-custom p-1 rounded-xl">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center font-bold text-ink-2-custom hover:bg-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-extrabold w-8 text-center text-ink-custom">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center font-bold text-ink-2-custom hover:bg-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary orange action button! */}
              <button
                onClick={handleAddToCartClick}
                className="flex-grow py-4 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md text-center flex items-center justify-center gap-2 active:scale-98"
                id="pdp-add-to-cart-btn"
              >
                <ShoppingBag className="w-4.5 h-4.5 shrink-0" /> ADD TO SMELL Shield BAG
              </button>
            </div>

            {/* Security Badges */}
            <div className="border-t border-border-custom pt-5 space-y-3.5 font-mono text-[9px] font-bold text-ink-3-custom uppercase text-left select-none">
              <div className="grid grid-cols-2 gap-3 pb-1 text-ink-2-custom text-[10px]">
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-brand-custom" /> Secure checkout</div>
                <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-brand-custom" /> Express freight delivery</div>
                <div className="flex items-center gap-1.5"><RefreshCw className="w-4 h-4 text-brand-custom" /> 7-day ease returns</div>
                <div className="flex items-center gap-1.5">💳 UPI / PhonePe / COD</div>
              </div>

              <div className="bg-surface-custom p-3.5 rounded-xl border border-border-custom text-[10px] text-ink-2-custom font-medium leading-relaxed font-sans normal-case">
                <strong>📝 Application Disclaimer:</strong> Formulated solely for clothing, apparel fibers, motorcycle gear, and textiles. Not for sub-epidermal, underarm skin, or armpit application.
              </div>
            </div>

          </div>
        </div>

        {/* BELOW THE FOLD ANATOMICAL DETAILS */}
        <div className="mt-16 sm:mt-24 space-y-16">
          
          {/* Benefit Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-custom p-6 sm:p-10 rounded-2xl border border-border-custom text-center">
            <div className="space-y-1">
              <span className="text-3xl block">Pocket Size</span>
              <h5 className="font-sans font-bold text-xs text-ink-custom uppercase leading-none">50ml Pocket Mist</h5>
              <p className="text-[10px] text-ink-3-custom mt-1">Slim flat atomizer is 100% transport safety safe.</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-3xl block">10s Dry</span>
              <h5 className="font-sans font-bold text-xs text-ink-custom uppercase leading-none">Under 10s Dries</h5>
              <p className="text-[10px] text-ink-3-custom mt-1">Light water suspension evaporates clear completely.</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl block">320+ Mists</span>
              <h5 className="font-sans font-bold text-xs text-ink-custom uppercase leading-none">Over 325 Sprays</h5>
              <p className="text-[10px] text-ink-3-custom mt-1">Provides weeks of commuter dry confidence.</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl block">Zero Residue</span>
              <h5 className="font-sans font-bold text-xs text-ink-custom uppercase leading-none">Fiber Safeguard</h5>
              <p className="text-[10px] text-ink-3-custom mt-1">Non-greasy toroids leave zero white halos.</p>
            </div>
          </section>

          {/* Comparative analysis */}
          <section className="space-y-6 text-left" id="pdp-comparative-matrix">
            <div className="border-b border-border-custom pb-3.5">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-ink-custom uppercase tracking-tight">
                ODORSTRIKE vs. Conventional Alternatives
              </h3>
              <p className="text-xs text-ink-3-custom leading-normal mt-1">A transparent scientific review of molecular efficiency.</p>
            </div>
            
            <div className="border border-border-custom rounded-2xl overflow-hidden font-sans text-xs sm:text-sm shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-custom text-ink-custom font-mono uppercase tracking-wider text-[11px] font-bold border-b border-border-custom select-none">
                    <th className="p-4 sm:p-5">PROPERTIES MATRIX</th>
                    <th className="p-4 sm:p-5 text-brand-strong-custom bg-brand-tint-custom">ODORSTRIKE FABRIC MIST</th>
                    <th className="p-4 sm:p-5">STANDARD deodorant ROLL-ON</th>
                    <th className="p-4 sm:p-5">SYNTHETIC DESIGNER COLOGNES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom text-ink-2-custom">
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-ink-custom">Target Fiber Application</td>
                    <td className="p-4 sm:p-5 text-brand-strong-custom font-bold bg-brand-tint-custom/30">Directly on clothing & fabrics (Underarms, Chest, Collar, Sleeves)</td>
                    <td className="p-4 sm:p-5">Skin sweat glands only (underarms)</td>
                    <td className="p-4 sm:p-5">Neck/Wrist pulse centers</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-ink-custom">Caging Performance</td>
                    <td className="p-4 sm:p-5 text-brand-strong-custom font-bold bg-brand-tint-custom/30">Active torus inclusion complexes trap volatiles and halt escape</td>
                    <td className="p-4 sm:p-5">Block ducts using aluminum heavy metals</td>
                    <td className="p-4 sm:p-5">0%. Fragrance overlay only</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-ink-custom">Interaction with Sweat Scent</td>
                    <td className="p-4 sm:p-5 text-brand-strong-custom font-bold bg-brand-tint-custom/30">Neutralizes back to dry scentless baseline state</td>
                    <td className="p-4 sm:p-5">Turns into greasy sweat crust layers</td>
                    <td className="p-4 sm:p-5">Synthesizes heavy, sweet musk odor</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-ink-custom">Fabric Safeness Profile</td>
                    <td className="p-4 sm:p-5 text-brand-strong-custom font-bold bg-brand-tint-custom/30">100% Water-based inert. Zero stains or halos</td>
                    <td className="p-4 sm:p-5">Leaves stiff yellow sweat stain circles</td>
                    <td className="p-4 sm:p-5">Alcohol can damage polyester colors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Legal Metrology declarations */}
          <section className="bg-surface-custom border border-border-custom p-6 rounded-2xl text-left space-y-4 font-sans">
            <h4 className="font-mono text-xs uppercase tracking-wider font-extrabold text-brand-custom">
              Legal Metrology statutory declaration (Rule 6(10) of Legal Metrology CPC Rules 2011)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-ink-2-custom">
              <div className="space-y-2">
                <div><span className="block font-bold">Generic name of commodity:</span> <span>Textile deodorising spray, pocket card atomizer format.</span></div>
                <div><span className="block font-bold">Net volume of packaging unit:</span> <span>50 ml / Card bottle.</span></div>
                <div><span className="block font-bold">Country of Manufacture & Assembly:</span> <span>Proudly Made in India.</span></div>
              </div>
              <div className="space-y-2">
                <div><span className="block font-bold">Retail price of unit:</span> <span>₹229 MRP (Inclusive of standard state GST rates).</span></div>
                <div><span className="block font-bold">Corporate dispatch center details:</span> <span>Smelloff Direct Dispatch Node, Plot 142, Jubilee Hills, Hyderabad.</span></div>
                <div className="text-[10px] text-ink-3-custom italic">
                  *A custom single-unit package formulated for online consumer direct logistics. Safe for hand baggage in flight travel.
                </div>
              </div>
            </div>
          </section>

          {/* PDP REVIEWS & UPVOTING MODULE */}
          <section className="space-y-6 text-left border-t border-border-custom pt-12" id="pdp-reviews-fold" ref={reviewsSectionRef}>
            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 pb-4 border-b border-border-custom">
              <h3 className="font-display font-black text-2.5xl sm:text-3xl text-ink-custom uppercase tracking-tight">
                Verified Commuter Testimonials
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide">
                <span>Direct Hub Score:</span>
                <span className="text-brand-custom font-black font-mono">4.9 / 5.0 Rating</span>
              </div>
            </div>

            {/* Aggregate Customer Quotient bars REQUIREMENT */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-surface-custom p-6 rounded-2xl border border-border-custom">
              <div className="md:col-span-4 text-center md:text-left space-y-1">
                <span className="text-5xl font-mono font-black text-ink-custom block leading-none">4.9</span>
                <div className="flex justify-center md:justify-start text-amber-500 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-mono text-ink-3-custom block">Based on 418 verified stories</span>
              </div>

              {/* Aggregate rate sliders */}
              <div className="md:col-span-8 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="w-12 text-right">5 Star</span>
                  <div className="flex-grow h-2 bg-border-custom rounded-full overflow-hidden">
                    <div className="h-full bg-brand-custom rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <span className="w-8 text-right font-bold">92%</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-12 text-right">4 Star</span>
                  <div className="flex-grow h-2 bg-border-custom rounded-full overflow-hidden">
                    <div className="h-full bg-brand-custom rounded-full" style={{ width: "8%" }}></div>
                  </div>
                  <span className="w-8 text-right font-bold">8%</span>
                </div>

                <div className="flex items-center gap-3 opacity-40">
                  <span className="w-12 text-right font-medium text-ink-3-custom">3 Star</span>
                  <div className="flex-grow h-2 bg-border-custom rounded-full overflow-hidden">
                    <div className="h-full bg-brand-custom rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <span className="w-8 text-right">0%</span>
                </div>

                <div className="flex items-center gap-3 opacity-40">
                  <span className="w-12 text-right font-medium text-ink-3-custom">2 Star</span>
                  <div className="flex-grow h-2 bg-border-custom rounded-full overflow-hidden">
                    <div className="h-full bg-brand-custom rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <span className="w-8 text-right">0%</span>
                </div>

                <div className="flex items-center gap-3 opacity-40">
                  <span className="w-12 text-right font-medium text-ink-3-custom">1 Star</span>
                  <div className="flex-grow h-2 bg-border-custom rounded-full overflow-hidden">
                    <div className="h-full bg-brand-custom rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <span className="w-8 text-right">0%</span>
                </div>
              </div>
            </div>

            {/* Simulated Reviews Cards List with Interactive Upvoting */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {reviewsList.map((rev) => {
                const isUpvoted = upvotedReviews.includes(rev.id);
                return (
                  <div key={rev.id} className="bg-white p-5.5 rounded-2xl border border-border-custom/80 flex flex-col justify-between shadow-xs hover:border-brand-custom/50 transition-colors">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono font-bold text-brand-strong-custom bg-brand-tint-custom px-2 py-0.5 rounded uppercase">
                          ✓ VERIFIED COMMUTER
                        </span>
                      </div>
                      
                      <h4 className="font-sans font-black text-sm text-ink-custom uppercase leading-snug">
                        "{rev.heading}"
                      </h4>
                      
                      <p className="text-xs text-ink-2-custom leading-relaxed font-sans">
                        {rev.content}
                      </p>

                      <div className="text-[10px] text-ink-3-custom font-mono space-y-0.5">
                        <p><strong>Commuter Context:</strong> {rev.situation}</p>
                        <p><strong>Cycle:</strong> {rev.date}</p>
                      </div>
                    </div>

                    <div className="border-t border-border-custom/50 pt-3.5 mt-4 flex justify-between items-center bg-gray-50 -mx-5 px-5 -mb-5.5 py-3 rounded-b-2xl">
                      <div className="font-mono text-[10px] text-ink-2-custom uppercase font-black">
                        {rev.name} <span className="text-ink-3-custom font-normal">({rev.location})</span>
                      </div>
                      
                      {/* Helpful votes upvoting button */}
                      <button
                        onClick={() => handleUpvoteReview(rev.id)}
                        disabled={isUpvoted}
                        className={`font-sans font-bold text-[10.5px] px-2.5 py-1.5 rounded border transition-all flex items-center gap-1.5 cursor-pointer ${
                          isUpvoted
                            ? "bg-brand-custom text-white border-brand-custom"
                            : "bg-white text-ink-2-custom border-border-custom hover:bg-surface-custom"
                        }`}
                        aria-label="Mark review as helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </section>

          {/* PDP Frequently Asked Questions */}
          <section className="space-y-6 text-left border-t border-border-custom pt-12" id="pdp-faq-fold">
            <h3 className="font-display font-black text-2.5xl sm:text-3xl text-ink-custom uppercase tracking-tight">
              Objection Handlers & FAQ
            </h3>

            <div className="border border-border-custom rounded-2xl overflow-hidden divide-y divide-border-custom font-sans text-xs sm:text-sm shadow-xs">
              {[
                { q: "Is Smelloff a perfume or deodorant?", a: "No. Colognes and perfumes use synthetic fragrance oils to overpower or overlay sweat, often combining into a heavy odor. ODORSTRIKE contains zero heavy perfumes. It is an active chemical cage (starch-derived cyclodextrins) that physically encapsulates volatile odor compounds in textiles, rendering them sterile and scentless." },
                { q: "Can I spray ODORSTRIKE directly onto my skin?", a: "The formula is dermatologically safe, non-irritating, and water-based, but it is strictly designed and optimized for clothing fabrics, and apparel fibers. Do not spray it on your skin, underarms, or body. To remain fully compliant with Indian cosmetic regulations, we label and present this exclusively for textile application only." },
                { q: "Does it replace active machine washing?", a: "Absolutely not. Heavily soiled clothes with mud, food sauces, grease, or dirt require mechanical washing to extract grease. ODORSTRIKE is designed to neutralize volatile metabolic sweat-odor residues inside textile micro-cavities between laundry washes, or when laundry is delayed during commutes, travel, or college." },
                { q: "How long does a single 50ml bottle last?", a: "Each flat card atomizer delivers over 320 precision targeted sprays. If you spray your clothing underarms and chest twice daily, one pocket unit will comfortably provide 60+ days of scent-strike protection." },
                { q: "Is it safe on synthetic sports jersey polyester?", a: "Yes! Synthetic athletic fabrics like polyester act like massive odor reservoirs because oil-based sweat molecules embed inside the plastic-like fibers where standard water laundry cannot easily reach. ODORSTRIKE’s formula penetrates deep into micro-spaces of synthetic weaves, trapping these target volatile compounds instantly without staining or residue." }
              ].map((faq, idx) => {
                const isOpen = faqOpenIdx === idx;
                return (
                  <div key={idx} className="bg-white">
                    <button
                      onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 font-black text-ink-custom focus:outline-none flex justify-between items-center uppercase cursor-pointer hover:bg-surface-custom transition-all"
                    >
                      <span>{faq.q}</span>
                      <span className="text-brand-custom font-mono text-base">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-surface-custom text-ink-2-custom leading-relaxed animate-fadeIn border-t border-border-custom/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>

      </div>

      {/* STICKY BOTTOM MOBILE/DESKTOP ADD-TO-BAG BAR */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border-custom p-3.5 sm:p-4 animate-scaleUp flex justify-between items-center max-w-7xl mx-auto shadow-2xl">
          <div className="text-left font-mono">
            <span className="block text-[8px] uppercase tracking-widest text-ink-3-custom leading-none font-bold">ODORSTRIKE Card</span>
            <span className="block font-black text-ink-custom text-base sm:text-lg mt-0.5">₹{activeBundle.price * quantity}</span>
          </div>

          <button
            onClick={handleAddToCartClick}
            className="py-3 px-6 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO BAG
          </button>
        </div>
      )}

    </div>
  );
}
