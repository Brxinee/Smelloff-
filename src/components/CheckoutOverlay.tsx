import React, { useState, useEffect } from "react";
import { 
  X, Check, Shield, Lock, CreditCard, ChevronRight, Truck, Info, 
  Trash2, QrCode, AlertCircle, CheckCircle2 
} from "lucide-react";
import { ProductBundle, ShippingAddress, CartItem, Order } from "../types";

// Indian States for Address form
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

interface CheckoutOverlayProps {
  bundles: ProductBundle[];
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: (cart: CartItem[] | ((prev: CartItem[]) => CartItem[])) => void;
  onOrderSuccess: (order: Order) => void;
  onBackToCart: () => void;
}

export default function CheckoutOverlay({
  bundles,
  isOpen,
  onClose,
  cart,
  setCart,
  onOrderSuccess,
  onBackToCart,
}: CheckoutOverlayProps) {
  // Current step state of the drawer checkout flow:
  // 'cart' | 'shipping' | 'authenticating' | 'payment' | 'processing'
  const [step, setStep] = useState<"cart" | "shipping" | "authenticating" | "payment" | "processing">("shipping");
  
  // Recipient Shipping address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    pincode: "",
    city: "",
    state: "Telangana",
    landmark: "",
  });
  
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});
  
  // Payment option: 'UPI' | 'CARD' | 'COD'
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "COD">("UPI");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvv, setCardCvv] = useState<string>("");
  
  // Simulated OTP verification
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [authError, setAuthError] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [loadingStep, setLoadingStep] = useState("");
  const [jsonPayloadLog, setJsonPayloadLog] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep("shipping");
      // Check for previously saved verified info to bypass otp
      if (localStorage.getItem("smelloff_verified_phone") === "true") {
        setIsPhoneVerified(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.bundle.price * item.quantity, 0);
  };

  const getShippingFee = () => {
    const sub = getSubtotal();
    if (sub >= 499) return 0; // Free express shipping threshold
    return 40; // Flat ₹40 standard fee for pack of 1
  };

  const getTotal = () => {
    return getSubtotal() + getShippingFee();
  };

  const updateQuantity = (bundleId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.bundle.id === bundleId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (bundleId: string) => {
    setCart(prev => prev.filter(item => item.bundle.id !== bundleId));
  };

  // Indian Metrology Address Validate Rules
  const validateForm = () => {
    const errors: Partial<Record<keyof ShippingAddress, string>> = {};
    if (!address.fullName.trim()) errors.fullName = "Full recipient name is required";
    
    const phoneClean = address.phone.replace(/[\s+]/g, "");
    if (!address.phone.trim()) {
      errors.phone = "10-digit mobile number is required";
    } else if (!/^[6789]\d{9}$/.test(phoneClean)) {
      errors.phone = "Provide a valid ten digit Indian mobile identifier";
    }

    if (!address.email.trim()) {
      errors.email = "Email account is required";
    } else if (!/\S+@\S+\.\S+/.test(address.email)) {
      errors.email = "Enter a valid email account node";
    }

    if (!address.streetAddress.trim()) {
      errors.streetAddress = "Full flat/office physical block is required";
    }

    if (!address.pincode.trim()) {
      errors.pincode = "6-digit Indian PIN Code is required";
    } else if (!/^\d{6}$/.test(address.pincode)) {
      errors.pincode = "Must be a valid 6-digit Indian Postal Code (e.g. 500081)";
    }

    if (!address.city.trim()) errors.city = "City name is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextFromShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isPhoneVerified) {
        setStep("authenticating");
        setOtpSent(false);
        setOtpCode("");
        setAuthError("");
      } else {
        setStep("payment");
      }
    }
  };

  const handleSendOTP = () => {
    if (!address.phone) return;
    setOtpSent(true);
    setLoadingStep("Preparing OTP SMS gateway payload...");
    setTimeout(() => {
      setLoadingStep("");
    }, 700);
  };

  const handleVerifyOTP = () => {
    if (otpCode !== "1234" && otpCode.length !== 4) {
      setAuthError("Invalid code. Enter standard code '1234' for checkout simulation.");
      return;
    }
    setIsPhoneVerified(true);
    localStorage.setItem("smelloff_verified_phone", "true");
    setStep("payment");
  };

  // Process secure database sync simulation
  const handleCompletePaymentOrder = async () => {
    if (cart.length === 0) return;
    
    if (paymentMethod === "CARD") {
      if (cardNumber.length < 12 || cardExpiry.length < 4 || cardCvv.length < 3) {
        alert("Enter a valid dummy test card parameters (16 digits, MM/YY, 3 CVV digits)");
        return;
      }
    }

    setStep("processing");

    const orderId = `SO-IND-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 899)}`;
    const mainItem = cart[0].bundle;

    const generatedOrder: Order = {
      id: orderId,
      bundle: mainItem,
      bundles: cart,
      quantity: cart[0].quantity,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
      shippingFee: getShippingFee(),
      totalAmount: getTotal(),
      orderDate: new Date().toISOString(),
      trackingStatus: "PLACED",
      trackingHistory: [
        {
          status: "PLACED",
          location: "Hyderabad D2C Central Dispatch Hub",
          time: new Date().toLocaleTimeString(),
          description: "Order entry created in Smelloff secure ledger database. Transit shipping labels assigned."
        }
      ]
    };

    // Prepare full sync logging simulation payload
    const telemetrySync = {
      firebaseAuthRecord: {
        identityId: `uid_sh_${address.phone}`,
        phoneVerified: true,
        sessionToken: "firebase_direct_jwt_2026"
      },
      googleSheetsLog: {
        spreadsheetId: "1shSmelloffOrdersGSheetsInLedger2026",
        sheetName: "Commuter_Orders_V1",
        rowValues: [
          generatedOrder.id,
          generatedOrder.orderDate,
          address.fullName,
          address.phone,
          address.email,
          cart.map(c => `${c.bundle.name} (x${c.quantity})`).join(", "),
          generatedOrder.totalAmount,
          generatedOrder.paymentMethod,
          `PIN: ${address.pincode} | ${address.city}, ${address.state}`
        ]
      },
      metaPixelEvents: {
        eventRef: "Purchase",
        invoiceINR: generatedOrder.totalAmount,
        cur: "INR",
        transactionId: generatedOrder.id
      }
    };

    setJsonPayloadLog(JSON.stringify(telemetrySync, null, 2));

    // Call simulated APIs on our backend
    try {
      const isCod = paymentMethod === "COD";
      const endpoint = isCod ? "/api/orders/cod" : "/api/razorpay/verify";
      const payloadBody = isCod 
        ? { orderInfo: generatedOrder }
        : {
            razorpay_order_id: `rzp_order_${orderId}`,
            razorpay_payment_id: `pay_${Math.random().toString(36).substring(3, 11)}`,
            razorpay_signature: "simulated_secure_signature_hash_2026",
            orderInfo: generatedOrder
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody)
      });
      
      const responseData = await response.json();
      console.log("Invoice API Registration response:", responseData);
    } catch (e) {
      console.error("Failed writing invoice database", e);
    }

    const steps = [
      "Establishing secure SSL handshake socket to Razorpay API...",
      "Drafting and verifying balance limits with user issuing bank node...",
      "Syncing commuter identification tags to Firebase Direct Store...",
      "Row logging transaction values to Google Sheets operational spreadsheets..."
    ];

    let count = 0;
    setLoadingStep(steps[0]);

    const interval = setInterval(() => {
      count++;
      if (count < steps.length) {
        setLoadingStep(steps[count]);
      } else {
        clearInterval(interval);
        // Dispatch success callbacks
        setTimeout(() => {
          localStorage.setItem("smelloff_returning_customer", "true");
          onOrderSuccess(generatedOrder);
          setCart([]); // Clear Cart
          onClose(); // Hide Modal
        }, 1200);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-950/40 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 font-sans" id="checkout-root-modal">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-border-custom overflow-hidden flex flex-col md:flex-row h-full max-h-[94vh] md:h-auto md:max-h-[85vh]">
        
        {/* Left main input form side */}
        <div className="flex-grow p-5 sm:p-7 overflow-y-auto flex flex-col justify-between md:w-3/5 text-left">
          <div>
            {/* Modal Step Title Header */}
            <div className="flex justify-between items-center border-b border-border-custom pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-brand-strong-custom bg-brand-tint-custom font-mono font-bold text-xs px-2 py-0.5 rounded border border-brand-custom/20 uppercase select-none">
                  Step {step === "cart" ? "1/3" : step === "shipping" ? "2/3" : "3/3"}
                </span>
                <h4 className="font-display font-black text-lg text-ink-custom uppercase tracking-tight leading-none">
                  {step === "cart" && "Your Scent Shield Bag"}
                  {step === "shipping" && "Shipping & Commute Hub"}
                  {step === "authenticating" && "OTP Verification"}
                  {step === "payment" && "Razorpay checkout hub"}
                  {step === "processing" && "Executing transaction..."}
                </h4>
              </div>
              <button 
                onClick={onClose}
                className="p-1.5 text-ink-2-custom hover:text-ink-custom hover:bg-surface-custom rounded-full border border-border-custom hover:scale-105 transition-all cursor-pointer"
                id="close-checkout-modal"
                aria-label="Close checkout portal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: CART LISTING DETAILS */}
            {step === "cart" && (
              <div className="space-y-4" id="step-cart">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4 font-sans">
                    <span className="text-5xl block animate-bounce">🛒</span>
                    <p className="text-sm font-bold text-ink-custom uppercase">Your shopping bag is empty.</p>
                    <p className="text-xs text-ink-2-custom max-w-xs mx-auto">Add an ODORSTRIKE scent-strike pack on the PDP view to initiate verification checkout.</p>
                    <button 
                      onClick={onClose}
                      className="px-5 py-3 bg-gray-950 hover:bg-gray-800 text-white text-xs font-mono font-bold rounded-lg uppercase tracking-wider cursor-pointer shadow"
                    >
                      Browse bundles
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    <span className="block text-[10px] font-mono text-ink-3-custom font-bold uppercase tracking-widest pl-1 leading-none">
                      Selected Garment Shield Packages
                    </span>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div 
                          key={item.bundle.id}
                          className="flex items-center justify-between p-4 bg-surface-custom border border-border-custom rounded-xl"
                        >
                          <div className="text-left space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-ink-custom text-sm leading-snug">{item.bundle.name}</span>
                              {item.bundle.badge && (
                                <span className="bg-brand-tint-custom text-brand-strong-custom text-[8px] font-mono font-extrabold px-1.5 py-0.5 rounded border border-brand-custom/10">
                                  {item.bundle.badge}
                                </span>
                              )}
                            </div>
                            <span className="block text-[11px] text-ink-3-custom font-sans">
                              {item.bundle.description}
                            </span>
                            <span className="block text-xs font-mono font-extrabold text-brand-custom pt-1">
                              ₹{item.bundle.price} per unit
                            </span>
                          </div>

                          <div className="flex items-center gap-3 select-none shrink-0">
                            {/* Stepper code */}
                            <div className="flex items-center gap-1 bg-white border border-border-custom rounded-lg p-0.5 shadow-xs">
                              <button 
                                onClick={() => updateQuantity(item.bundle.id, -1)}
                                className="w-7 h-7 flex items-center justify-center font-bold text-ink-2-custom hover:bg-surface-custom hover:text-black rounded cursor-pointer leading-none"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs font-extrabold w-5 text-center text-ink-custom">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.bundle.id, 1)}
                                className="w-7 h-7 flex items-center justify-center font-bold text-ink-2-custom hover:bg-surface-custom hover:text-black rounded cursor-pointer leading-none"
                              >
                                +
                              </button>
                            </div>

                            {/* Delete utility */}
                            <button
                              onClick={() => removeItem(item.bundle.id)}
                              className="p-1.5 text-ink-2-custom hover:text-[#C0271E] rounded-lg hover:bg-[#FFE7D8] transition-colors cursor-pointer border border-border-custom hover:border-[#C0271E]/20"
                              title="Delete pack"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* BlueDart USP Express bar */}
                    <div className="p-3.5 bg-[#DCF0F1] border border-[#0F6E78]/10 rounded-xl flex items-center gap-2.5">
                      <Truck className="w-5 h-5 text-brand-custom shrink-0" />
                      <div className="text-left font-sans">
                        <span className="block text-xs font-bold text-brand-strong-custom leading-tight">
                          {getSubtotal() >= 499 ? "🎉 FREE Express shipping registered!" : "Orders above ₹499 unlock FREE express delivery."}
                        </span>
                        <span className="block text-[10px] text-ink-2-custom mt-0.5 leading-none">
                          Dispatched directly via premier local BlueDart cargo lines.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: RECIPIENT INFORMATION FORM */}
            {step === "shipping" && (
              <form onSubmit={handleNextFromShipping} className="space-y-4" id="step-shipping">
                <span className="block text-[10px] font-mono text-ink-3-custom font-bold uppercase tracking-widest mb-1 pl-1">
                  Recipient & Delhi/Hyd/Mumb Delivery Address
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({...address, fullName: e.target.value})}
                      placeholder="e.g. Varun Nair"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans font-medium"
                    />
                    {formErrors.fullName && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.fullName}</span>}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono font-medium">
                      Mobile contact (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({...address, phone: e.target.value.replace(/\D/g, "")})}
                      maxLength={10}
                      placeholder="e.g. 9876543210"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans font-medium"
                    />
                    {formErrors.phone && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Email address */}
                  <div className="sm:col-span-2 flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      Email Node Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress({...address, email: e.target.value})}
                      placeholder="e.g. varun@smelloff.in"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans font-medium"
                    />
                    {formErrors.email && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.email}</span>}
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      Indian PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({...address, pincode: e.target.value.replace(/\D/g, "")})}
                      placeholder="e.g. 500081"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-mono font-bold"
                    />
                    {formErrors.pincode && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.pincode}</span>}
                  </div>
                </div>

                {/* Street Address */}
                <div className="flex flex-col text-left">
                  <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                    Street Address / Flat / Room Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.streetAddress}
                    onChange={(e) => setAddress({...address, streetAddress: e.target.value})}
                    placeholder="e.g. Room 42, HCU Hostel Blocks, Gachibowli Area"
                    className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans"
                  />
                  {formErrors.streetAddress && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.streetAddress}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* City */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      City Hub *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      placeholder="e.g. Hyderabad"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans"
                    />
                    {formErrors.city && <span className="text-[10px] text-error-custom font-mono mt-1 font-bold">⚠️ {formErrors.city}</span>}
                  </div>

                  {/* State selection */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      State / UT *
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans font-bold cursor-pointer"
                    >
                      {INDIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* Landmark */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] font-bold text-ink-custom uppercase tracking-wide mb-1 font-mono">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) => setAddress({...address, landmark: e.target.value})}
                      placeholder="e.g. Near DLF Gate"
                      className="border border-border-custom p-2.5 text-sm rounded-lg text-ink-custom focus:border-brand-custom outline-none bg-white font-sans"
                    />
                  </div>
                </div>

                <button type="submit" className="hidden" id="hidden-shipping-submit">Submit</button>
              </form>
            )}

            {/* STEP 2.5: PHONE OTP VERIFICATION */}
            {step === "authenticating" && (
              <div className="space-y-5 py-2 text-center max-w-sm mx-auto" id="step-auth">
                <div className="w-12 h-12 bg-brand-tint-custom text-brand-strong-custom border border-brand-custom/20 rounded-full flex items-center justify-center mx-auto mb-1 shadow-xs">
                  <Lock className="w-5 h-5" />
                </div>
                
                <h5 className="font-display font-black text-lg text-ink-custom uppercase">Identity Access Verification</h5>
                <p className="text-xs text-ink-2-custom leading-normal">
                  To securely list your order tracking inside our Hyderabad central cargo hub, authorize with a quick SMS OTP payload on <span className="font-bold text-ink-custom font-mono">+91 {address.phone}</span>.
                </p>

                {!otpSent ? (
                  <button
                    onClick={handleSendOTP}
                    className="w-full py-3.5 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow mt-2 hover:scale-[1.01]"
                  >
                    Send simulated SMS verification code
                  </button>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="flex flex-col items-center">
                      <label className="text-[10px] font-bold text-ink-3-custom uppercase tracking-widest font-mono mb-2">
                        Enter Code (Verification Demo)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="Type '1234' here"
                        className="border-2 border-brand-custom/40 p-3 text-center text-lg rounded-xl font-mono font-extrabold focus:border-brand-custom outline-none w-44 shadow-inner"
                      />
                      {authError && <span className="text-[10px] text-[#C0271E] font-mono font-bold mt-2">❌ {authError}</span>}
                    </div>

                    <button
                      onClick={handleVerifyOTP}
                      className="w-full py-3.5 bg-gray-950 hover:bg-gray-800 text-white font-sans font-black rounded-xl text-xs tracking-wider uppercase cursor-pointer shadow"
                    >
                      Verify code
                    </button>
                    
                    <button 
                      onClick={() => setOtpSent(false)}
                      className="block text-center w-full text-[10px] font-mono text-ink-3-custom hover:text-ink-custom underline"
                    >
                      Change Phone Number
                    </button>
                  </div>
                )}
                
                <p className="text-[9px] text-ink-3-custom font-mono leading-relaxed mt-2 uppercase">
                  Simulated Firebase SMS trigger integration is 100% CDSCO safe.
                </p>
              </div>
            )}

            {/* STEP 3: RAZORPAY & PAYMENT OPTION */}
            {step === "payment" && (
              <div className="space-y-5 text-left" id="step-payment">
                <span className="block text-xs font-mono text-ink-3-custom font-bold uppercase tracking-widest pl-1 leading-none">
                  Select Secure Transaction Gateway
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`flex flex-col items-center p-3.5 border rounded-xl transition-all cursor-pointer ${
                      paymentMethod === "UPI" ? "bg-brand-tint-custom/50 border-brand-custom text-ink-custom" : "bg-surface-custom hover:bg-gray-100 border-border-custom text-ink-3-custom"
                    }`}
                  >
                    <QrCode className="w-5 h-5 mb-1 text-brand-strong-custom" />
                    <span className="font-sans font-bold text-xs">UPI Sandbox</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
                    className={`flex flex-col items-center p-3.5 border rounded-xl transition-all cursor-pointer ${
                      paymentMethod === "CARD" ? "bg-brand-tint-custom/50 border-brand-custom text-ink-custom" : "bg-surface-custom hover:bg-gray-100 border-border-custom text-ink-3-custom"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1 text-brand-strong-custom" />
                    <span className="font-sans font-bold text-xs">Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex flex-col items-center p-3.5 border rounded-xl transition-all cursor-pointer ${
                      paymentMethod === "COD" ? "bg-brand-tint-custom/50 border-brand-custom text-ink-custom" : "bg-surface-custom hover:bg-gray-100 border-border-custom text-ink-3-custom"
                    }`}
                  >
                    <Truck className="w-5 h-5 mb-1 text-brand-strong-custom" />
                    <span className="font-sans font-bold text-xs">Cash on Del.</span>
                  </button>
                </div>

                {/* Sub-panels for selected payment */}
                {paymentMethod === "UPI" && (
                  <div className="bg-[#DCF0F1]/40 p-5 rounded-xl border border-[#0F6E78]/10 flex flex-col items-center text-center space-y-3 animate-scaleIn">
                    <span className="inline-block font-mono text-[9px] uppercase tracking-widest font-black bg-white text-brand-strong-custom px-2.5 py-1 rounded border border-border-custom">
                      QR Gateway Sandbox Node
                    </span>
                    
                    <div className="w-28 h-28 bg-white flex items-center justify-center p-1.5 border border-border-custom rounded-lg shadow-sm">
                      <div className="w-full h-full relative bg-gray-50 flex flex-col justify-between items-center select-none overflow-hidden rounded">
                        <div className="grid grid-cols-5 gap-0.5 w-full bg-gray-200 p-1">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-2.5 ${((i * 4 + 7) % 3 === 0 || i === 0 || i === 4 || i === 20 || i === 24) ? "bg-slate-900" : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[7px] font-black text-brand-strong-custom leading-none uppercase">
                          SCAN IN UPI
                        </span>
                        <div className="grid grid-cols-5 gap-0.5 w-full bg-gray-200 p-1 mt-auto">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`h-2.5 ${((i * 9 + 3) % 4 === 0) ? "bg-slate-900" : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-ink-2-custom max-w-xs font-sans">
                      Open any UPI App (GPay, PhonePe, Paytm, BHIM) and scan this QR to authorize simulated invoice transaction of <strong>₹{getTotal()}</strong>.
                    </p>
                  </div>
                )}

                {paymentMethod === "CARD" && (
                  <div className="bg-surface-custom p-4.5 rounded-xl border border-border-custom space-y-3 animate-scaleIn text-left">
                    <span className="text-[9px] font-mono font-bold text-ink-3-custom uppercase tracking-widest block leading-none">
                      Enter Mock Debit Parameters
                    </span>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex flex-col">
                        <label className="text-[9px] font-bold text-ink-2-custom uppercase font-mono tracking-wider mb-1">Card Number</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim())}
                          placeholder="4111 2222 3333 4444"
                          className="border border-border-custom p-2.5 text-sm rounded bg-white text-ink-custom font-mono outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label className="text-[9px] font-bold text-ink-2-custom uppercase font-mono tracking-wider mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/28"
                            className="border border-border-custom p-2.5 text-sm rounded bg-white text-ink-custom font-mono text-center outline-none"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[9px] font-bold text-ink-2-custom uppercase font-mono tracking-wider mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            placeholder="***"
                            className="border border-border-custom p-2.5 text-sm rounded bg-white text-ink-custom font-mono text-center outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "COD" && (
                  <div className="bg-[#FFE7D8] p-4.5 rounded-xl border border-[#C0271E]/10 flex items-start gap-2.5 animate-scaleIn text-left">
                    <Truck className="w-5 h-5 text-cta-custom shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-ink-custom text-xs">Cash on Delivery Policy</span>
                      <p className="text-[11px] text-ink-2-custom leading-normal mt-1">
                        Cash on Delivery incurs higher cargo handling costs from local BlueDart courier logistics. While paying prepaid via UPI helps us as a solo founder, COD remains fully supported for absolute buyer convenience. No extra surcharges are levied during freight.
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center gap-2 font-mono text-[9.5px]">
                  <Shield className="w-4 h-4 text-brand-custom shrink-0" />
                  <span>Razorpay AES-256 Bit Compliant Nodes. Secure D2C direct protocol.</span>
                </div>
              </div>
            )}

            {/* PROCESSING STEPS LOGS PAGE */}
            {step === "processing" && (
              <div className="text-center py-10 space-y-6 font-sans" id="payment-processing">
                <div className="w-12 h-12 border-4 border-brand-custom border-t-transparent rounded-full animate-spin mx-auto"></div>
                
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h6 className="font-bold text-ink-custom text-base uppercase font-display select-none">{loadingStep}</h6>
                  <p className="text-xs text-ink-2-custom">
                    Connecting to secure ledger clusters. Do not reload or swipe away of this checkout.
                  </p>
                </div>

                {/* Secure databases sync telemetry representation */}
                {jsonPayloadLog && (
                  <div className="text-left bg-slate-950 text-gray-250 p-4 rounded-xl font-mono text-[9.5px] overflow-auto max-h-[160px] border border-gray-800 shadow-md">
                    <div className="flex justify-between items-center text-gray-450 border-b border-gray-900 pb-1.5 mb-2 select-none">
                      <span>📊 API TELEMETRY LEDGER: ACTIVE MATRIX</span>
                      <span className="text-brand-custom">Google Sheets V4 Node</span>
                    </div>
                    <pre className="text-brand-custom">{jsonPayloadLog}</pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form back and next controls */}
          {step !== "processing" && (
            <div className="border-t border-border-custom pt-5 mt-6 flex justify-between items-center bg-white z-20">
              {step === "cart" && (
                <>
                  <button 
                    onClick={onClose}
                    className="text-ink-2-custom hover:text-ink-custom font-extrabold text-xs py-2 uppercase tracking-wider cursor-pointer font-sans"
                  >
                    ← Browse Packs
                  </button>
                  <button 
                    disabled={cart.length === 0}
                    onClick={() => setStep("shipping")}
                    className={`px-5 py-3 bg-gray-950 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all hover:bg-gray-800 ${
                      cart.length === 0 ? "opacity-42 cursor-not-allowed" : ""
                    }`}
                  >
                    Shipping Details <ChevronRight className="w-4 h-4 text-brand-custom" />
                  </button>
                </>
              )}

              {step === "shipping" && (
                <>
                  <button 
                    onClick={onBackToCart}
                    className="text-ink-2-custom hover:text-ink-custom font-extrabold text-xs py-2 uppercase tracking-wider cursor-pointer font-sans"
                  >
                    ← Go Back to bag
                  </button>
                  <button 
                    onClick={() => {
                      if (validateForm()) {
                        // Prompt OTP authorization step
                        document.getElementById("hidden-shipping-submit")?.click();
                      }
                    }}
                    className="px-5 py-3 bg-gray-950 hover:bg-gray-800 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    Authenticate receipt <ChevronRight className="w-4 h-4 text-brand-custom" />
                  </button>
                </>
              )}

              {step === "authenticating" && (
                <>
                  <button 
                    onClick={() => setStep("shipping")}
                    className="text-ink-2-custom hover:text-ink-custom font-semibold text-xs py-2 uppercase tracking-wider cursor-pointer font-sans"
                  >
                    ← Edit Address
                  </button>
                  {isPhoneVerified && (
                    <button 
                      onClick={() => setStep("payment")}
                      className="px-5 py-3 bg-gray-950 hover:bg-gray-800 text-white font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      Payment Sandbox <ChevronRight className="w-4 h-4 text-brand-custom" />
                    </button>
                  )}
                </>
              )}

              {step === "payment" && (
                <>
                  <button 
                    onClick={() => setStep("shipping")}
                    className="text-ink-2-custom hover:text-ink-custom font-bold text-xs py-2 uppercase tracking-wider cursor-pointer font-sans"
                  >
                    ← Edit shipping
                  </button>
                  
                  {/* Primary orange CTA! */}
                  <button 
                    onClick={handleCompletePaymentOrder}
                    className="px-6 py-3.5 bg-cta-custom hover:bg-cta-strong-custom text-white font-sans font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                    id="checkout-finalize-pay"
                  >
                    🔐 Secure payment
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Pricing Summary Sidebar */}
        {cart.length > 0 && (
          <div className="w-full md:w-2/5 bg-surface-custom border-t md:border-t-0 md:border-l border-border-custom p-5 sm:p-7 overflow-y-auto flex flex-col justify-between max-h-[34vh] md:max-h-none text-left">
            <div className="space-y-4">
              <span className="block text-xs font-mono text-ink-3-custom font-bold uppercase tracking-widest leading-none pl-0.5">
                Cart Invoice Summary
              </span>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.bundle.id} className="flex justify-between items-baseline text-xs text-ink-2-custom">
                    <span className="line-clamp-1 font-bold">{item.bundle.name} <span className="font-mono text-[10px] text-ink-3-custom font-normal">x{item.quantity}</span></span>
                    <span className="font-mono font-black text-ink-custom whitespace-nowrap">₹{item.bundle.price * item.quantity}</span>
                  </div>
                ))}

                <div className="border-t border-border-custom/80 pt-3 space-y-2 text-xs text-ink-2-custom font-serif">
                  <div className="flex justify-between items-baseline font-sans not-italic">
                    <span>Cart Subtotal:</span>
                    <span className="font-mono text-ink-custom font-bold">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-sans not-italic">
                    <span>Express Cargo Freight:</span>
                    <span className="font-mono text-ink-custom">
                      {getShippingFee() === 0 ? <span className="text-brand-custom font-black font-mono">FREE</span> : `₹${getShippingFee()}`}
                    </span>
                  </div>
                  {getSubtotal() >= 499 && (
                    <div className="flex justify-between items-baseline text-[10px] font-mono text-brand-strong-custom font-bold">
                      <span>Package Volume Benefit:</span>
                      <span>-₹40</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-border-custom pt-4 mt-4 md:mt-0">
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-sans font-black text-xs sm:text-xs text-ink-custom uppercase tracking-wide">Grand Invoice Total</span>
                <span className="font-mono font-black text-xl sm:text-2xl text-[#C94E12]">₹{getTotal()}</span>
              </div>

              {/* Security indicators */}
              <div className="bg-white p-3 rounded-lg border border-border-custom text-[10px] text-ink-3-custom space-y-2 font-mono leading-normal shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-ink-custom uppercase text-[9px] tracking-wider leading-none">
                  <Shield className="w-3.5 h-3.5 text-brand-custom animate-pulse" /> Smelloff buyer seal
                </div>
                <div>• Zero-risk Hyderabad warehouse satisfaction direct assurance.</div>
                <div>• Disbursed inside lightweight plain cardboard sleeves to maintain recipient convenience.</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
