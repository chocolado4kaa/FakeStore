import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, updateQuantity, clearCart, loadFromStorage } from "./cartThunks";
import type { CartState } from "../types/cartState";

const initialState: CartState = {
  data: loadFromStorage(),
  status: "idle",
  addingProductId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToCart.pending, (state, action) => {
        state.addingProductId = action.meta.arg.id;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.addingProductId = null;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addingProductId = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.data = null;
      });
  },
});

export default cartSlice.reducer;