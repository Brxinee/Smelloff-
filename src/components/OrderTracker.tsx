/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin, Truck, CheckCircle2, Clock, Calendar, HelpCircle, AlertCircle } from "lucide-react";
import { Order } from "../types";

// Static mock order database for rendering lookups
const DEMO_ORDERS: Record<string, Order> = {
  "SO-DEMO-99": {
    id: "SO-DEMO-99",
    bundle: {
      id: "pack-2",
      name: "ODORSTRIKE Twin Pack (AOV Saver)",
      quantity: 2,
      price: 549,
      originalPrice: 598,
      savings: 49,
      description: "Twin pack: Double the mists, zero delivery fees.",
      sizeMl: 100,
      hasPocketSleeve: false
    },
    quantity: 1,
    shippingAddress: {
      fullName: "Anirudh Reddy",
      phone: "9848022338",
      email: "anirudh.reddy@gmail.com",
      streetAddress: "Sector 2, Hitech City Green Meadows",
      pincode: "500081",
      city: "Hyderabad",
      state: "Telangana"
    },
    paymentMethod: "UPI",
    paymentStatus: "PAID",
    shippingFee: 0,
    totalAmount: 549,
    orderDate: "2026-06-03T10:15:00Z",
    trackingStatus: "OUT_FOR_DELIVERY",
    trackingHistory: [
      {
        status: "OUT_FOR_DELIVERY",
        location: "Kondapur BlueDart Distribution Annex",
        time: "09:30 AM",
        description: "Package loaded onto delivery vehicle. Agent Suresh G. on ride (OTP sent to user)."
      },
      {
        status: "IN_TRANSIT",
        location: "Begumpet Central Logistics Terminal",
        time: "04:15 AM",
        description: "Dispatched from terminal towards target local hub. Sealed containers secure."
      },
      {
        status: "SHIPPED",
        location: "Hyderabad Airport Cargo Hub",
        time: "Yesterday, 08:30 PM",
        description: "Sorted, weighed, and handed over to cargo transit partner."
      },
      {
        status: "PREPARED",
        location: "Hyderabad Central Smelloff Dispatch HQ",
        time: "Yesterday, 02:00 PM",
        description: "ODORSTRIKE mists packed inside biodegradable protective shipper box with security seal."
      },
      {
        status: "PLACED",
        location: "Hyderabad D2C Central Dispatch Hub",
        time: "Yesterday, 10:30 AM",
        description: "Digital order processed. GSheets ledger updated. Firebase ID token mapped."
      }
    ]
  }
};

interface OrderTrackerProps {
  customOrders: Order[];
}

export default function OrderTracker({ customOrders }: OrderTrackerProps) {
  const [searchId, setSearchId] = useState<string>("");
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setSearchError("");

    const normQuery = searchId.trim().toUpperCase();
    if (!normQuery) {
      setSearchError("Please specify a valid Order Number or Pincode");
      setActiveOrder(null);
      return;
    }

    // Check custom cart-checkout orders first
    const foundCustom = customOrders.find(o => o.id.toUpperCase() === normQuery);
    if (foundCustom) {
      setActiveOrder(foundCustom);
      return;
    }

    // Check pre-loaded demo orders
    if (DEMO_ORDERS[normQuery]) {
      setActiveOrder(DEMO_ORDERS[normQuery]);
      return;
    }

    setActiveOrder(null);
    setSearchError("Order not found inside this browser's tracking lookup. Try placing an order in the checkout drawer, or enter 'SO-DEMO-99' to see a live demo.");
  };

  const getStatusBadgeColor = (status: Order["trackingStatus"]) => {
    switch (status) {
      case "PLACED": return "bg-gray-100 text-gray-800 border-gray-200";
      case "PREPARED": return "bg-blue-50 text-blue-800 border-blue-200";
      case "SHIPPED": return "bg-indigo-50 text-indigo-800 border-indigo-200";
      case "IN_TRANSIT": return "bg-amber-50 text-amber-800 border-amber-200";
      case "OUT_FOR_DELIVERY": return "bg-purple-100 text-purple-900 border-purple-200 animate-pulse";
      case "DELIVERED": return "bg-lime-100 text-lime-900 border-lime-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="order-tracker-page">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-slate-600" /> Live package tracking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Track Your Smelloff Scent-Shield
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Enter your transaction code to retrieve shipping milestones logged out of our Hyderabad central logistics terminal.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-slate-50 p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 mb-8" id="tracker-form">
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter SO-DEMO-99 or your active Order ID"
              className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-300 bg-white text-gray-950 focus:border-gray-950 outline-none uppercase font-mono font-bold tracking-wider"
              id="tracker-search-input"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-950 hover:bg-gray-800 text-white font-sans font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl cursor-pointer transition-colors"
            id="tracker-submit-btn"
          >
            Locate Shipment
          </button>
        </form>

        {/* Search Results Display */}
        {searched && searchError && (
          <div className="p-4 bg-red-50 border border-red-150 rounded-xl flex gap-2.5 items-start text-xs sm:text-sm text-red-950 animate-fadeIn" id="search-error">
            <AlertCircle className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Shipment search failed</span>
              <p className="mt-1 leading-normal text-red-800 font-medium">
                {searchError}
              </p>
            </div>
          </div>
        )}

        {searched && activeOrder && (
          <div className="space-y-6 animate-scaleIn" id="active-tracker-results">
            
            {/* Delivery Core Meta info block */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-150 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <span className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider leading-none">
                  Transaction Code
                </span>
                <span className="block font-mono font-extrabold text-base text-gray-950 mt-1 uppercase">
                  {activeOrder.id}
                </span>

                <div className="flex gap-2 items-center mt-3 text-xs text-gray-650">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Placed: <strong>{new Date(activeOrder.orderDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider leading-none">
                  Milestone Route Status
                </span>
                <span className={`inline-block border text-[11px] font-bold font-mono uppercase px-3 py-1 rounded-full mt-2 ${getStatusBadgeColor(activeOrder.trackingStatus)}`}>
                  {activeOrder.trackingStatus.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Recipient breakdown */}
            <div className="border border-gray-100 rounded-xl p-4.5 bg-white text-xs space-y-2">
              <span className="block font-mono uppercase tracking-wider text-gray-400 font-bold text-[10px] leading-none mb-1">
                Recipient Shipping Node
              </span>
              <div className="font-bold text-gray-950 leading-tight">
                {activeOrder.shippingAddress.fullName}
              </div>
              <p className="text-gray-600 leading-normal">
                {activeOrder.shippingAddress.streetAddress}, Pin: {activeOrder.shippingAddress.pincode} | {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state}
              </p>
              <div className="text-lime-700 font-mono font-bold pt-1">
                Ordered Item: {activeOrder.bundle.name} (Qty: {activeOrder.quantity}) — Amount: ₹{activeOrder.totalAmount} ({activeOrder.paymentMethod})
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="relative border-l-2 border-gray-150 pl-5 ml-3.5 py-2 space-y-8">
              {activeOrder.trackingHistory.map((hist, i) => (
                <div key={i} className="relative">
                  {/* Bullet badge indicator */}
                  <div className={`absolute -left-[30px] top-0 w-5 h-5 rounded-full border bg-white flex items-center justify-center ${
                    i === 0 
                      ? "border-lime-500 shadow-[0_0_8px_#84cc16]" 
                      : "border-gray-300"
                  }`}>
                    {i === 0 ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-500 block"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-350 block"></span>
                    )}
                  </div>

                  {/* Milestone Content block */}
                  <div className={`${i === 0 ? "bg-lime-50/20 border border-lime-100 p-4 rounded-xl" : ""}`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h4 className={`text-xs uppercase tracking-wider font-mono font-bold ${
                        i === 0 ? "text-lime-950" : "text-gray-500"
                      }`}>
                        {hist.status.replace(/_/g, " ")}
                      </h4>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 font-semibold uppercase">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{hist.location} • {hist.time}</span>
                      </div>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed ${
                      i === 0 ? "text-lime-900 font-medium" : "text-gray-600"
                    }`}>
                      {hist.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Suggestion block if not searched yet */}
        {!searched && (
          <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl flex gap-3.5 items-start mt-8">
            <HelpCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-gray-650">
              <span className="font-bold text-gray-950 block">Want to try the order tracking dashboard?</span>
              <p className="mt-1 leading-normal">
                Use the mock verification ID <strong className="font-mono text-gray-950">SO-DEMO-99</strong> inside the lookup field above to monitor an active parcel moving from our hub.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
