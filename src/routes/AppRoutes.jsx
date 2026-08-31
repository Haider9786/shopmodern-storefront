import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import { RootLayout } from "../components/layout/RootLayout";

import { Auth } from "../pages/Auth";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { ProductDetail } from "../pages/ProductDetail";
import { Categories } from "../pages/Categories";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Profile } from "../pages/Profile";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { TermsOfService } from "../pages/TermsOfService";

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Authentication Gate */}
        <Route path="/login" element={<Auth />} />

        {/* Protected Storefront Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};