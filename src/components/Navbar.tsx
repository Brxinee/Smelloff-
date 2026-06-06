/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, Menu, X, ExternalLink, ShieldCheck, User, PhoneCall, HelpCircle } from "lucide-react";
import { Page } from "../types";

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Esc key closes mobile navigation drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // body scroll lock
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle skip to content link click
  const handleSkipToContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip to Content details for Web Accessibility */}
      <button
        onClick={handleSkipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-focus-custom focus:text-white focus:rounded-md focus:font-sans focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all cursor-pointer"
      >
        Skip to main content
      </button>

      {/* Sticky Header with Slim Top Announcement Bar (Genuine messaging only) */}
      <div className="w-full bg-slate-950 text-white font-mono text-[10px] sm:text-xs font-bold py-2 px-4 text-center tracking-wider uppercase border-b border-gray-900 select-none z-50 relative flex items-center justify-center gap-1">
        <span>🎉 Free shipping over ₹499 • Cash on Delivery (COD) available across India</span>
      </div>

      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border-custom transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo Left */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setCurrentPage(Page.HOME);
                  setMobileMenuOpen(false);
                }}
                className="text-left group focus:outline-none focus:ring-2 focus:ring-focus-custom rounded-lg p-1 transition-all"
                id="nav-logo-btn"
                aria-label="Smelloff - Go to home"
              >
                <span className="block font-display font-black text-2xl tracking-tighter text-ink-custom group-hover:text-brand-custom transition-colors select-none">
                  SMELLOFF<span className="text-brand-custom">.</span>
                </span>
                <span className="block font-mono text-[8px] uppercase tracking-widest text-ink-3-custom font-extrabold leading-none select-none">
                  ODORSTRIKE Fabric Mist
                </span>
              </button>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans" aria-label="Primary">
              <button
                onClick={() => setCurrentPage(Page.PRODUCT)}
                className={`font-semibold text-sm transition-colors cursor-pointer hover:text-brand-custom p-1 rounded focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                  currentPage === Page.PRODUCT
                    ? "text-brand-custom border-b-2 border-brand-custom"
                    : "text-ink-2-custom"
                }`}
                id="nav-pdp-btn"
              >
                ODORSTRIKE PDP
              </button>
              <button
                onClick={() => setCurrentPage(Page.SHOP)}
                className={`font-semibold text-sm transition-colors cursor-pointer hover:text-brand-custom p-1 rounded focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                  currentPage === Page.SHOP
                    ? "text-brand-custom border-b-2 border-brand-custom"
                    : "text-ink-2-custom"
                }`}
                id="nav-shop-btn"
              >
                Packs / Shop
              </button>
              <button
                onClick={() => setCurrentPage(Page.HOW_IT_WORKS)}
                className={`font-semibold text-sm transition-colors cursor-pointer hover:text-brand-custom p-1 rounded focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                  currentPage === Page.HOW_IT_WORKS
                    ? "text-brand-custom border-b-2 border-brand-custom"
                    : "text-ink-2-custom"
                }`}
                id="nav-how-btn"
              >
                The Science
              </button>
              <button
                onClick={() => setCurrentPage(Page.ABOUT)}
                className={`font-semibold text-sm transition-colors cursor-pointer hover:text-brand-custom p-1 rounded focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                  currentPage === Page.ABOUT
                    ? "text-brand-custom border-b-2 border-brand-custom"
                    : "text-ink-2-custom"
                }`}
                id="nav-about-btn"
              >
                Brand Story
              </button>
              <button
                onClick={() => setCurrentPage(Page.BLOG)}
                className={`font-semibold text-sm transition-colors cursor-pointer hover:text-brand-custom p-1 rounded focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                  currentPage === Page.BLOG
                    ? "text-brand-custom border-b-2 border-brand-custom"
                    : "text-ink-2-custom"
                }`}
                id="nav-blog-btn"
              >
                Man Mag
              </button>
            </nav>

            {/* Right Utilities */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => setCurrentPage(Page.CONTACT)}
                className="hidden lg:inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-ink-custom hover:text-brand-custom px-3 py-2 rounded-lg border border-border-custom hover:bg-surface-custom transition-all"
                id="nav-contact-btn"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-custom" /> Support
              </button>

              <button
                onClick={() => setCurrentPage(Page.ORDER_TRACKER)}
                className="hidden lg:inline-flex items-center gap-1.5 font-mono font-bold text-[10px] sm:text-xs uppercase tracking-widest text-ink-2-custom hover:text-brand-custom px-3 py-2 rounded-lg border border-border-custom hover:bg-surface-custom transition-all"
                id="nav-track-btn"
              >
                Track Order
              </button>

              {/* Account icon scaffolding as requested */}
              <button
                className="p-2 sm:p-2.5 rounded-full hover:bg-surface-custom text-ink-2-custom hover:text-ink-custom border border-border-custom transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-focus-custom"
                aria-label="User Account Profile"
                id="nav-user-account-btn"
                onClick={() => alert("👨‍⚕️ Account Link Profile: Authenticate via quick OTP during checkout to track delivery milestones!")}
              >
                <User className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>

              {/* Cart trigger always visible */}
              <button
                onClick={onOpenCart}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-surface-custom text-ink-custom hover:text-brand-custom transition-colors cursor-pointer border border-border-custom focus:outline-none focus:ring-2 focus:ring-focus-custom"
                aria-label={`Shopping Cart with ${cartCount} items`}
                id="nav-cart-btn"
              >
                <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded-full bg-brand-custom text-[10px] font-bold text-white shadow-sm font-sans animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-ink-2-custom hover:text-ink-custom hover:bg-surface-custom border border-border-custom focus:outline-none focus:ring-2 focus:ring-focus-custom"
                aria-label="Open Navigation Menu"
                aria-expanded={mobileMenuOpen}
                id="nav-mobile-hamburger"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL HEIGHT SLIDE-IN DRAWER (Focus-trapped representation, ESC to close, scroll locked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn font-sans" id="nav-mobile-drawer" role="dialog" aria-modal="true">
          {/* Overlay mask */}
          <div 
            className="absolute inset-0 bg-gray-950/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-border-custom animate-scaleIn">
            <div>
              {/* Header inside drawer */}
              <div className="flex justify-between items-center border-b border-border-custom pb-4 mb-6">
                <div>
                  <span className="block font-display font-black text-xl text-ink-custom tracking-tight leading-none uppercase">
                    SMELLOFF<span className="text-brand-custom">.</span>
                  </span>
                  <span className="block font-mono text-[8px] uppercase tracking-widest text-ink-3-custom font-extrabold mt-1">
                    Fabric Scent Shield
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-ink-2-custom hover:text-ink-custom hover:bg-surface-custom rounded-full border border-border-custom transition-all"
                  aria-label="Close navigation menu"
                  id="nav-drawer-close"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Stacked Large Tap Targets Navigation links */}
              <nav className="space-y-1" aria-label="Mobile Navigation">
                {/* Prominent Shop ODORSTRIKE CTA at the top of the drawer */}
                <button
                  onClick={() => {
                    setCurrentPage(Page.PRODUCT);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-3.5 px-4 bg-accent-custom hover:bg-brand-custom border border-border-custom text-accent-ink-custom hover:text-white font-display font-black text-base uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 mb-5 active:scale-95"
                >
                  <ShoppingBag className="w-4.5 h-4.5" /> SHOP ODORSTRIKE fabric mist
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.HOME);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.HOME ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Home / Overview
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.PRODUCT);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.PRODUCT ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  ODORSTRIKE PDP
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.SHOP);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.SHOP ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Shop Packs / Bundles
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.HOW_IT_WORKS);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.HOW_IT_WORKS ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Our Science Explained
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.ABOUT);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.ABOUT ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Brand Origin Story
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.BLOG);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.BLOG ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Man Mag / Blog
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.CONTACT);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.CONTACT ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Get Support / Contact
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(Page.ORDER_TRACKER);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 rounded-xl font-bold text-base border-b border-gray-50 focus:outline-none focus:ring-2 focus:ring-focus-custom ${
                    currentPage === Page.ORDER_TRACKER ? "bg-surface-custom text-brand-custom" : "text-ink-custom hover:bg-surface-custom"
                  }`}
                >
                  Track Transit Order
                </button>
              </nav>
            </div>

            {/* Drawer Bottom Details */}
            <div className="border-t border-border-custom pt-6 mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-2.5 text-xs text-ink-2-custom font-semibold">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-ink-3-custom">Contact HQ Hub</span>
                <span>📧 support@smelloff.in</span>
                <span>📍 Smelloff Operations, Jubilee Hills, Hyd</span>
                <span>🇮🇳 Made for Indian weather conditions</span>
              </div>
              
              <div className="flex justify-between items-center bg-surface-custom p-3 rounded-lg border border-border-custom">
                <span className="text-[10px] font-mono uppercase text-ink-3-custom font-extrabold">Active Instagram</span>
                <a 
                  href="https://instagram.com/smell0ff" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-brand-custom hover:text-brand-strong-custom flex items-center gap-1"
                >
                  @smell0ff <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
