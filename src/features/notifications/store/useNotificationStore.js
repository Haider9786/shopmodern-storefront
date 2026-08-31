import { create } from "zustand";
import { 
  fetchNotifications, 
  fetchUnreadCount, 
  markNotificationRead, 
  markAllNotificationsRead 
} from "../../../api/notifications";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async (customerEmail) => {
    if (!customerEmail) return;
    
    set({ loading: true, error: null });
    try {
      const notifications = await fetchNotifications(customerEmail);
      set({ notifications, loading: false });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchUnreadCount: async (customerEmail) => {
    if (!customerEmail) return;
    
    try {
      const { count } = await fetchUnreadCount(customerEmail);
      set({ unreadCount: count });
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  markAsRead: async (id) => {
    try {
      const updatedNotification = await markNotificationRead(id, true);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? updatedNotification : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  },

  markAllAsRead: async (customerEmail) => {
    if (!customerEmail) return;
    
    try {
      await markAllNotificationsRead(customerEmail);
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  },

  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));