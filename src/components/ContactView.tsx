/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Send, FileText, PhoneCall, Library, CheckCircle2, AlertCircle, HelpCircle, ExternalLink } from "lucide-react";

interface ContactViewProps {
  onGoToFaqs: () => void;
}

export default function ContactView({ onGoToFaqs }: ContactViewProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    orderId: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [googleSheetsLogging, setGoogleSheetsLogging] = useState("");

  const validateForm = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Provide a valid email address";
    }

    if (!form.message.trim()) errs.message = "Message content is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);

      // Log of spreadsheets payload structure as requested
      const payloadLog = {
        sheetsSpreadsheetId: "1shSmelloffContactGSheetsWebhook2026",
        sheetTabName: "Support_Inquiries",
        timestamp: new Date().toISOString(),
        rowData: [
          form.name,
          form.email,
          form.orderId || "Guest / Presale Question",
          form.message
        ]
      };
      
      setGoogleSheetsLogging(JSON.stringify(payloadLog, null, 2));
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", orderId: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
    setGoogleSheetsLogging("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
      
      {/* Page Header */}
      <div className="text-left border-b border-border-custom pb-6 mb-12 sm:mb-16">
        <span className="font-mono text-xs uppercase font-extrabold text-brand-custom tracking-widest pl-1">
          Smelloff Support Center
        </span>
        <h1 className="text-4xl sm:text-7xl font-display font-black text-ink-custom tracking-tighter uppercase leading-[0.9] mt-3">
          Get In Touch / Support Hub
        </h1>
        <p className="mt-4 text-base sm:text-lg text-ink-2-custom max-w-xl">
          Proudly operating out of Jubilee Hills, Hyderabad. Direct communication channels. No nested corporate answering machines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side Form (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-border-custom p-6 sm:p-10 rounded-2xl shadow-sm text-left">
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-display font-bold text-2xl text-ink-custom uppercase tracking-tight mb-4">
                Send a secure support ticket:
              </h3>

              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-ink-custom uppercase tracking-wider mb-1.5 font-mono">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="Rahul Krishnan"
                  className="border border-border-custom bg-surface-custom text-ink-custom p-3 text-sm rounded-lg focus:border-brand-custom outline-none"
                />
                {errors.name && <span className="text-[10px] text-error-custom font-mono font-bold mt-1">⚠️ {errors.name}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-ink-custom uppercase tracking-wider mb-1.5 font-mono">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="rahul@email.com"
                  className="border border-border-custom bg-surface-custom text-ink-custom p-3 text-sm rounded-lg focus:border-brand-custom outline-none"
                />
                {errors.email && <span className="text-[10px] text-error-custom font-mono font-bold mt-1">⚠️ {errors.email}</span>}
              </div>

              {/* Optional Order ID */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-ink-custom uppercase tracking-wider mb-1.5 font-mono">
                  Order Reference ID (Optional)
                </label>
                <input
                  type="text"
                  value={form.orderId}
                  onChange={(e) => setForm({...form, orderId: e.target.value})}
                  placeholder="SO-41285-89"
                  className="border border-border-custom bg-surface-custom text-ink-custom p-3 text-sm rounded-lg focus:border-brand-custom outline-none font-mono"
                />
              </div>

              {/* Message Content */}
              <div className="flex flex-col">
                <label className="text-xs font-bold text-ink-custom uppercase tracking-wider mb-1.5 font-mono">
                  Inquiry Details *
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  placeholder="How can we assist you with packaging, cyclodextrin tracking nodes or dispatch milestones?"
                  className="border border-border-custom bg-surface-custom text-ink-custom p-3 text-sm rounded-lg focus:border-brand-custom outline-none resize-none"
                />
                {errors.message && <span className="text-[10px] text-error-custom font-mono font-bold mt-1">⚠️ {errors.message}</span>}
              </div>

              {/* Form submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-brand-custom" /> Send Message
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center py-8 space-y-6 animate-scaleIn select-none">
              <div className="w-16 h-16 bg-brand-custom/10 text-brand-custom border border-brand-custom/25 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-display font-black text-3xl text-ink-custom uppercase tracking-tight">
                  SUCCESSFULLY SUBMITTED!
                </h3>
                <p className="text-sm text-ink-2-custom max-w-sm mx-auto leading-relaxed">
                  Your inquiry message has been compiled and routed securely. Our solo founder customer-care hub will review and reply within 4 hours.
                </p>
              </div>

              {googleSheetsLogging && (
                <div className="text-left bg-gray-950 text-gray-200 p-4 rounded-xl font-mono text-[9px] sm:text-xs overflow-auto max-h-[160px] border border-gray-800 shadow-md">
                  <div className="flex justify-between items-center text-gray-500 mb-1 rounded pb-1 border-b border-gray-900 select-none">
                    <span>⚡ API SYNC LOG: DISPATCH MATRIX</span>
                    <span>Google Sheets V4 Protocol</span>
                  </div>
                  <pre className="text-lime-400">{googleSheetsLogging}</pre>
                </div>
              )}

              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 border border-border-custom bg-surface-custom text-ink-custom hover:bg-white text-xs font-mono font-bold rounded-lg uppercase tracking-wide cursor-pointer"
                >
                  Submit Another inquiry card
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side Info (5 columns) */}
        <div className="lg:col-span-5 space-y-6 text-left">
          
          {/* Priority WhatsApp Highlight Box */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-4">
            <span className="inline-block font-mono text-[10px] uppercase font-black text-emerald-800 bg-white border border-emerald-250 px-2.5 py-1 rounded shadow-xs">
              ⚡ India priority Support channel
            </span>
            <h4 className="font-display font-black text-2xl text-emerald-950 uppercase leading-none">
              Direct Support Via WhatsApp
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed font-sans">
              Operational statistics show <strong>WhatsApp achieves a 98% open response rate in India</strong> compared to just 20% for standard emails. Gaining answers to shipping timeline questions or return setups takes only 2 clicks!
            </p>
            <div className="pt-2">
              <a
                href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Smelloff!%20I%20have%20a%20question%25"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer"
              >
                Chat on WhatsApp Business <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Location & Address Desk */}
          <div className="bg-surface-custom border border-border-custom p-6 rounded-2xl space-y-4">
            <span className="block font-mono text-[10px] uppercase font-bold text-ink-3-custom">Operations HQ Logistics</span>
            
            <div className="space-y-3 font-sans text-xs sm:text-sm text-ink-custom text-left">
              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-3-custom font-bold">Lab Address</span>
                <span className="block font-semibold mt-0.5 font-sans leading-relaxed">
                  Smelloff Operations,<br />
                  Plot 142, Jubilee Hills Enclave,<br />
                  Hyderabad, Telangana, 500081, India
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-3-custom font-bold">Direct Email Support</span>
                <span className="block font-mono font-bold mt-0.5 text-brand-custom">support@smelloff.in</span>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-3-custom font-bold">Transit Business Hours</span>
                <span className="block font-semibold mt-0.5 font-sans">
                  Monday – Saturday: 09:00 AM – 06:00 PM IST<br />
                  Dispatch frequency: Within 6 hours of invoice
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-mono uppercase text-ink-3-custom font-bold">Instagram Community</span>
                <span className="block font-semibold mt-0.5 font-sans">
                  Join us at{" "}
                  <a 
                    href="https://instagram.com/smell0ff" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-custom hover:underline font-bold font-mono"
                  >
                    @smell0ff
                  </a>{" "}
                  for daily commute hacks and molecular reports.
                </span>
              </div>
            </div>
          </div>

          {/* Alternative FAQs link button */}
          <div className="bg-surface-custom border border-border-custom p-6 rounded-2xl flex justify-between items-center bg-white">
            <div className="text-left space-y-0.5">
              <span className="block text-[10px] font-mono uppercase text-ink-3-custom font-bold">Objection Handlers</span>
              <span className="block font-bold text-ink-custom text-sm font-sans uppercase">Need Quick Answers?</span>
            </div>
            
            <button
              onClick={onGoToFaqs}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gray-950 hover:bg-gray-850 text-white font-mono font-extrabold text-[11px] uppercase tracking-wider rounded-lg transition-all cursor-pointer select-none"
            >
              <Library className="w-4 h-4 text-brand-custom" /> See FAQs
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
