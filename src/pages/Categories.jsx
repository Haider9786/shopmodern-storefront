import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Monitor,
  Headphones,
  Armchair,
  Watch,
  Home,
  ShoppingBasket,
  Shirt,
  Sparkles,
  Cpu,
  Tags,
} from "lucide-react";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { useProductStore } from "../features/products/store/useProductStore";
import { getCategoryImage } from "../utils/categoryImages";

const ICONS = {
  Peripherals: Monitor,
  Computers: Monitor,
  Accessories: Watch,
  Audio: Headphones,
  Seating: Armchair,
  Home: Home,
  Grocery: ShoppingBasket,
  Clothing: Shirt,
  Beauty: Sparkles,
  Electronics: Cpu,
};

function getCategoryIcon(name) {
  return ICONS[name] || Tags;
}

const DESCRIPTIONS = {
  Peripherals: "High-performance mechanical keyboards, precision mice, and essential desk tools.",
  Accessories: "Smart wearables, tech pouches, desk mats, and everyday carry gear.",
  Seating: "Ergonomic task chairs and minimalist standing desks for active posture.",
  Audio: "Studio-grade noise-cancelling headphones and spatial wireless speakers.",
  Electronics: "Cutting-edge devices, gadgets, and smart home essentials.",
  Clothing: "Modern essentials crafted with premium materials and everyday fit.",
  Home: "Minimalist furniture, lighting, and accents for a calm workspace.",
  Beauty: "Daily grooming and self-care essentials made for busy creators.",
  Uncategorized: "Miscellaneous products and one-of-a-kind finds.",
};

function getDescription(name) {
  return DESCRIPTIONS[name] || `${name} collection — handpicked for modern setups.`;
}

export const Categories = () => {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products || []);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);

  React.useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const name = p.category || "Uncategorized";
      if (!map.has(name)) {
        map.set(name, {
          name,
          slug: name,
          count: 0,
          image: p.imageUrl || p.image,
        });
      }
      const entry = map.get(name);
      entry.count += 1;
      if (!entry.image) entry.image = p.imageUrl || p.image;
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [products]);

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${encodeURIComponent(slug)}`);
  };

  return (
    <div className="py-6 sm:py-10 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="mb-6 sm:mb-8 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface break-words">Explore Categories</h1>
          <p className="text-xs text-gray-500 mt-1 break-words">
            Browse our curated collections to find gear tailored for your setup.
          </p>
        </div>

        {loading && categories.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="h-36 sm:h-48 bg-gray-200" />
                <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                  <div className="h-5 w-1/3 bg-gray-200 rounded" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 p-8 sm:p-16 text-center text-xs text-gray-500 bg-white break-words">
            No categories available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.name);
              const heroImage = getCategoryImage(cat.name);
              return (
                <Card
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className="group cursor-pointer overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 flex flex-col justify-between min-h-0"
                >
                  <div className="relative h-36 sm:h-40 md:h-48 w-full overflow-hidden bg-slate-200 flex-shrink-0">
                    <img
                      src={heroImage}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-lg shadow-sm">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                    </div>
                    <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 z-10 bg-black/60 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm whitespace-nowrap">
                      {cat.count} {cat.count === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 bg-white min-h-[90px] sm:min-h-[100px] md:min-h-[110px] flex flex-col justify-between min-w-0">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2 min-w-0">
                      <h2 className="text-base sm:text-lg font-extrabold text-brand-on-surface group-hover:text-brand-primary transition-colors break-words min-w-0">
                        {cat.name}
                      </h2>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed break-words">
                      {getDescription(cat.name)}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
};
