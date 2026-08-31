import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Container } from "../components/layout/Container";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useCartStore } from "../features/cart/store/useCartStore";
import { useToast } from "../context/ToastContext";
import { formatCurrency } from "../utils/formatCurrency";

export const Cart = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCartStore = useCartStore((state) => state.clearCart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.0 : 0.0;
  const total = subtotal + shipping;

  const handleRemoveItem = (id, name) => {
    removeFromCart(id);
    addToast(`Removed ${name} from cart`, "info");
  };

  const handleClearCart = () => {
    clearCartStore();
    addToast("Cart cleared", "info");
  };

  if (cart.length === 0) {
    return (
      <div className="py-12 sm:py-20">
        <Container className="text-center max-w-md px-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-surface-container rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-brand-primary">
            <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-on-surface mb-2 break-words">Your cart is empty</h2>
          <p className="text-xs sm:text-sm text-brand-on-surface-variant mb-5 sm:mb-6 break-words">
            Looks like you haven't added any setup essentials yet.
          </p>
          <Link to="/products" className="block">
            <Button className="w-full min-h-[48px]">Explore Products</Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="flex items-start sm:items-center justify-between gap-3 mb-5 sm:mb-8 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface break-words">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-xs text-rose-600 hover:underline font-bold shrink-0 whitespace-nowrap min-h-[36px] flex items-center"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4 order-2 lg:order-1">
            {cart.map((item) => (
              <Card key={item.id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                  <Link
                    to={`/products/${item.id}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-medium break-words">{item.category}</span>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-xs sm:text-sm font-semibold text-brand-on-surface block line-clamp-2 hover:text-brand-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span className="text-xs sm:text-sm font-extrabold text-brand-primary block mt-0.5 sm:mt-1">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pl-16 sm:pl-0 sm:shrink-0">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-gray-500 hover:text-brand-on-surface min-h-[40px] min-w-[40px] flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-2.5 sm:px-3 text-xs font-extrabold text-brand-on-surface min-w-[28px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-500 hover:text-brand-on-surface min-h-[40px] min-w-[40px] flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <Card className="p-4 sm:p-6 space-y-3 sm:space-y-4 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-bold text-brand-on-surface pb-2 sm:pb-3 border-b border-gray-100 break-words">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-brand-on-surface-variant gap-2">
                  <span className="break-words">Subtotal</span>
                  <span className="font-extrabold text-brand-on-surface shrink-0">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-on-surface-variant gap-2">
                  <span className="break-words">Estimated Shipping</span>
                  <span className="font-extrabold text-brand-on-surface shrink-0">{formatCurrency(shipping)}</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-gray-100 flex justify-between items-baseline gap-2">
                <span className="text-sm sm:text-base font-bold text-brand-on-surface break-words">Total</span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-primary shrink-0">{formatCurrency(total)}</span>
              </div>

              <Button onClick={() => navigate("/checkout")} className="w-full gap-2 mt-3 sm:mt-4 min-h-[48px]" size="lg">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};