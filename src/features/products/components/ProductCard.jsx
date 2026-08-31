import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { useCartStore } from "../../cart/store/useCartStore";
import { useWishlistStore } from "../../wishlist/store/useWishlistStore";
import { useToast } from "../../../context/ToastContext";
import { formatCurrency } from "../../../utils/formatCurrency";

export const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, category, imageUrl, image, isNew, isSale } = product;
  const displayImage = imageUrl
  ? (imageUrl.startsWith('http') ? imageUrl : `https://shopmodern-backend.onrender.com${imageUrl}`)
  : image;
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id));
  const { addToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added ${name} to cart`, "success");
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      isInWishlist ? `Removed ${name} from wishlist` : `Added ${name} to wishlist`,
      "info"
    );
  };

  return (
    <Card hover className="group relative flex flex-col overflow-hidden h-full min-w-0">
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1">
        {isNew && <Badge variant="primary">New</Badge>}
        {isSale && <Badge variant="danger">Sale</Badge>}
      </div>

      <button
        onClick={handleWishlistToggle}
        aria-label="Add to Wishlist"
        className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-10 p-2 min-h-[36px] min-w-[36px] rounded-full backdrop-blur-sm transition-colors shadow-sm flex items-center justify-center ${
          isInWishlist
            ? "bg-rose-50 text-rose-500"
            : "bg-white/80 text-gray-500 hover:text-rose-500"
        }`}
      >
        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isInWishlist ? "fill-current text-rose-500" : ""}`} />
      </button>

      <Link to={`/products/${id}`} className="relative aspect-[4/3] overflow-hidden bg-gray-50 block w-full min-w-0">
        <img
          src={displayImage}
          alt={name}
          className="h-full w-full max-w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4 min-w-0">
        {category && (
          <span className="text-[11px] sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
            {category}
          </span>
        )}

        <Link
          to={`/products/${id}`}
          className="text-sm sm:text-base font-bold text-brand-on-surface hover:text-brand-primary line-clamp-2 transition-colors block min-h-[2.5em] sm:min-h-[1.5em]"
        >
          {name}
        </Link>

        <div className="mt-auto pt-3 sm:pt-4 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap min-w-0 flex-1">
            <span className="text-base sm:text-lg font-extrabold text-brand-on-surface shrink-0">
              {formatCurrency(price)}
            </span>
            {originalPrice && (
              <span className="text-[11px] sm:text-sm text-gray-400 line-through shrink-0">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            className="p-2 min-h-[36px] min-w-[36px] text-brand-primary hover:bg-brand-surface-container shrink-0"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};