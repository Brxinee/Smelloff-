/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, Scale, FileText, Landmark, RefreshCw, Send } from "lucide-react";

interface LegalViewsProps {
  section: "privacy" | "terms" | "refund" | "shipping";
  onSelectProduct: () => void;
}

export default function LegalViews({ section, onSelectProduct }: LegalViewsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans text-left">
      
      {/* Title block */}
      <div className="border-b border-border-custom pb-6 mb-10 text-left">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-wider pl-1">
          Indian Regulatory Compliance Panel
        </span>
        <h1 className="text-3.5xl sm:text-5xl font-display font-black text-ink-custom tracking-tight uppercase leading-none mt-3">
          {section === "privacy" && "Privacy Policy — Digital Data Protection"}
          {section === "terms" && "Terms & Conditions"}
          {section === "refund" && "Returns, Refund, & Exchanges"}
          {section === "shipping" && "Shipping & Delivery Policy"}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-ink-3-custom font-mono">
          {section === "privacy" && "In complete compliance with the Digital Personal Data Protection (DPDP) Act, 2023"}
          {section === "terms" && "Smelloff Indian E-commerce operations terms"}
          {section === "refund" && "Generous 7-day hassle-free buyer peace of mind window"}
          {section === "shipping" && "Integrated logistics timelines across Indian pincodes"}
        </p>
      </div>

      <div className="bg-white border border-border-custom p-6 sm:p-10 rounded-3xl space-y-6">
        
        {/* PRIVACY POLICY VIEW */}
        {section === "privacy" && (
          <div className="space-y-6 text-sm text-ink-2-custom leading-relaxed">
            <div className="bg-blue-50 border border-blue-150 p-4 rounded-xl flex items-start gap-2.5">
              <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-blue-950 block text-xs">DPDP Act 2023 / DPDP Rules 2025 Notice</strong>
                <p className="text-[11px] text-blue-900 leading-normal mt-1">
                  Smelloff operates as a Data Fiduciary under the rules notified on 13 Nov 2025. This policy guarantees full principal compliance prior to the physical enforcement limit of 13 May 2027.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">1. Personal Customer Data Collected</h3>
              <p>
                We collect personal identifier data during your checkout: Name, shipping address location, active mobile phone number, and active email address. 
              </p>
              <p className="font-semibold text-ink-custom">
                Note on payment handling: All payment card details, UPI app tokens or netbanking forms are handled exclusively by Razorpay API nodes. Smelloff servers never view, store, or process payment digits.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">2. Purposes of personal data processing</h3>
              <p>
                We process your data exclusively for order execution, shipping logistics tracking using third-party BlueDart modules, and sending secure SMS OTP logistics updates via Firebase Authentication channels. 
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">3. Principal Rights under DPDP Act</h3>
              <p>
                As a personal data principal in India, you hold complete rights of access, correction of details, complete request for erasure, and immediate withdraw of prior given consent.
              </p>
              <p>
                To withdraw consent or request absolute erasure of your address record from our spreadsheets and Firebase systems, email our Hyderabad grievances team at <span className="font-mono text-brand-custom font-bold text-xs">privacy@smelloff.in</span>. Inquiry responses are guaranteed within prescribed legal timelines.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">4. Grievance Redressal / Indian Board Complaint</h3>
              <p>
                For grievances not solved inside our operations within 7 days, you hold legal right to raise a formal complaint to the Data Protection Board of India under DPDP regulations.
              </p>
            </section>
          </div>
        )}

        {/* TERMS & CONDITIONS VIEW */}
        {section === "terms" && (
          <div className="space-y-6 text-sm text-ink-2-custom leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">1. Scope of Operations</h3>
              <p>
                These terms govern all transactions made on smelloff.in for physical Odorstrike fabric mists. All pricing is inclusive of relevant GST rates and Indian legal metrology declarations.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">2. Cash on Delivery (COD) Acceptance Agreement</h3>
              <p>
                By selecting Cash on Delivery, you enter a reliable contract to accept physical parcel delivery. Fake or high-abandonment orders create massive logistics RTO charges for small local brands; we reserve block rights on future purchases for coordinate addresses with continuous refusal histories.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">3. Liability Limits</h3>
              <p>
                Smelloff’s chemical liability on liquid products is strictly limited to fabric application. We hold zero liability for cosmetic or biochemical side reactions occurring if the formula is applied against warnings to human skin tissues. Keep out of reach of children and pets.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">4. Governing Law</h3>
              <p>
                All contracts are governed exclusively under Indian state courts in Hyderabad, Telangana.
              </p>
            </section>
          </div>
        )}

        {/* REFUND & REFUND POLICIES */}
        {section === "refund" && (
          <div className="space-y-6 text-sm text-ink-2-custom leading-relaxed">
            <div className="bg-lime-50 border border-lime-150 p-4 rounded-xl flex items-start gap-2.5">
              <RefreshCw className="w-5 h-5 text-brand-custom shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-custom block text-xs uppercase font-bold text-brand-custom">HASSLE-FREE 7-DAY INDIAN RETURN SEAL</strong>
                <p className="text-[11px] text-ink-2-custom leading-normal mt-1">
                  We want you to buy with complete peace of mind. Return anxiety is a common Indian checkout barrier — our support policy is findable and transparent.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">1. Seven Day Window</h3>
              <p>
                If your first 50ml bottle does not physically neutralize your synthetic shirt odors, simply contact us via support@smelloff.in or priority WhatsApp within 7 days of package delivery.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">2. Eligibility Condition</h3>
              <p>
                For twin packs or larger bundles, we gladly refund the purchase if the first bottle was opened, provided the remaining extra bottles are returned completely unused and factory sealed.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">3. Speed of Refunds</h3>
              <p>
                UPI and Credit Card refunds are initiated within 48 hours of product return inspection and settle instantly into bank accounts. For cash-on-delivery (COD) orders, customer-care will ask for bank coordinates / UPI handle details to settle the balance instantly.
              </p>
            </section>
          </div>
        )}

        {/* SHIPPING LOGISTICS POLICY */}
        {section === "shipping" && (
          <div className="space-y-6 text-sm text-ink-2-custom leading-relaxed">
            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">1. Dispatch timelines</h3>
              <p>
                Orders registered before 04:00 PM IST on working days are dispatched directly from our Hyderabad central hub within 6 hours. Dynamic logistics labels are printed via integration partnerships with Delhivery, BlueDart, and Amazon Shipping.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">2. Free Shipping Threshold</h3>
              <p>
                Standard express shipping carries a flat ₹40 fee for single unit purchases. Orders with a sum subtotal of ₹499 or more (such as buying a Twin Pack or Triple Bundle) qualify for free express shipping. No coupon rules required.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-ink-custom text-base uppercase font-sans">3. Regional Delivery Estimations</h3>
              <p>
                Metro hubs (Delhi, Mumbai, Bengaluru, Chennai) usually receive packages inside 2 to 3 days. Upcountry tier-2 or tier-3 localities across larger Indian territories resolve within 4 to 6 business days. Live tracking coordinates are delivered to your email and verified phone number.
              </p>
            </section>
          </div>
        )}

        {/* Footer actions inside panel */}
        <div className="border-t border-border-custom pt-6 text-center select-none">
          <button
            onClick={onSelectProduct}
            className="py-3.5 px-6 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all inline-flex items-center gap-1.5 shadow"
          >
            Okay, Shop Odorstrike Pack
          </button>
        </div>

      </div>
    </div>
  );
}
