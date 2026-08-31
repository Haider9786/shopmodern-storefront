import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Input } from "../ui/Input";
import { useCartStore } from "../../features/cart/store/useCartStore";
import { NotificationDropdown } from "../NotificationDropdown";

export const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const currentSearch = new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(currentSearch);
  }, [location.search]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(location.search);
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    navigate(`/products?${params.toString()}`, { replace: true });
  };

  const navItems = useMemo(() => [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ], []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <Container className="flex h-16 md:h-20 items-center justify-between gap-1.5 sm:gap-6 px-2 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-1 sm:gap-2 group shrink-0" onClick={closeMobileMenu}>
            <img 
              src="/logo.png" 
              alt="ShopModern" 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden min-[360px]:inline text-sm min-[390px]:text-base sm:text-lg md:text-2xl font-extrabold text-brand-primary tracking-tight">
              ShopModern
            </span>
          </Link>

          <div className="flex-1 max-w-md hidden md:block min-w-0">
            <Input
              icon={Search}
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8 shrink-0">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-base font-bold transition-colors whitespace-nowrap ${
                    isActive ? "text-brand-primary font-bold" : "text-gray-600 hover:text-brand-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((v) => !v)}
              aria-label="Search"
              className="md:hidden p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>

            <NotificationDropdown />

            <Link
              to="/profile"
              aria-label="Account"
              className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link 
              to="/cart" 
              className="relative p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-brand-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="lg:hidden p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {isMobileSearchOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <Container className="py-3">
              <Input
                icon={Search}
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                autoFocus
              />
            </Container>
          </div>
        )}
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 shrink-0">
              <span className="text-lg font-extrabold text-brand-primary tracking-tight">
                Menu
              </span>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="p-2 min-h-[44px] min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 py-3 border-b border-gray-100 shrink-0">
              <Input
                icon={Search}
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <nav className="flex-1 overflow-y-auto py-2 px-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 rounded-xl text-base font-bold transition-colors min-h-[48px] ${
                          isActive
                            ? "bg-brand-primary/10 text-brand-primary"
                            : "text-gray-700 hover:bg-gray-50 hover:text-brand-primary"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2 shrink-0">
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-primary text-white font-bold min-h-[48px] hover:bg-brand-primary-hover transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                View Cart
                {totalItems > 0 && (
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold min-h-[48px] hover:bg-gray-50 transition-colors"
              >
                <User className="w-5 h-5" />
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
