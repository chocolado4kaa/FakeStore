import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";
import { RootState } from "@/api/store";
import { Product } from "@/features/products/types/Product";
import { Cart, CartProduct } from "../types/cart";


const CART_KEY = "cart";

const saveToStorage = (cart: Cart | null) => {
  if (cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } else {
    localStorage.removeItem(CART_KEY);
  }
};

export const loadFromStorage = (): Cart | null => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const fetchCart = createAsyncThunk<Cart | null, number>(
  "cart/fetch",
  async (userId) => {
    const { data } = await cartApi.getByUserId(userId);
    const cart = data.carts[0] ?? null;
    saveToStorage(cart);
    return cart;
  },
);

export const addToCart = createAsyncThunk<Cart, Product, { state: RootState }>(
  "cart/add",
  async (product, { getState }) => {
    const { cart, auth } = getState();
    const userId = auth.user?.id ?? 1;
    const cartId = cart.data?.id;
    const existingProducts = cart.data?.products ?? [];

    const exists = existingProducts.find((p) => p.id === product.id);
    const updatedProducts = exists
      ? existingProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      : [...existingProducts, { id: product.id, quantity: 1 }];

    let result: Cart;

    if (cartId) {
      const { data } = await cartApi.update(cartId, {
        products: updatedProducts.map((p) => ({ id: p.id, quantity: p.quantity })),
      });
      result = data;
    } else {
      const { data } = await cartApi.create({
        userId,
        products: updatedProducts.map((p) => ({ id: p.id, quantity: p.quantity })),
      });
      result = data;
    }

    const mergedProducts: CartProduct[] = updatedProducts.map((p) => {
      const fromApi = result.products.find((ap) => ap.id === p.id);
      const existing = existingProducts.find((ep) => ep.id === p.id);
      return fromApi ?? existing ?? {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: p.quantity,
        total: product.price * p.quantity,
        discountPercentage: product.discountPercentage,
        discountedTotal: product.price * p.quantity,
        thumbnail: product.thumbnail,
      };
    });

    const merged: Cart = {
      ...result,
      products: mergedProducts,
      totalQuantity: mergedProducts.reduce((acc, p) => acc + p.quantity, 0),
      totalProducts: mergedProducts.length,
      total: mergedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      discountedTotal: mergedProducts.reduce((acc, p) => acc + p.discountedTotal, 0),
    };

    saveToStorage(merged);
    return merged;
  },
);

export const updateQuantity = createAsyncThunk<
  Cart,
  { productId: number; quantity: number },
  { state: RootState }
>(
  "cart/updateQuantity",
  async ({ productId, quantity }, { getState }) => {
    const { cart } = getState();
    if (!cart.data) throw new Error("No cart");

    const updatedProducts = quantity <= 0
      ? cart.data.products.filter((p) => p.id !== productId)
      : cart.data.products.map((p) =>
          p.id === productId
            ? { ...p, quantity, total: p.price * quantity, discountedTotal: p.price * quantity }
            : p
        );

    const updated: Cart = {
      ...cart.data,
      products: updatedProducts,
      totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
      totalProducts: updatedProducts.length,
      total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      discountedTotal: updatedProducts.reduce((acc, p) => acc + p.discountedTotal, 0),
    };

    saveToStorage(updated);
    return updated;
  },
);

export const clearCart = createAsyncThunk<void, void, { state: RootState }>(
  "cart/clear",
  async (_, { getState }) => {
    const { cart } = getState();
    if (cart.data?.id) {
      await cartApi.delete(cart.data.id);
    }
    saveToStorage(null);
  },
);