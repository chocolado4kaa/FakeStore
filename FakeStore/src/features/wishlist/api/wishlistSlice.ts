import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/features/products/types/Product";

const loadFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: Product[]) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};

interface wishlistState {
  items: Product[];
  isWishlistOpen: boolean;
}

const initialState: wishlistState = {
  items: loadFromStorage(),
  isWishlistOpen: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.some((p) => p.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((p) => p.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveToStorage(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
    openWishlist(state) {
      state.isWishlistOpen = true;
    },
    closeWishlist(state) {
      state.isWishlistOpen = false;
    },
    toggleWishlistDrawer(state) {
      state.isWishlistOpen = !state.isWishlistOpen;
    },
  },
});

export const {
  toggleWishlist,
  clearWishlist,
  openWishlist,
  closeWishlist,
  toggleWishlistDrawer,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
