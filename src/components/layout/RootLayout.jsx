import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const RootLayout = () => {
  return (
    <div className="min-h-screen min-w-0 flex flex-col bg-white text-brand-on-surface font-sans overflow-x-hidden">
      <Header />
      <main className="flex-1 min-w-0 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};