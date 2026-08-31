import React, { useState, useEffect, useRef } from "react";
import { Bell, Check, X, ShoppingBag, Package, CreditCard, RotateCcw, Heart, Tag, Star, User, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useNotificationStore } from "../features/notifications/store/useNotificationStore";
import { useAuth } from "../context/AuthContext";

const categoryIcons = {
  account: User,
  order: ShoppingBag,
  payment: CreditCard,
  returns: RotateCcw,
  wishlist: Heart,
  promotions: Tag,
  reviews: Star,
};

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
};

const typeColors = {
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-amber-500",
  error: "text-red-500",
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotificationStore();

  useEffect(() => {
    if (user?.email) {
      fetchNotifications(user.email);
      fetchUnreadCount(user.email);
    }
  }, [user?.email, fetchNotifications, fetchUnreadCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    if (user?.email) {
      markAllAsRead(user.email);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 sm:p-2 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] text-gray-500 hover:text-brand-primary transition-colors relative flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-[calc(100vw-1rem)] sm:w-80 max-w-sm bg-white rounded-xl shadow-xl border border-gray-100 z-50 md:z-30 max-h-[70vh] sm:max-h-96 flex flex-col overflow-hidden">
            <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs text-gray-500">
                  {unreadCount} unread
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="md:hidden p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-50 border-b border-gray-100 shrink-0">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[11px] sm:text-xs text-brand-primary hover:text-brand-primary-hover font-medium"
                >
                  Mark all read
                </button>
              )}
              <button className="text-[11px] sm:text-xs text-gray-500 hover:text-gray-700 font-medium">
                View all
              </button>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
              {loading ? (
                <div className="p-4 text-center text-gray-500 text-xs sm:text-sm">
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-500 text-xs sm:text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {notifications.map((notification) => {
                    const CategoryIcon = categoryIcons[notification.category] || Info;
                    
                    return (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${!notification.read ? "bg-blue-100" : "bg-gray-100"}`}>
                            <CategoryIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${typeColors[notification.type]}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 flex-1 leading-tight">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] text-gray-400">
                                {formatTime(notification.createdAt)}
                              </span>
                              <span className="text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                                {notification.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};