import { create } from "zustand";
import { createOrder, fetchOrders, fetchProductsSafe } from "../../../api/orders";

function attachProductImages(orders, products) {
  if (!products || !products.length) return orders;
  const byId = new Map(products.map((p) => [String(p.id), p]));
  return orders.map((o) => ({
    ...o,
    items: (o.items || []).map((item) => {
      const product = byId.get(String(item.productId || item.id || ""));
      const productImg = product?.imageUrl || product?.image;
      return {
        ...item,
        imageUrl: item.imageUrl || productImg || item.image,
        image: item.image || productImg || item.imageUrl,
      };
    }),
  }));
}

export const useOrderStore = create((set, get) => ({
  orders: [],

  fetchOrders: async () => {
    try {
      const [orders, products] = await Promise.all([
        fetchOrders(),
        fetchProductsSafe(),
      ]);
      set({ orders: attachProductImages(orders, products) });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  },

  addOrder: async (newOrder) => {
    try {
      const createdOrder = await createOrder(newOrder);
      set((state) => ({
        orders: [createdOrder, ...state.orders],
      }));
      return createdOrder;
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  },
}));