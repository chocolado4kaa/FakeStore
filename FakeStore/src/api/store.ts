import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/api/authSlice";
import productsReducer from "../features/products/api/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;