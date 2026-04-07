import { RootState } from "@/api/store";
import { Product } from "@/features/products/types/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Cart } from "../types/cart";
import { cartApi } from "./cartApi";

export const fetchCart = createAsyncThunk<Cart | null, number>(
  "cart/fetch",
  async (userId) => {
    const { data } = await cartApi.getByUserId(userId);
    console.log("Fetched cart data:", data);
    return data.carts[0] ?? null;
  },
);

export const addToCart = createAsyncThunk<Cart, Product, { state: RootState }>(
  "cart/add",
  async (product, { getState }) => {
    const { cart, auth } = getState();
    const userId = auth.user?.id ?? 1;
    const cartId = cart.data?.id;

    if (cartId) {
      const { data } = await cartApi.update(cartId, {
        products: [{ id: product.id, quantity: 1 }],
      });
      return data;
    } else {
      const { data } = await cartApi.create({
        userId,
        products: [{ id: product.id, quantity: 1 }],
      });
      return data;
    }
  },
);

export const updateQuantity = createAsyncThunk<
  Cart,
  { productId: number; quantity: number },
  { state: RootState }
>("cart/updateQuantity", async ({ productId, quantity }, { getState }) => {
  const { cart } = getState();
  const cartId = cart.data?.id;
  if (!cartId) throw new Error("No cart");

  const { data } = await cartApi.update(cartId, {
    products: [{ id: productId, quantity }],
  });
  return data;
});

export const clearCart = createAsyncThunk<void, void, { state: RootState }>(
  "cart/clear",
  async (_, { getState }) => {
    const { cart } = getState();
    const cartId = cart.data?.id;
    if (cartId) await cartApi.delete(cartId);
  },
);
