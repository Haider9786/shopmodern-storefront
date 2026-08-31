import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { useProductStore } from "../features/products/store/useProductStore";
import { useToast } from "../context/ToastContext";
import { useCartStore } from "../features/cart/store/useCartStore";
import { formatCurrency } from "../utils/formatCurrency";

export const ProductDetail = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const loading = useProductStore((state) => state.loading);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const product = products.find((item) => item.id === id) || products[0];

  const { addToast } = useToast();

  if (loading && !product) {
    return (
      <div className="py-20 bg-white min-h-screen">
        <Container className="text-center">
          <p className="text-gray-500">Loading product details...</p>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 bg-white min-h-screen">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </Container>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    addToast(`Added ${quantity}x ${product.name} to cart!`, "success");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-6 sm:py-10 bg-white min-h-screen">
      <Container>
        <Link to="/products" className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary mb-5 sm:mb-8 font-bold min-h-[40px]">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start min-w-0">
          <div className="rounded-2xl overflow-hidden bg-gray-50 aspect-square border border-gray-100 shadow-sm w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
            <img src={product.imageUrl ? (product.imageUrl.startsWith('http') ? product.imageUrl : `/uploads/${product.imageUrl.split('/uploads/').pop()}`) : product.image} alt={product.name} className="w-full h-full max-w-full object-cover object-center" />
          </div>

          <div className="space-y-4 sm:space-y-6 min-w-0">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <Badge variant="primary">{product.category}</Badge>
                {product.isNew && <Badge variant="success">New Release</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface break-words">{product.name}</h1>
              <p className="text-xl sm:text-2xl font-extrabold text-brand-primary mt-2 sm:mt-3">{formatCurrency(product.price)}</p>
            </div>

            <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed break-words">
              Designed for performance, durability, and ergonomic precision. Crafted with premium materials to support your professional workflow.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-600 font-bold min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 sm:px-5 text-sm font-bold text-brand-on-surface flex-1 sm:flex-none text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-600 font-bold min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                size="lg"
                className="flex-1 gap-2 w-full sm:w-auto"
                onClick={handleAddToCart}
                variant={added ? "secondary" : "primary"}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" /> Add to Cart
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 text-[11px] sm:text-xs text-brand-on-surface-variant">
              <div className="flex flex-col items-center text-center gap-1 p-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                <span className="break-words">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-2">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                <span className="break-words">2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1 p-2">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                <span className="break-words">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};