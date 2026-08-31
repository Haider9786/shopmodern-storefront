import React from "react";
import { Outlet, Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCartStore } from "../../features/cart/store/useCartStore";

export const RootLayout = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="min-h-screen min-w-0 flex flex-col bg-white text-brand-on-surface font-sans overflow-x-hidden relative">
      <Header />
      <main className="flex-1 min-w-0 w-full">
        <Outlet />
      </main>
      <Footer />

      {/* Global Cart FAB */}
      <Link
        to="/cart"
        className="fixed bottom-6 right-6 z-50 p-4 bg-brand-primary text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-[#344bf5] hover:scale-105 transition-all duration-200 flex items-center justify-center group"
        aria-label="View Cart"
      >
        <ShoppingBag className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};