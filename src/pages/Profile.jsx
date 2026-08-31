import React, { useState, useEffect } from "react";
import {
  User,
  Package,
  Heart,
  LogOut,
  Star,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { formatCurrency } from "../utils/formatCurrency";
import { useWishlistStore } from "../features/wishlist/store/useWishlistStore";
import { useOrderStore } from "../features/checkout/store/useOrderStore";
import { ProductCard } from "../features/products/components/ProductCard";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { createReview, fetchReviewsByCustomer } from "../api/orders";

function StarsInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={18}
            className={
              n <= value ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const wishlistItems = useWishlistStore((state) => state.items || []);
  const { addToast } = useToast();
  const allOrders = useOrderStore((state) => state.orders || []);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);
  const navigate = useNavigate();

  const { user, updateProfile, logout } = useAuth();

  const [reviewedProductIds, setReviewedProductIds] = useState(new Set());
  const [reviewForm, setReviewForm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    fetchReviewsByCustomer(user.email)
      .then((reviews) =>
        setReviewedProductIds(new Set(reviews.map((r) => String(r.productId)))),
      )
      .catch(() => {});
  }, [user?.email]);

  const orders = allOrders.filter((o) => {
    const emailMatches =
      user?.email &&
      o.customerEmail &&
      o.customerEmail.toLowerCase() === user.email.toLowerCase();
    const nameMatches =
      user?.name &&
      o.customerName &&
      o.customerName.toLowerCase() === user.name.toLowerCase();
    return emailMatches || nameMatches;
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
  });

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    addToast("Profile details updated successfully", "success");
  };

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully", "info");
    navigate("/login");
  };

  return (
    <div className="py-6 sm:py-10 bg-brand-surface/30 min-h-screen">
      <Container>
        <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-on-surface break-words">
            My Account
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 min-w-0">
          <Card className="p-2 sm:p-3 lg:p-4 h-fit min-w-0 lg:order-1">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-2 sm:mx-0 px-2 sm:px-0 pb-2 lg:pb-0 snap-x lg:snap-none">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap snap-start lg:snap-start min-h-[44px] shrink-0 ${
                  activeTab === "orders"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Package className="w-4 h-4 shrink-0" /> Order History
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap snap-start min-h-[44px] shrink-0 ${
                  activeTab === "wishlist"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className="w-4 h-4 shrink-0" /> Wishlist (
                {wishlistItems.length})
              </button>

              <button
                onClick={() => setActiveTab("details")}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap snap-start min-h-[44px] shrink-0 ${
                  activeTab === "details"
                    ? "bg-brand-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4 shrink-0" /> Personal Details
              </button>
            </nav>
          </Card>

          <div className="lg:col-span-3 min-w-0 lg:order-2">
            {activeTab === "orders" && (
              <div className="space-y-3 sm:space-y-4 min-w-0">
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-on-surface mb-3 sm:mb-4 break-words">
                  Past Orders
                </h2>
                {orders.length === 0 ? (
                  <Card className="p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm break-words">
                    No orders placed yet.
                  </Card>
                ) : (
                  orders.map((order) => {
                    const orderTotal = order.totalAmount ?? order.total ?? 0;
                    const orderDate = order.createdAt
                      ? new Date(order.createdAt).toISOString().split("T")[0]
                      : (order.date ?? "—");
                    const orderStatus =
                      typeof order.status === "string"
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : (order.status ?? "Pending");
                    const shortOrderId =
                      typeof order.id === "string" && order.id.length > 10
                        ? `ORD-${order.id.slice(-8).toUpperCase()}`
                        : order.id;
                    return (
                      <Card key={order.id} className="p-3 sm:p-6 min-w-0">
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-gray-100 min-w-0">
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase break-words">
                              Order ID
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold text-brand-on-surface break-words">
                              {shortOrderId}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase break-words">
                              Date
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-gray-700 break-words">
                              {orderDate}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase break-words">
                              Total
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold text-brand-primary whitespace-nowrap">
                              {formatCurrency(orderTotal)}
                            </p>
                          </div>
                          <div className="col-span-2 sm:col-auto flex sm:justify-end min-w-0">
                            <Badge
                              variant={
                                orderStatus === "Delivered"
                                  ? "success"
                                  : "primary"
                              }
                            >
                              {orderStatus}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-3 sm:mt-4 divide-y divide-gray-50 min-w-0">
                          {order.items?.map((item, idx) => {
                            const pid = String(
                              item.productId || item.id || item.id || "",
                            );
                            const isDelivered =
                              typeof order.status === "string" &&
                              order.status.toLowerCase() === "delivered";
                            const isReviewed = reviewedProductIds.has(pid);
                            const activeForm =
                              reviewForm && reviewForm.productId === pid;
                            const rawImage = item.imageUrl || item.image;
                            const image = rawImage
                              ? rawImage.startsWith("http")
                                ? rawImage
                                : `https://shopmodern-backend.onrender.com${rawImage}`
                              : null;
                            const initials = (item.name || "?")
                              .split(/\s+/)
                              .map((w) => w[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase();
                            return (
                              <div
                                key={item.id || item.id || idx}
                                className="py-2.5 sm:py-3 min-w-0"
                              >
                                <div className="flex items-start justify-between gap-2 sm:gap-4 min-w-0">
                                  <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                    {image ? (
                                      <img
                                        src={image}
                                        alt={item.name}
                                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg bg-gray-50 shrink-0 border border-gray-100"
                                        onError={(e) => {
                                          const span =
                                            document.createElement("span");
                                          span.textContent = initials;
                                          span.className =
                                            "w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-gray-100 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary flex items-center justify-center font-extrabold text-xs sm:text-sm";
                                          e.currentTarget.replaceWith(span);
                                        }}
                                      />
                                    ) : (
                                      <span className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-lg border border-gray-100 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary flex items-center justify-center font-extrabold text-xs sm:text-sm">
                                        {initials}
                                      </span>
                                    )}
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[11px] sm:text-xs font-bold text-brand-on-surface leading-snug line-clamp-2 mb-0.5 sm:mb-1 break-words">
                                        {item.name}
                                      </p>
                                      <p className="text-[10px] sm:text-[11px] text-gray-400 break-words">
                                        Qty: {item.quantity} ×{" "}
                                        {formatCurrency(item.price || 0)}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-[11px] sm:text-xs font-extrabold text-gray-700 shrink-0 pt-0.5 whitespace-nowrap">
                                    {formatCurrency(
                                      (item.price || 0) * (item.quantity || 1),
                                    )}
                                  </span>
                                </div>
                                {isDelivered && (
                                  <div className="mt-2 sm:mt-3 ml-0 sm:ml-[68px] min-w-0">
                                    {isReviewed ? (
                                      <p className="text-[10px] sm:text-[11px] font-bold text-emerald-600 inline-flex items-center gap-1.5 break-words">
                                        <Star
                                          size={12}
                                          className="fill-emerald-500 text-emerald-500 shrink-0"
                                        />
                                        Your review was submitted pending
                                        approval.
                                      </p>
                                    ) : activeForm ? (
                                      <form
                                        onSubmit={async (e) => {
                                          e.preventDefault();
                                          if (
                                            !reviewForm ||
                                            !reviewForm.rating ||
                                            !reviewForm.comment.trim()
                                          ) {
                                            addToast(
                                              "Please select a star rating and write a comment",
                                              "error",
                                            );
                                            return;
                                          }
                                          setSubmitting(true);
                                          try {
                                            await createReview({
                                              productId: reviewForm.productId,
                                              customerName:
                                                user?.name ||
                                                reviewForm.customerName,
                                              customerEmail:
                                                user?.email ||
                                                reviewForm.customerEmail,
                                              rating: reviewForm.rating,
                                              comment:
                                                reviewForm.comment.trim(),
                                            });
                                            setReviewedProductIds(
                                              (prev) =>
                                                new Set([
                                                  ...prev,
                                                  reviewForm.productId,
                                                ]),
                                            );
                                            addToast(
                                              "Review submitted. Thank you!",
                                              "success",
                                            );
                                            setReviewForm(null);
                                          } catch {
                                            addToast(
                                              "Failed to submit review. Try again.",
                                              "error",
                                            );
                                          } finally {
                                            setSubmitting(false);
                                          }
                                        }}
                                        className="rounded-xl border border-gray-100 bg-gray-50/60 p-2.5 sm:p-3 space-y-2 min-w-0"
                                      >
                                        <p className="text-[10px] sm:text-[11px] font-bold text-gray-600 flex items-center gap-1.5 break-words">
                                          <MessageSquare
                                            size={12}
                                            className="shrink-0"
                                          />{" "}
                                          Write your review
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 min-w-0">
                                          <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold shrink-0">
                                            Rating:
                                          </span>
                                          <StarsInput
                                            value={reviewForm.rating}
                                            onChange={(n) =>
                                              setReviewForm({
                                                ...reviewForm,
                                                rating: n,
                                              })
                                            }
                                          />
                                        </div>
                                        <textarea
                                          rows={3}
                                          value={reviewForm.comment}
                                          onChange={(e) =>
                                            setReviewForm({
                                              ...reviewForm,
                                              comment: e.target.value,
                                            })
                                          }
                                          placeholder="How did the product match your expectations?"
                                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[11px] sm:text-xs text-brand-on-surface placeholder-gray-400 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary resize-none min-h-[88px]"
                                        />
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setReviewForm(null)}
                                            disabled={submitting}
                                            className="w-full sm:w-auto"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            type="submit"
                                            size="sm"
                                            disabled={submitting}
                                            className="w-full sm:w-auto"
                                          >
                                            {submitting
                                              ? "Submitting…"
                                              : "Submit Review"}
                                          </Button>
                                        </div>
                                      </form>
                                    ) : (
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                          setReviewForm({
                                            productId: pid,
                                            productName: item.name,
                                            customerName:
                                              user?.name || order.customerName,
                                            customerEmail:
                                              user?.email ||
                                              order.customerEmail,
                                            rating: 0,
                                            comment: "",
                                          })
                                        }
                                        className="text-[10px] sm:text-[11px] whitespace-normal sm:whitespace-nowrap"
                                      >
                                        <Star
                                          size={12}
                                          className="mr-1 shrink-0"
                                        />{" "}
                                        Write a Review
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-on-surface mb-3 sm:mb-4 break-words">
                  Saved Wishlist
                </h2>
                {wishlistItems.length === 0 ? (
                  <Card className="p-6 sm:p-8 text-center text-gray-500 text-xs sm:text-sm break-words">
                    Your wishlist is empty.
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {wishlistItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "details" && (
              <Card className="p-4 sm:p-6 min-w-0">
                <h2 className="text-lg sm:text-xl font-extrabold text-brand-on-surface mb-4 sm:mb-6 break-words">
                  Personal Details
                </h2>
                <form
                  onSubmit={handleProfileSave}
                  className="space-y-3 sm:space-y-4 min-w-0"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">
                        Email
                      </label>
                      <Input
                        type="email"
                        disabled
                        value={profileData.email}
                        className="text-xs bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="sm:col-span-2 min-w-0">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">
                        Address
                      </label>
                      <Input
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            address: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="min-w-0">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">
                        City
                      </label>
                      <Input
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            city: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                    <div className="min-w-0 sm:col-span-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-gray-600 mb-1 break-words">
                        ZIP Code
                      </label>
                      <Input
                        value={profileData.zipCode}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            zipCode: e.target.value,
                          })
                        }
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    className="mt-3 sm:mt-4 w-full sm:w-auto min-h-[44px]"
                  >
                    Save Changes
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
