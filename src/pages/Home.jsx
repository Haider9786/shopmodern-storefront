import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Headphones, 
  Star,
  ShoppingBag,
  Heart
} from "lucide-react";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useProductStore } from "../features/products/store/useProductStore";
import { formatCurrency } from "../utils/formatCurrency";
import { ProductCard } from "../features/products/components/ProductCard";
import { getCategoryImage } from "../utils/categoryImages";

// Trust Value Props Bar
const TRUST_BADGES = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "On all orders over $99",
  },
  {
    icon: ShieldCheck,
    title: "2-Year Extended Warranty",
    description: "Full coverage on all hardware",
  },
  {
    icon: RotateCcw,
    title: "30-Day Risk-Free Trial",
    description: "Hassle-free, instant returns",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Dedicated technical assistance",
  },
];

export const Home = () => {
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get first 4 products for trending section
  const trendingProducts = products.slice(0, 4);

  // Extract unique categories from products dynamically
  const getFeaturedCategories = () => {
    const categoryMap = new Map();
    
    products.forEach(product => {
      const category = product.category || 'General';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, {
          name: category,
          image: getCategoryImage(category),
          productCount: 1
        });
      } else {
        categoryMap.get(category).productCount++;
      }
    });

    // Convert to array and take first 4 categories
    return Array.from(categoryMap.values()).slice(0, 4);
  };

  const featuredCategories = useMemo(() => getFeaturedCategories(), [products]);

  return (
    <div className="min-h-screen bg-brand-surface/20 space-y-8 sm:space-y-12 pb-10 sm:pb-16">
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <img 
                  src="/logo.png" 
                  alt="ShopModern" 
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  ))}
                </div>
                <span>4.9/5 Trust Rating</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-brand-on-surface tracking-tight leading-[1.2] mb-3 sm:mb-4 break-words">
                Elevate Your Workspace with Modern Essentials
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-5 sm:mb-6 leading-relaxed max-w-full md:max-w-md break-words">
                Discover curated collections designed to enhance productivity and style in your professional environment.
              </p>
              <Link to="/products" className="inline-block">
                <Button size="sm" className="bg-brand-primary text-white font-bold px-5 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm min-h-[44px] w-full sm:w-auto">
                  Shop the Collection →
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-80 bg-gray-100 w-full min-w-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Workspace Setup"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white border-y border-gray-100 py-4 sm:py-6">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {TRUST_BADGES.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 min-w-0">
                  <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-brand-on-surface break-words">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400 break-words">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6 min-w-0">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-brand-on-surface break-words">Featured Categories</h2>
              <p className="text-xs sm:text-sm text-gray-400">Explore our most popular lines.</p>
            </div>
            <Link to="/categories" className="text-xs sm:text-sm font-bold text-brand-primary hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap">
              View All <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {featuredCategories.length > 0 ? (
              featuredCategories.map((cat, i) => (
                <Link key={i} to="/categories" className="group relative h-24 sm:h-28 md:h-32 rounded-xl overflow-hidden shadow-sm">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-2.5 sm:p-3">
                    <span className="text-xs sm:text-sm font-bold text-white break-words line-clamp-1">{cat.name}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 md:col-span-4 text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">
                Loading categories...
              </div>
            )}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="bg-brand-primary text-white rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md w-full">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-xs font-extrabold tracking-wider bg-white/20 px-2 sm:px-2.5 py-1 rounded-full uppercase inline-block whitespace-nowrap">
                LIMITED TIME OFFER
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold mt-2 break-words">Upgrade Your Setup</h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-full md:max-w-md break-words">
                Get 20% off all premium seating and ergonomic accessories. Use code <span className="font-mono font-bold text-white">UPGRADE20</span>.
              </p>
            </div>
            <Link to="/products" className="w-full md:w-auto shrink-0">
              <Button className="bg-white text-brand-primary font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg hover:bg-gray-100 min-h-[44px] w-full md:w-auto">
                Claim Discount
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-brand-on-surface">Trending Products</h2>
            <p className="text-xs sm:text-sm text-gray-400">Must-have essentials for your setup.</p>
          </div>

          {error ? (
            <div className="text-center py-6 sm:py-8 text-red-500 text-xs sm:text-sm">Error loading products: {error}</div>
          ) : loading ? (
            <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">Loading products...</div>
          ) : trendingProducts.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">No products available yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {trendingProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};