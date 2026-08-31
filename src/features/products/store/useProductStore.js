import { create } from "zustand";

const API_BASE_URL = "/api";
const POLL_INTERVAL = 30000; // 30 seconds
const FOCUS_REFRESH_DELAY = 1000; // 1 second after tab focus

export const useProductStore = create((set, get) => ({
  products: [],
  searchQuery: "",
  selectedCategory: "All",
  loading: false,
  lastFetch: 0,
  error: null,
  pollIntervalId: null,
  isPolling: false,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch products: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      // Map MongoDB _id to id for the frontend and ensure category exists
      const mappedProducts = data.map(p => ({ 
        ...p, 
        id: p.id,
        category: p.category || 'Accessories',
        imageUrl: p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `https://shopmodern-backend.onrender.com${p.imageUrl}`) : p.imageUrl
      }));
      
      set({ 
        products: mappedProducts,
        loading: false,
        lastFetch: Date.now(),
        error: null
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ loading: false, products: [], error: error.message });
    }
  },

  silentFetchProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error(`Silent fetch failed: ${response.status}`);
        return; // Don't update state on error, keep existing products
      }
      
      const data = await response.json();
      
      // Map MongoDB _id to id for the frontend and ensure category exists
      const mappedProducts = data.map(p => ({ 
        ...p, 
        id: p.id,
        category: p.category || 'Accessories',
        imageUrl: p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `https://shopmodern-backend.onrender.com${p.imageUrl}`) : p.imageUrl
      }));
      
      set({ 
        products: mappedProducts,
        lastFetch: Date.now(),
        error: null
      });
    } catch (error) {
      console.error("Failed to silently fetch products:", error);
      // Don't set error state or clear products on silent fetch failure
    }
  },

  startPolling: () => {
    const state = get();
    if (state.isPolling) return;
    
    set({ isPolling: true });
    
    // Set up polling interval with silent fetch
    const intervalId = setInterval(() => {
      const currentState = get();
      currentState.silentFetchProducts();
    }, POLL_INTERVAL);
    
    set({ pollIntervalId: intervalId });
  },

  stopPolling: () => {
    const state = get();
    if (state.pollIntervalId) {
      clearInterval(state.pollIntervalId);
      set({ pollIntervalId: null, isPolling: false });
    }
  },

  refreshOnFocus: () => {
    const state = get();
    setTimeout(() => {
      const currentState = get();
      currentState.silentFetchProducts();
    }, FOCUS_REFRESH_DELAY);
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearFilters: () => set({ searchQuery: "", selectedCategory: "All" }),
}));
