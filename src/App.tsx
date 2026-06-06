/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Shield, Star, AlertTriangle, ArrowRight, BookOpen, 
  Trash2, Plus, Minus, Check, Scale, HelpCircle, Eye, ExternalLink, 
  RefreshCw, MapPin, Bike, School, Briefcase, Mail, ShieldAlert
} from "lucide-react";

import Navbar from "./components/Navbar";
import { Page, ProductBundle, CartItem, Order, Testimonial } from "./types";
import CheckoutOverlay from "./components/CheckoutOverlay";
import CartDrawer from "./components/CartDrawer";
import OrderTracker from "./components/OrderTracker";

// Import our modular new views
import ProductPDPView from "./components/ProductPDPView";
import ShopView from "./components/ShopView";
import AboutView from "./components/AboutView";
import HowItWorksView from "./components/HowItWorksView";
import BlogView, { BlogPostData, MOCK_BLOG_POSTS } from "./components/BlogView";
import BlogPostView from "./components/BlogPostView";
import ContactView from "./components/ContactView";
import LegalViews from "./components/LegalViews";

// E-commerce Product catalogs conforming to Dossier/Native 3-tier mapping
const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    id: "pack-1",
    name: "Solo Guard Bottle — 50ml",
    quantity: 1,
    price: 229,
    originalPrice: 229,
    savings: 0,
    description: "50ml pocket card spray. Approx. 320 precision targeted sprays. Essential tryout unit.",
    sizeMl: 50,
    hasPocketSleeve: false
  },
  {
    id: "pack-2",
    name: "ODORSTRIKE Twin Pack",
    quantity: 2,
    price: 399,
    originalPrice: 458,
    savings: 59,
    badge: "🔥 MOST POPULAR",
    description: "Twin pack (100ml total). Free Express Shipping. 1 for your work desk, 1 in your bike kit.",
    sizeMl: 50,
    hasPocketSleeve: false
  },
  {
    id: "pack-3",
    name: "Tri-Premium Scent Bundle",
    quantity: 3,
    price: 549,
    originalPrice: 687,
    savings: 138,
    badge: "⚡ BEST VALUE",
    description: "Includes 3 x 50ml bottles + 1 Custom Zippered Sheath (Free Shipping). Ideal for travelers.",
    sizeMl: 50,
    hasPocketSleeve: true
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Satish Kumar",
    location: "Ameerpet, Hyderabad",
    age: 24,
    situation: "Ameerpet Metro Commute",
    rating: 5,
    heading: "Perfume hybrid odors are finally gone!",
    content: "I take the LB Nagar rush hour metro line daily. Changing lines at Ameerpet means I'm soaking in sweat. Standard colognes mix with sweat to create a heavy sweet chemical musk. But 3 sprays of ODORSTRIKE caved the scent instantly. Dries completely flat clear.",
    date: "May 2026"
  },
  {
    id: "test-2",
    name: "Varun Nair",
    location: "Koramangala, Bengaluru",
    age: 21,
    situation: "Hostel Wear / College Sports",
    rating: 5,
    heading: "Saves my repeat wear garments",
    content: "Laundry in hostel feels impossible. I have sports polyester shirts that look completely pristine but carry stale locker smells. A quick mist of Smelloff's formula traps the odour particles from textile fibers instantly. Genuinely brilliant stuff.",
    date: "Jun 2026"
  },
  {
    id: "test-3",
    name: "Prashanth Reddy",
    location: "Jubilee Hills, Hyderabad",
    age: 29,
    situation: "Motorbike Road Commuter",
    rating: 5,
    heading: "Essential for 38°C city smog soot",
    content: "Riding my Pulsar bike through dense Secunderabad traffic means soot, engine oil, and sweat bake into my heavy riding jacket. 4 quick sprays of Odorstrike cages the pungent sweat odorants. Dries in under 10 seconds leaving a fresh neutral background.",
    date: "May 2026"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostData | null>(null);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);
  
  // New buyer status cached in localStorage for trial wedge
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // FAQ state on home page
  const [homeFaqOpen, setHomeFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    // Check local states on startup
    const returning = localStorage.getItem("smelloff_returning_customer") === "true";
    if (returning) {
      setIsNewCustomer(false);
    }
    const cookieConsent = localStorage.getItem("smelloff_cookie_consent") === "true";
    setHasAcceptedCookies(cookieConsent);
  }, []);

  const handleAddToCart = (bundle: ProductBundle) => {
    setCart(prev => {
      const existing = prev.find(item => item.bundle.id === bundle.id);
      if (existing) {
        return prev.map(item => 
          item.bundle.id === bundle.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { bundle, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the checkout cart drawer instantly
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setPlacedOrders(prev => [newOrder, ...prev]);
    setIsNewCustomer(false);
    localStorage.setItem("smelloff_returning_customer", "true");
    setOrderSuccessId(newOrder.id);
    setCurrentPage(Page.ORDER_TRACKER);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterSuccess(true);
      // Log DPDP-compliant consent event
      console.log("DATA PRINCIPAL CONSENT REGISTRATION:", {
        consentEvent: "Newsletter_OptIn_DPDP_2023",
        email: newsletterEmail,
        timestamp: new Date().toISOString(),
        consentText: "By submitting, I declare my consent for Smelloff to send transactional and promotional offers under DPDP principal rights."
      });
    }
  };

  const handleAcceptCookies = () => {
    localStorage.setItem("smelloff_cookie_consent", "true");
    setHasAcceptedCookies(true);
  };

  return (
    <div className="min-h-screen bg-bg text-ink-custom selection:bg-lime-200 flex flex-col justify-between font-sans">
      
      {/* Top Absolute Legal Metrology & Claims Strip */}
      <div className="bg-zinc-950 text-amber-500 py-2.5 px-4 text-center text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border-b border-gray-900 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2.5 z-50 select-none">
        <span className="flex items-center gap-1.5 justify-center">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
          Regulatory Standards warning:
        </span>
        <span>For use on fabric surface & inert apparel only. Strictly not for application on skin.</span>
        <button 
          onClick={() => setCurrentPage(Page.HOW_IT_WORKS)} 
          className="underline text-white hover:text-brand-custom font-extrabold uppercase cursor-pointer"
        >
          Verify Molecular Science
        </button>
      </div>

      {/* Navigation Header */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={currentPage === Page.BLOG_POST ? Page.BLOG : setCurrentPage} 
        cartCount={getCartCount()}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        
        {/* ==================== HOME PAGE LAYOUT ==================== */}
        {currentPage === Page.HOME && (
          <div className="animate-fadeIn">
            
            {/* HELPER SCRIPTS: Skip-to-content target */}
            <span id="pdp-main-anchor"></span>

            {/* 1. Hero Section (Phlur/Vacation inspired) */}
            <section className="bg-radial from-surface-custom to-white py-14 sm:py-24 border-b border-border-custom relative text-left" id="home-hero-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Selling headlines fold */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-2-custom border border-border-custom text-brand-custom text-[11px] font-mono font-extrabold uppercase tracking-widest pl-1.5 rounded">
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" /> INDIA'S FIRST POCKET SHIELD
                    </span>

                    <h1 className="font-display font-black text-4xl sm:text-7xl text-ink-custom tracking-tighter uppercase leading-[0.9] select-none">
                      People don't fear smelling bad — <span className="text-brand-custom block">they fear others noticing it.</span>
                    </h1>

                    <p className="font-sans text-base sm:text-lg text-ink-2-custom max-w-xl font-medium leading-relaxed">
                      Pocket-sized odor killer for your clothes — anytime, anywhere. Don’t drown sweat in heavy colognes. Lock down odors at the molecular fiber level inside 10 seconds.
                    </p>

                    {/* Pre-sale aggregate reviews fold above the fold REQUIREMENT */}
                    <div className="flex items-center gap-2 pt-1 font-mono text-xs select-none">
                      <div className="flex text-amber-500 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-bold underline text-ink-custom">(418 reviews)</span>
                      <span className="text-brand-custom font-extrabold bg-brand-custom/10 px-2 py-0.5 rounded text-[10px]">
                        98% commute success standard
                      </span>
                    </div>

                    {/* Conversion Hook buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-3 select-none">
                      <button
                        onClick={() => {
                          setCurrentPage(Page.PRODUCT);
                          setTimeout(() => {
                            document.getElementById("pdp-main-anchor")?.scrollIntoView({ behavior: "smooth" });
                          }, 50);
                        }}
                        className="py-4 px-8 bg-accent-custom hover:bg-brand-custom border border-border-custom hover:border-brand-custom text-accent-ink-custom hover:text-white font-sans font-black text-center text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2"
                        id="home-hero-cta"
                      >
                        Grab ODORSTRIKE — ₹229 <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                      
                      <button
                        onClick={() => setCurrentPage(Page.HOW_IT_WORKS)}
                        className="py-4 px-8 border border-border-custom bg-surface-custom hover:bg-white text-ink-custom font-sans font-extrabold text-center text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
                      >
                        How the cyclodextrin chemistry works
                      </button>
                    </div>
                  </div>

                  {/* Right side mockup asset */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] rounded-3xl bg-gray-950 border border-gray-800 p-6 flex flex-col justify-between items-center shadow-2xl relative select-none">
                      <div className="absolute top-1/4 -right-12 w-32 h-32 bg-lime-500/20 blur-[50px] rounded-full pointer-events-none"></div>
                      
                      <div className="w-full text-center mt-4">
                        <span className="block font-display font-black text-white text-4.5xl tracking-tighter uppercase leading-none">
                          SMELLOFF<span className="text-lime-550">.</span>
                        </span>
                        <span className="block font-mono text-[8px] uppercase tracking-widest text-lime-400 font-extrabold mt-1">
                          Fabric Odor strike
                        </span>
                      </div>

                      {/* Animated Mist Ring particle effect using pure CSS */}
                      <div className="flex-grow flex items-center justify-center relative w-full mt-4">
                        <div className="w-28 h-[140px] bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col justify-end items-center shadow-2xl p-4">
                          <div className="text-[7px] text-center text-gray-500 uppercase tracking-wider font-mono">
                            MATTE CARD
                            <span className="block text-lime-400 font-bold text-[8px] mt-1 pr-0.5">50ml pocket spray</span>
                          </div>
                        </div>
                        <div className="absolute top-10 right-4 w-12 h-12 border border-lime-500/20 rounded-full animate-ripple pointer-events-none"></div>
                      </div>

                      <div className="w-full border-t border-gray-900 pt-3 text-center mb-4">
                        <span className="block font-mono text-[8.5px] uppercase tracking-wider text-gray-400">
                          Formulated exclusively for clothing fibers
                        </span>
                        <span className="block font-sans font-black text-lime-500 text-[9.5px] uppercase mt-1">
                          Not for application to skin
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. Trust Bar (Lume/Bombay Shaving style) */}
            <section className="bg-slate-950 border-y border-gray-900 text-white/90 py-5 select-none font-mono text-[10px] sm:text-xs">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lime-400">🌱</span>
                    <span>Fabric-only, skin-safe inert water</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lime-400">👜</span>
                    <span>Ultra-flat 50ml pocket card</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lime-400">📦</span>
                    <span>Cash on Delivery + UPI active</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lime-400">🇮🇳</span>
                    <span>Formulated for Indian temperatures</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Problem→Solution empathetic copy */}
            <section className="py-16 sm:py-20 bg-white border-b border-border-custom" id="home-problem-solution">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-widest pl-1">
                  The Scent Dilemma
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none">
                  Colognes don't neutralize sweat — <span className="text-brand-custom block sm:inline">they cooperate with it.</span>
                </h2>
                <p className="text-sm sm:text-base text-ink-2-custom max-w-3xl mx-auto leading-relaxed">
                  Have you ever sprayed expensive sandalwood designer cologne overlaying a sweaty formal cotton shirt? Rather than caging the odor, they combine into a heavy, sweet chemical musk. Sweating on local Hyderabad metro rails or motorbike commutes means bacterium cells break down sweat lipids on clothing fibers into volatile cheese-onion compounds. Deodorant is for dry skin; garments require cyclodextrin caging. We created ODORSTRIKE as a 5-second fix.
                </p>
                
                <div className="pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-strong-custom uppercase bg-surface-custom border px-3 py-1.5 rounded">
                    🧬 Active Agent Complex: HPβ-Cyclodextrin
                  </span>
                </div>
              </div>
            </section>

            {/* 4. How it works (3 steps diagram) */}
            <section className="py-16 sm:py-20 bg-surface-custom border-b border-border-custom" id="home-how-works">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Scientific Execution
                  </span>
                  <h3 className="text-3xl sm:text-4.5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-2">
                    How ODORSTRIKE Locks Malodours In 3 Steps:
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-ink-2-custom">
                    A starch-derived toroidal doughnut physical encapsulation system. Safe for all fabrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-border-custom text-left space-y-3.5">
                    <span className="text-4xl">01</span>
                    <h4 className="font-sans font-bold text-ink-custom text-base uppercase">1. Spray Garment Mesh</h4>
                    <p className="text-xs text-ink-2-custom leading-relaxed">
                      Deliver microfine active mist directly onto synthetic underarm shirt meshes or thick motorcycle canvas. Dries clear in 10 seconds leaving a neutral baseline.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-border-custom text-left space-y-3.5">
                    <span className="text-4xl text-brand-custom">02</span>
                    <h4 className="font-sans font-bold text-ink-custom text-base uppercase">2. Deep Encapsulation</h4>
                    <p className="text-xs text-ink-2-custom leading-relaxed">
                      Microscopic, cup-shaped cyclodextrin rings (HPβCD) seek the volatilized organic hydrocarbons on textile fibers and cage them entirely inside oil-attracting hydrophobic cavities.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-border-custom text-left space-y-3.5">
                    <span className="text-4xl">03</span>
                    <h4 className="font-sans font-bold text-ink-custom text-base uppercase">3. Scent Isolation Complete</h4>
                    <p className="text-xs text-ink-2-custom leading-relaxed">
                      By surrounding the volatile onion-musk and cheese compounds, cyclodextrins drop volatilization to zero. The smell halts safely before reaching corporate nose levels!
                    </p>
                  </div>
                </div>

                <div className="text-center pt-8">
                  <button
                    onClick={() => setCurrentPage(Page.HOW_IT_WORKS)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-custom hover:text-brand-strong-custom uppercase tracking-wider underline cursor-pointer"
                  >
                    Review full publication references & PMC7692034 data logs
                  </button>
                </div>

              </div>
            </section>

            {/* 5. Price Ladder / Packs section with trial wedge (TRY 1 FOR ₹179!) */}
            <section className="py-16 sm:py-24 bg-white" id="home-price-ladder">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Bundle & Save Packs
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-2">
                    SELECT YOUR SCENT SHIELD TIER
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-ink-2-custom">
                    Direct dispatcher prices with absolutely zero agent commission cuts. Multi-pack bundles qualify for free express courier freight.
                  </p>
                </div>

                {/* Trial Wedge Block REQUIREMENT */}
                {isNewCustomer && (
                  <div className="bg-lime-50 border border-lime-150 p-6 rounded-2xl max-w-2xl mx-auto mb-10 text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="space-y-1.5 max-w-md">
                      <span className="bg-brand-custom text-white font-mono text-[9px] uppercase font-black px-2 py-0.5 rounded shadow">
                        🎁 NEW VISITOR WEDGET
                      </span>
                      <h4 className="font-display font-black text-xl text-ink-custom uppercase leading-none">First-Order? Try 1 Bottle for ₹179!</h4>
                      <p className="text-xs text-ink-2-custom leading-relaxed font-medium">
                        We want to lower the entry threshold. Check out a single 50ml pocket bottle for only ₹179 during first order. Limits 1 per buyer address.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart({
                          id: "pack-1-trial",
                          name: "First Order Trial Wedge - 50ml",
                          quantity: 1,
                          price: 179,
                          originalPrice: 229,
                          savings: 50,
                          description: "First-Order Introductory Unit. Active cyclodextrin lock.",
                          sizeMl: 50,
                          hasPocketSleeve: false
                        });
                      }}
                      className="py-3 px-5 whitespace-nowrap bg-brand-custom hover:bg-brand-strong-custom text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow"
                    >
                      ADD TRIAL ₹179
                    </button>
                  </div>
                )}

                {/* 3 Ladder Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                  {PRODUCT_BUNDLES.map((pack) => {
                    const isMiddlePopular = pack.badge?.includes("MOST POPULAR");
                    
                    return (
                      <div 
                        key={pack.id}
                        className={`flex flex-col justify-between p-6 sm:p-8 rounded-2xl border transition-all ${
                          isMiddlePopular 
                            ? "bg-white border-brand-custom shadow-lg relative scale-105 z-10" 
                            : "bg-white border-border-custom hover:border-brand-custom select-none"
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-3 left-6 bg-brand-custom text-white font-mono text-[9px] uppercase font-black px-3.5 py-1 rounded shadow">
                            {pack.badge}
                          </span>
                        )}

                        <div className="space-y-4">
                          <span className="block font-sans font-bold text-xs uppercase text-ink-3-custom font-mono">
                            Odorstrike Pocket Core
                          </span>

                          <div className="text-left">
                            <h4 className="font-display font-black text-2.5xl text-ink-custom uppercase leading-tight tracking-tight">
                              {pack.name}
                            </h4>
                            <p className="text-xs text-ink-2-custom mt-1.5 leading-relaxed min-h-[3rem]">
                              {pack.description}
                            </p>
                          </div>
                        </div>

                        {/* Price footer items inside card */}
                        <div className="mt-8 pt-4 border-t border-border-custom space-y-4 text-left">
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono text-[9px] uppercase font-bold text-ink-3-custom">Direct Price</span>
                            <div>
                              <div className="flex items-baseline justify-end gap-1.5">
                                {pack.savings > 0 && (
                                  <span className="text-price-strike-custom line-through font-mono text-xs">
                                    ₹{pack.originalPrice}
                                  </span>
                                )}
                                <span className="font-mono font-black text-2xl text-ink-custom">
                                  ₹{pack.price}
                                </span>
                              </div>
                              {pack.savings > 0 && (
                                <span className="block text-[9px] text-right font-mono font-bold text-brand-custom uppercase leading-none mt-1">
                                  CONVERSION SAVE ₹{pack.savings}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleAddToCart(pack)}
                            className="w-full py-3.5 bg-gray-950 hover:bg-gray-800 text-white font-sans font-black text-xs uppercase text-center tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            Add To Bag Scent Shield
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* 6. Social Proof / reviews */}
            <section className="py-16 bg-surface-custom border-y border-border-custom text-left" id="home-social-proof">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Customer Experience Logs
                  </span>
                  <h3 className="text-3xl sm:text-4.5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-2">
                    REVIEWS FROM INDIAN COMMUTERS
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-3-custom font-mono uppercase">
                    AGGREGATE METRIC STATUS: 4.9 OUT OF 5.0 RATINGS BY VERIFIED BUYERS
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS.map((ts) => (
                    <div key={ts.id} className="bg-white p-5 rounded-2xl border border-border-custom flex flex-col justify-between shadow-sm">
                      <div className="space-y-3">
                        <div className="flex gap-0.5 text-amber-500">
                          {Array.from({ length: ts.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <h4 className="font-sans font-bold text-ink-custom text-sm leading-snug">
                          "{ts.heading}"
                        </h4>
                        <p className="text-xs text-ink-2-custom leading-relaxed">
                          {ts.content}
                        </p>
                      </div>

                      <div className="border-t border-border-custom pt-3 mt-5 flex justify-between items-center font-mono text-[9px] uppercase font-bold text-ink-3-custom">
                        <span>{ts.name} • {ts.situation}</span>
                        <span className="text-brand-custom">✓ VERIFIED</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 7. Use cases grid (Scent-grid style) */}
            <section className="py-16 sm:py-20 bg-white border-b border-border-custom text-left" id="home-use-cases">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Versatility Grid
                  </span>
                  <h3 className="text-3xl sm:text-4.5xl font-display font-black text-ink-custom uppercase tracking-tight leading-none mt-2">
                    5 SCENARIOS WHERE YOU NEED Scent PROTECTION
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-surface-custom p-5 rounded-xl border border-border-custom text-left space-y-2">
                    <span className="text-2xl"><Briefcase className="w-6 h-6 text-brand-custom" /></span>
                    <h5 className="font-sans font-bold text-ink-custom text-sm uppercase">1. Office Formals</h5>
                    <p className="text-[11px] text-ink-2-custom leading-relaxed">Lock down damp underarm formal meshes prior to corporate meetings.</p>
                  </div>

                  <div className="bg-surface-custom p-5 rounded-xl border border-border-custom text-left space-y-2">
                    <span className="text-2xl"><Bike className="w-6 h-6 text-brand-custom" /></span>
                    <h5 className="font-sans font-bold text-ink-custom text-sm uppercase">2. bike jackets</h5>
                    <p className="text-[11px] text-ink-2-custom leading-relaxed">Refresh heavy soot meshes baked during Outer Ring Road moto traffic.</p>
                  </div>

                  <div className="bg-surface-custom p-5 rounded-xl border border-border-custom text-left space-y-2">
                    <span className="text-2xl">👩‍❤️‍👨</span>
                    <h5 className="font-sans font-bold text-ink-custom text-sm uppercase">3. Transit dates</h5>
                    <p className="text-[11px] text-ink-2-custom leading-relaxed">Prevent commute anxiety prior to meeting friends or partners.</p>
                  </div>

                  <div className="bg-surface-custom p-5 rounded-xl border border-border-custom text-left space-y-2">
                    <span className="text-2xl"><School className="w-6 h-6 text-brand-custom" /></span>
                    <h5 className="font-sans font-bold text-ink-custom text-sm uppercase">4. College wear</h5>
                    <p className="text-[11px] text-ink-2-custom leading-relaxed">Refresh previous-night visual t-shirts lingering in dorm cupboards.</p>
                  </div>

                  <div className="bg-surface-custom p-5 rounded-xl border border-border-custom text-left space-y-2">
                    <span className="text-2xl">🏋️</span>
                    <h5 className="font-sans font-bold text-ink-custom text-sm uppercase">5. Gym sport fabrics</h5>
                    <p className="text-[11px] text-ink-2-custom leading-relaxed">Banish persistent sweat odor locked in synthetic polyester blends.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* 8. Founder Note Story */}
            <section className="py-16 bg-surface-custom border-b border-border-custom text-left" id="home-founder-note">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 sm:p-10 rounded-2xl border border-border-custom space-y-4">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Founder Dispatch
                  </span>
                  <h3 className="text-2.5xl sm:text-4xl font-display font-black text-ink-custom uppercase tracking-tight">
                    OUR MOTIVATION: SILENT ANXIETY REDUCTION
                  </h3>
                  <p className="text-sm text-ink-2-custom leading-relaxed">
                    "I founded Smelloff in Hyderabad because active young Indian men are consistently let down by marketing giants. Body sprays are built for skin cosmetics and smell like heavy chemical factories. ODORSTRIKE handles odors purely via science — caging compounds on garments without perfumes, keeping you completely relaxed during active transit."
                  </p>
                  
                  <div className="flex items-center gap-4 border-t border-border-custom pt-4 select-none">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                      SML
                    </div>
                    <div>
                      <span className="block text-xs font-bold font-sans text-ink-custom">Dr. Srikar Reddy</span>
                      <span className="block text-[10px] font-mono text-ink-3-custom uppercase mt-0.5">Founder, smelloff.in</span>
                    </div>
                    <button 
                      onClick={() => setCurrentPage(Page.ABOUT)}
                      className="ml-auto font-mono text-xs font-bold text-brand-custom hover:text-brand-strong-custom uppercase underline cursor-pointer"
                    >
                      Read full manifesto
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. FAQ accordion (objection handling) */}
            <section className="py-16 sm:py-20 bg-white border-b border-border-custom text-left" id="home-faqs">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
                  <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider">
                    Objection Solvers
                  </span>
                  <h3 className="text-3xl sm:text-4.5xl font-display font-black text-ink-custom uppercase tracking-tight">
                    FREQUENTLY ASKED CHEST
                  </h3>
                </div>

                <div className="border border-border-custom rounded-2xl overflow-hidden divide-y divide-border-custom font-sans text-xs sm:text-sm">
                  {[
                    { q: "Is Smelloff a perfume?", a: "No. Standard perfume relies on synthetic oil molecules to cover bad smells. ODORSTRIKE is an inert, fabric-first atomic cage that traps other scent compounds physically, leaving clothes completely neutral." },
                    { q: "Is it safe directly on my skin?", a: "The formula is dermatologically safe and non-reactive, but it is chemically engineered exclusively for clothing fibers. Apply directly onto garments only." },
                    { q: "Does it replace laundry?", a: "Absolutely not. Heavily muddy, grease-dripped, or visually soiled clothes still require physical washing. ODORSTRIKE is engineered to keep visual garments fresh during commute days." },
                    { q: "How long does a single 50ml card bottle last?", a: "Over 320 precision focused micro-atomizer sprays. If spraying twice daily on underarm shirt fabrics, one bottle lasts approx. 3 to 4 weeks." }
                  ].map((faq, idx) => {
                    const isOpen = homeFaqOpen === idx;
                    return (
                      <div key={idx} className="bg-white">
                        <button
                          onClick={() => setHomeFaqOpen(isOpen ? null : idx)}
                          className="w-full text-left p-4 sm:p-5 font-bold text-ink-custom focus:outline-none flex justify-between items-center uppercase cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <span className="text-brand-custom font-mono text-base">{isOpen ? "−" : "+"}</span>
                        </button>
                        {isOpen && (
                          <div className="p-4 sm:p-5 bg-surface-custom text-ink-2-custom leading-relaxed animate-fadeIn">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* 10. Final CTA Band (acid green background, --accent-ink text) */}
            <section className="bg-accent-custom text-accent-ink-custom py-16 sm:py-24 text-center select-none" id="home-cta-band">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <span className="font-mono text-xs font-black uppercase tracking-widest pl-1 block text-ink-custom">
                  SMELLOFF DISPATCH COMPOSURE
                </span>
                
                <h2 className="text-4xl sm:text-6xl font-display font-black text-ink-custom uppercase leading-none tracking-tight">
                  CARRY CONFIDENCE IN YOUR POCKET
                </h2>
                
                <p className="text-xs sm:text-sm text-ink-2-custom max-w-lg mx-auto leading-relaxed font-bold">
                  Try ODORSTRIKE fabric mist today. 100% CDSCO safe water base. Generous 7-day returns direct guarantee protection.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setCurrentPage(Page.PRODUCT);
                      setTimeout(() => {
                        document.getElementById("pdp-main-anchor")?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }}
                    className="py-4 px-8 bg-gray-950 hover:bg-gray-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5 mx-auto"
                  >
                     Shop ODORSTRIKE fabric mist ₹229
                  </button>
                </div>
              </div>
            </section>

            {/* 11. Newsletter opt-in */}
            <section className="py-14 sm:py-18 bg-surface-custom border-t border-border-custom text-left" id="home-newsletter-optin">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border-custom space-y-5">
                  <div className="space-y-1">
                    <span className="block font-mono text-[9px] uppercase font-bold text-brand-custom">DPDP Act 2023 Compliant</span>
                    <h4 className="font-display font-black text-xl sm:text-2xl text-ink-custom uppercase leading-none tracking-tight">
                      Subscribe for lab dispatches & science offers
                    </h4>
                    <p className="text-xs text-ink-2-custom">
                      Honest communication only. No transactional inbox spamming. Unsubscribe anytime.
                    </p>
                  </div>

                  {!newsletterSuccess ? (
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="smit@gmail.com"
                        className="flex-grow border border-border-custom bg-surface-custom text-ink-custom p-3.5 text-xs sm:text-sm rounded-xl focus:border-brand-custom outline-none"
                      />
                      <button
                        type="submit"
                        className="py-3.5 px-6 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs uppercase rounded-xl tracking-wider cursor-pointer whitespace-nowrap transition-all"
                      >
                        Consent & Join
                      </button>
                    </form>
                  ) : (
                    <div className="p-4 bg-lime-50 text-brand-strong-custom text-xs font-mono font-bold rounded-lg border border-lime-200 uppercase text-center animate-scaleIn">
                      🎉 Success! Data principal registration complete. Thank you!
                    </div>
                  )}

                  <div className="flex gap-2 items-start text-[9.5px] text-ink-3-custom leading-normal">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-brand-custom mt-0.5" />
                    <span>
                      Notice under DPDP Act 2023: By entering email, you grant Smelloff explicit request consent to register coordinate communication nodes. Your rights of correction/erasure remain protected or accessible via privacy@smelloff.in.
                    </span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== PRODUCT DETAIL PAGE VIEW ==================== */}
        {currentPage === Page.PRODUCT && (
          <ProductPDPView 
            bundles={PRODUCT_BUNDLES}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onNavigateToPage={setCurrentPage}
          />
        )}

        {/* ==================== SHOP COLLECTION VIEW ==================== */}
        {currentPage === Page.SHOP && (
          <ShopView 
            bundles={PRODUCT_BUNDLES}
            onAddToCart={handleAddToCart}
            onSelectProduct={() => setCurrentPage(Page.PRODUCT)}
          />
        )}

        {/* ==================== BRAND MANIFESTO VIEW ==================== */}
        {currentPage === Page.ABOUT && (
          <AboutView 
            onSelectProduct={() => setCurrentPage(Page.PRODUCT)}
          />
        )}

        {/* ==================== HOW IT WORKS SCIENCE VIEW ==================== */}
        {currentPage === Page.HOW_IT_WORKS && (
          <HowItWorksView 
            onSelectProduct={() => setCurrentPage(Page.PRODUCT)}
          />
        )}

        {/* ==================== BLOG LIST INDEX ==================== */}
        {currentPage === Page.BLOG && (
          <BlogView 
            onSelectPost={(post) => {
              setSelectedBlogPost(post);
              setCurrentPage(Page.BLOG_POST);
            }}
            currentPage={currentPage}
          />
        )}

        {/* ==================== BLOG SINGLE POST VIEW ==================== */}
        {currentPage === Page.BLOG_POST && selectedBlogPost && (
          <BlogPostView 
            post={selectedBlogPost}
            onBackToBlog={() => setCurrentPage(Page.BLOG)}
            onSelectProduct={() => setCurrentPage(Page.PRODUCT)}
            allPosts={MOCK_BLOG_POSTS}
          />
        )}

        {/* ==================== SUPPORT CONTACT CENTRE ==================== */}
        {currentPage === Page.CONTACT && (
          <ContactView 
            onGoToFaqs={() => {
              setCurrentPage(Page.HOME);
              setTimeout(() => {
                document.getElementById("home-faqs")?.scrollIntoView({ behavior: "smooth" });
              }, 50);
            }}
          />
        )}

        {/* ==================== SPECIFIC LEGAL SECTIONS ==================== */}
        {currentPage === Page.PRIVACY && (
          <LegalViews section="privacy" onSelectProduct={() => setCurrentPage(Page.PRODUCT)} />
        )}
        {currentPage === Page.TERMS && (
          <LegalViews section="terms" onSelectProduct={() => setCurrentPage(Page.PRODUCT)} />
        )}
        {currentPage === Page.REFUND && (
          <LegalViews section="refund" onSelectProduct={() => setCurrentPage(Page.PRODUCT)} />
        )}
        {currentPage === Page.SHIPPING && (
          <LegalViews section="shipping" onSelectProduct={() => setCurrentPage(Page.PRODUCT)} />
        )}

        {/* ==================== ORDER milestons TRACKER VIEW ==================== */}
        {currentPage === Page.ORDER_TRACKER && (
          <div className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-left">
            {orderSuccessId && (
              <div className="bg-emerald-50 border-2 border-emerald-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow shrink-0">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-display font-black text-emerald-950 uppercase text-sm font-bold">Secure Razorpay Sandbox Approved!</h4>
                    <p className="text-xs text-emerald-800 leading-normal mt-0.5 font-medium">
                      Your Smelloff Order ID <strong className="font-mono text-zinc-950 bg-white px-2 py-0.5 border rounded border-emerald-500/10 text-[11px]">{orderSuccessId}</strong> has been registered successfully. Logistics labels generated.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOrderSuccessId(null)}
                  className="px-4 py-2 border border-emerald-500/20 bg-white hover:bg-emerald-500 hover:text-white rounded-xl text-xs font-mono font-bold uppercase cursor-pointer text-emerald-800 shadow-xs transition-all shrink-0"
                >
                  Dismiss notice
                </button>
              </div>
            )}
            <OrderTracker customOrders={placedOrders} />
          </div>
        )}

      </main>

      {/* Structured E-commerce Brand Footer REQUIREMENT */}
      <footer className="bg-slate-950 text-white/60 border-t border-gray-900 pt-16 pb-8" id="store-main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-gray-900 pb-12 mb-10 text-left">
            
            {/* Column 1: Brand descriptions */}
            <div className="md:col-span-5 space-y-4">
              <span className="block font-display font-black text-white text-2.5xl tracking-tighter uppercase leading-none select-none">
                SMELLOFF<span className="text-lime-500">.</span>
              </span>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Odors locked directly inside clothing fibers trigger silent daily anxiety. Smelloff operates a dedicated physical molecular science lab in Hyderabad, fabricating active cyclic starch traps for fast-paced commutes in Indian metropolitan environments.
              </p>
              
              <div className="flex gap-4 font-mono text-[10px] text-lime-400 uppercase tracking-widest font-extrabold select-none">
                <a href="https://smelloff.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 cursor-pointer">
                  smelloff.in <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="https://instagram.com/smell0ff" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 cursor-pointer">
                  Insta @smell0ff <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Legal compliance metrology footnotes */}
            <div className="md:col-span-4 space-y-3.5">
              <span className="block font-mono text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                CDSCO Regulatory compliance
              </span>
              <p className="text-[10px] leading-relaxed text-gray-500">
                Smelloff operates in strict adherence to the **Drugs & Cosmetics Act 1940**. Formulations are exclusively designated for garment textile fibers surface application. Strictly not for use on skin cosmetics.
              </p>
              <p className="text-[10px] leading-relaxed text-gray-500">
                All performance metrics validated under physical olfactory logs Ref: SMEL-25-OL1 (Consumer Protection Act 2019 compliance). We hold solid solo founder liability, publishing lab coordinates transparently.
              </p>
            </div>

            {/* Column 3: Multi-Page routing */}
            <div className="md:col-span-3 space-y-4 text-left">
              <span className="block font-mono text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                Brand Directory Map
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-wider font-sans text-gray-400">
                <button onClick={() => setCurrentPage(Page.PRODUCT)} className="text-left hover:text-white cursor-pointer select-none">PDP Sheet</button>
                <button onClick={() => setCurrentPage(Page.SHOP)} className="text-left hover:text-white cursor-pointer select-none">Shop Packs</button>
                <button onClick={() => setCurrentPage(Page.HOW_IT_WORKS)} className="text-left hover:text-white cursor-pointer select-none">Our Science</button>
                <button onClick={() => setCurrentPage(Page.ABOUT)} className="text-left hover:text-white cursor-pointer select-none">Our Story</button>
                <button onClick={() => setCurrentPage(Page.BLOG)} className="text-left hover:text-white cursor-pointer select-none">Man Mag</button>
                <button onClick={() => setCurrentPage(Page.CONTACT)} className="text-left hover:text-white cursor-pointer select-none">Support</button>
                <button onClick={() => setCurrentPage(Page.PRIVACY)} className="text-left hover:text-white cursor-pointer select-none">DPDP Act</button>
                <button onClick={() => setCurrentPage(Page.TERMS)} className="text-left hover:text-white cursor-pointer select-none">Terms</button>
                <button onClick={() => setCurrentPage(Page.REFUND)} className="text-left hover:text-white cursor-pointer select-none">Returns</button>
                <button onClick={() => setCurrentPage(Page.SHIPPING)} className="text-left hover:text-white cursor-pointer select-none">Delivery</button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Address line */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 font-mono tracking-wider uppercase gap-4 text-center select-none pt-4">
            <span>© 2026 Smelloff India. All Scent Protection Rights Reserved.</span>
            <span>Plot 142, Jubilee Hills Enclave, Hyderabad, Telangana, 500081, India</span>
          </div>

        </div>
      </footer>

      {/* RIGHT SLIDE-IN CART DRAWER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        bundles={PRODUCT_BUNDLES}
        onGoToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* FULL-SCREEN RAZORPAY CHECKOUT OVERLAY PANEL DRAWER */}
      <CheckoutOverlay 
        bundles={PRODUCT_BUNDLES}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        setCart={setCart}
        onOrderSuccess={handleOrderSuccess}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Privacy-Conforming Cookie Consent banner under European & Indian legislation REQUIREMENT */}
      {!hasAcceptedCookies && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-slate-950 border border-gray-900 max-w-xl text-white p-4.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-left animate-fadeIn">
          <div className="space-y-1 font-sans">
            <span className="block font-mono text-[9px] uppercase font-bold text-lime-400">Indian DPDP & Cookie Consent Notice</span>
            <p className="text-[11px] text-gray-300 leading-normal">
              smelloff.in registers cookie coordination nodes exclusively to store your sandboxed OTP credentials & product cart matrices. We operate complete compliance under the <strong>Digital Personal Data Protection Act, 2023</strong> in absolute safety.
            </p>
          </div>

          <div className="flex gap-2 shrink-0 select-none">
            <button
              onClick={() => setCurrentPage(Page.PRIVACY)}
              className="px-3.5 py-2 hover:bg-zinc-900 border border-border-custom hover:border-white rounded-lg text-[10px] uppercase font-mono font-bold cursor-pointer text-white"
            >
              Learn Policy
            </button>
            <button
              onClick={handleAcceptCookies}
              className="px-4 py-2 bg-brand-custom hover:bg-brand-strong-custom text-white rounded-lg text-[10px] uppercase font-mono font-black tracking-wide cursor-pointer transition-colors"
            >
              Acknowledge / Agree
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
