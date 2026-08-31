import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { useToast } from "../../context/ToastContext";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter a valid email address", "error");
      return;
    }
    addToast("Subscribed to newsletter successfully!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-brand-surface border-t border-gray-100 py-8 sm:py-12 min-w-0">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8 min-w-0">
          <div className="sm:col-span-2 md:col-span-1 min-w-0">
            <Link to="/" className="flex items-center gap-2 mb-2 sm:mb-3">
              <img 
                src="/logo.png" 
                alt="ShopModern" 
                className="h-7 sm:h-8 w-auto object-contain"
              />
              <span className="text-lg sm:text-xl font-extrabold text-brand-primary break-words">
                ShopModern
              </span>
            </Link>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-brand-on-surface-variant max-w-full sm:max-w-xs leading-relaxed break-words">
              Curated essentials for the modern professional workspace. Built for comfort, designed for focus.
            </p>
          </div>
          
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-brand-on-surface mb-2 sm:mb-3 uppercase tracking-wider break-words">Shop</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-brand-on-surface-variant">
              <li><Link to="/products" className="hover:text-brand-primary transition-colors break-words inline-block">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-brand-primary transition-colors break-words inline-block">Categories</Link></li>
              <li><Link to="/products?category=Peripherals" className="hover:text-brand-primary transition-colors break-words inline-block">Peripherals</Link></li>
              <li><Link to="/products?category=Audio" className="hover:text-brand-primary transition-colors break-words inline-block">Audio Gear</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-brand-on-surface mb-2 sm:mb-3 uppercase tracking-wider break-words">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-brand-on-surface-variant">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors break-words inline-block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors break-words inline-block">Contact Us</Link></li>
              <li><Link to="/profile" className="hover:text-brand-primary transition-colors break-words inline-block">My Account</Link></li>
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-brand-on-surface mb-2 sm:mb-3 uppercase tracking-wider break-words">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-brand-on-surface-variant">
              <li><Link to="/privacy" className="hover:text-brand-primary transition-colors break-words inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-primary transition-colors break-words inline-block">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-brand-on-surface mb-2 sm:mb-3 uppercase tracking-wider break-words">Stay Updated</h4>
            <p className="text-xs sm:text-sm text-brand-on-surface-variant mb-2 sm:mb-3 break-words">Subscribe for exclusive updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full min-w-0 text-xs sm:text-sm px-3 py-2.5 border rounded-lg outline-none focus:border-brand-primary bg-white min-h-[44px]"
              />
              <button 
                type="submit" 
                className="px-4 py-2.5 bg-brand-primary text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-brand-primary/90 transition-colors shrink-0 min-h-[44px] w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-5 sm:pt-8 border-t border-gray-200/60 text-[11px] sm:text-xs text-brand-on-surface-variant text-center px-1 break-words">
          © {new Date().getFullYear()} ShopModern. All rights reserved. Built for professional commerce.
        </div>
      </Container>
    </footer>
  );
};