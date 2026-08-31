import React, { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { Container } from "../components/layout/Container";
import { ProductCard } from "../features/products/components/ProductCard";
import { useProductStore } from "../features/products/store/useProductStore";
import { Button } from "../components/ui/Button";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get("search")?.toLowerCase() || "";
  const selectedCategory = searchParams.get("category") || "All";

  const storeProducts = useProductStore((state) => state.products || []);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const lastFetch = useProductStore((state) => state.lastFetch || 0);
  const startPolling = useProductStore((state) => state.startPolling);
  const stopPolling = useProductStore((state) => state.stopPolling);
  const refreshOnFocus = useProductStore((state) => state.refreshOnFocus);

  const CATEGORIES = useMemo(() => {
    const set = new Set();
    storeProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...[...set].sort((a, b) => a.localeCompare(b))];
  }, [storeProducts]);

  useEffect(() => {
    // Initial fetch with loading state
    fetchProducts();
    
    // Start polling for automatic updates (silent)
    startPolling();
    
    // Handle window focus for refresh (silent)
    const handleFocus = () => {
      refreshOnFocus();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Cleanup on unmount
    return () => {
      stopPolling();
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchProducts, startPolling, stopPolling, refreshOnFocus]);

  const handleCategorySelect = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  const filteredProducts = storeProducts.filter((product) => {
    const matchesSearch =
      !searchFilter ||
      product.name?.toLowerCase().includes(searchFilter) ||
      product.category?.toLowerCase().includes(searchFilter);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6 sm:py-10 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-start md:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 min-w-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface break-words">Products</h1>
            {searchFilter && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                Showing results for "<span className="font-bold text-brand-primary">{searchFilter}</span>"
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 sm:-mx-0 px-4 sm:px-0 snap-x snap-mandatory w-full md:w-auto min-w-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors snap-start shrink-0 min-h-[36px] sm:min-h-[40px] ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className="text-center py-10 sm:py-16 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-red-700 mb-1">Error loading products</p>
            <p className="text-xs text-gray-400 mb-5 sm:mb-6 break-words">{error}</p>
            <Button size="sm" onClick={fetchProducts}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="text-center py-10 sm:py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-base sm:text-lg font-bold text-gray-700 mb-1">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 sm:py-16 bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <p className="text-base sm:text-lg font-bold text-gray-700 mb-1">No products found</p>
            <p className="text-xs text-gray-400 mb-5 sm:mb-6 break-words">Try adjusting your search query or category filter.</p>
            <Button size="sm" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};