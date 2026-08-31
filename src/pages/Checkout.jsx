import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useCartStore } from "../features/cart/store/useCartStore";
import { useOrderStore } from "../features/checkout/store/useOrderStore";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import {
  CreditCard,
  Wallet,
  Building2,
  Banknote,
  Smartphone,
  MoreHorizontal,
  Truck,
  Package,
  CheckCircle2,
} from "lucide-react";

const PAYMENT_METHODS = [
  { value: "Credit Card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { value: "PayPal", label: "PayPal", icon: Wallet, desc: "Express checkout" },
  { value: "Apple Pay", label: "Apple Pay", icon: Smartphone, desc: "Touch ID / Face ID" },
  { value: "Bank Transfer", label: "Bank Transfer", icon: Building2, desc: "Direct deposit, 1-2 days" },
  { value: "Cash on Delivery", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive" },
  { value: "Other", label: "Other", icon: MoreHorizontal, desc: "Contact us for details" },
];

const SHIPPING_CARRIERS = [
  { value: "FedEx", label: "FedEx", eta: "2-3 business days", price: 15, recommended: true },
  { value: "DHL", label: "DHL Express", eta: "1-2 business days", price: 20 },
  { value: "UPS", label: "UPS Ground", eta: "3-5 business days", price: 12 },
  { value: "USPS", label: "USPS Priority", eta: "2-4 business days", price: 10 },
  { value: "Other", label: "Other Carrier", eta: "Standard delivery", price: 15 },
];

export const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { firstName: defaultFirst, lastName: defaultLast } = useMemo(() => {
    const fullName = user?.name || "";
    const parts = fullName.trim().split(/\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: defaultFirst,
    lastName: defaultLast,
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    cardNumber: "•••• •••• •••• 4242",
    paymentMethod: "Credit Card",
    carrier: "FedEx",
  });

  const cartItems = useCartStore((state) => state.cart || []);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const { addToast } = useToast();

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const selectedCarrier = SHIPPING_CARRIERS.find((c) => c.value === formData.carrier) || SHIPPING_CARRIERS[0];
  const shipping = cartTotal > 0 ? selectedCarrier.price : 0;
  const grandTotal = cartTotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      addToast("Your cart is empty!", "error");
      return;
    }

    try {
      const orderPayload = {
        customerEmail: user?.email || formData.email,
        customerName: user?.name || `${formData.firstName} ${formData.lastName}`,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.imageUrl || item.image,
        })),
        totalAmount: grandTotal,
        status: "pending",
        paymentMethod: formData.paymentMethod,
        carrier: formData.carrier,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      };

      await addOrder(orderPayload);
      if (clearCart) clearCart();
      addToast("Order placed successfully!", "success");
      navigate("/profile");
    } catch (err) {
      addToast(err.message || "Failed to place order. Please try again.", "error");
    }
  };

  const showCardField = formData.paymentMethod === "Credit Card";

  return (
    <div className="py-6 sm:py-10 bg-brand-surface/30 min-h-screen">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface mb-5 sm:mb-8 break-words">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 min-w-0">
          <div className="lg:col-span-2 order-2 lg:order-1 min-w-0">
            <form onSubmit={handlePlaceOrder} className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-brand-on-surface mb-3 sm:mb-4 break-words">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">First Name</label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Last Name</label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                  <div className="sm:col-span-2 min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      disabled
                      className="bg-gray-50 cursor-not-allowed opacity-80"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Address</label>
                    <Input name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">City</label>
                    <Input name="city" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">ZIP Code</label>
                    <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 min-w-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Truck size={18} className="text-brand-primary shrink-0" />
                  <h2 className="text-base sm:text-lg font-extrabold text-brand-on-surface break-words">Shipping Method</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {SHIPPING_CARRIERS.map((carrier) => {
                    const selected = formData.carrier === carrier.value;
                    return (
                      <label
                        key={carrier.value}
                        className={`relative flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition min-w-0 ${
                          selected
                            ? "border-brand-primary bg-brand-primary/5"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="carrier"
                          value={carrier.value}
                          checked={selected}
                          onChange={handleInputChange}
                          className="mt-1 accent-brand-primary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 min-w-0">
                            <span className="font-bold text-xs sm:text-sm text-brand-on-surface break-words">{carrier.label}</span>
                            {carrier.recommended && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-primary/15 text-brand-primary whitespace-nowrap shrink-0">
                                Rec
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 break-words">{carrier.eta}</p>
                          <p className="text-[11px] sm:text-xs font-extrabold text-brand-on-surface mt-1 shrink-0">
                            {formatCurrency(carrier.price)}
                          </p>
                        </div>
                        {selected && (
                          <CheckCircle2
                            size={16}
                            className="text-brand-primary shrink-0 mt-0.5"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-4 sm:p-6 min-w-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Package size={18} className="text-brand-primary shrink-0" />
                  <h2 className="text-base sm:text-lg font-extrabold text-brand-on-surface break-words">Payment Method</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {PAYMENT_METHODS.map((method) => {
                    const selected = formData.paymentMethod === method.value;
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.value}
                        className={`relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl border-2 cursor-pointer transition text-center min-w-0 ${
                          selected
                            ? "border-brand-primary bg-brand-primary/5"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={selected}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Icon
                          size={20}
                          className={`${selected ? "text-brand-primary" : "text-gray-400"} shrink-0`}
                        />
                        <span className="text-[11px] sm:text-xs font-bold text-brand-on-surface leading-tight break-words px-0.5">
                          {method.label}
                        </span>
                        {selected && (
                          <CheckCircle2
                            size={14}
                            className="text-brand-primary absolute top-1.5 sm:top-2 right-1.5 sm:right-2 shrink-0"
                          />
                        )}
                      </label>
                    );
                  })}
                </div>

                {showCardField && (
                  <div className="pt-2 sm:pt-3 border-t border-gray-100 min-w-0">
                    <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">Card Number</label>
                    <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                  </div>
                )}
              </Card>

              <Button type="submit" size="lg" className="w-full min-h-[52px] text-sm sm:text-base break-words">
                Place Order ({formatCurrency(grandTotal)})
              </Button>
            </form>
          </div>

          <div className="order-1 lg:order-2 min-w-0">
            <Card className="p-4 sm:p-6 lg:sticky lg:top-24 min-w-0">
              <h2 className="text-base sm:text-lg font-extrabold text-brand-on-surface mb-3 sm:mb-4 break-words">Order Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-[11px] sm:text-xs text-gray-400 py-3 sm:py-4 break-words">No items in cart.</p>
              ) : (
                <div className="divide-y divide-gray-100 max-h-64 sm:max-h-80 overflow-y-auto mb-3 sm:mb-4 pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 sm:py-3 flex items-start gap-2 sm:gap-3 min-w-0"
                    >
                      {(() => {
                        const img = item.imageUrl || item.image;
                        const initials = (item.name || "?")
                          .split(/\s+/)
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase();
                        return img ? (
                          <img
                            src={img}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-100"
                            onError={(e) => {
                              const span = document.createElement("span");
                              span.textContent = initials;
                              span.className =
                                "w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-gray-100 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary flex items-center justify-center font-extrabold text-xs sm:text-sm";
                              e.currentTarget.replaceWith(span);
                            }}
                          />
                        ) : (
                          <span className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-gray-100 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary flex items-center justify-center font-extrabold text-xs sm:text-sm">
                            {initials}
                          </span>
                        );
                      })()}
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] sm:text-xs font-bold text-brand-on-surface leading-snug mb-0.5 sm:mb-1 break-words">
                          {item.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-gray-400 break-words">
                          Qty: {item.quantity} × {formatCurrency(item.price || 0)}
                        </p>
                      </div>
                      <span className="text-[11px] sm:text-xs font-extrabold text-gray-700 shrink-0 pt-0.5 whitespace-nowrap">
                        {formatCurrency((item.price || 0) * (item.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {cartItems.length > 0 && (
                <div className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs pb-3 sm:pb-4 border-b border-gray-100 mb-3 sm:mb-4">
                  <div className="flex justify-between text-gray-500 gap-2 min-w-0">
                    <span className="break-words">Subtotal</span>
                    <span className="font-extrabold text-brand-on-surface shrink-0 whitespace-nowrap">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500 gap-2 min-w-0">
                    <span className="break-words flex-1">
                      Shipping{" "}
                      <span className="text-gray-400 font-normal break-words">
                        ({selectedCarrier?.label || "Standard"})
                      </span>
                    </span>
                    <span className="font-extrabold text-brand-on-surface shrink-0 whitespace-nowrap">
                      {formatCurrency(shipping)}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-brand-on-surface gap-2 min-w-0">
                <span className="text-xs sm:text-sm break-words">Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-primary shrink-0 whitespace-nowrap">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};