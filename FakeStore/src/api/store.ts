import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/api/authSlice";
import productsReducer from "@features/products/api/productsSlice";
import wishlistReducer from "@features/wishlist/api/wishlistSlice";
import cartReducer from "@/features/cart/api/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
