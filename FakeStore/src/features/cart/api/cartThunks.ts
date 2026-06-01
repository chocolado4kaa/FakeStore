import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchCart = createAsyncThunk<Cart | null, number | void>(
  "cart/fetch",
  async () => {
    return loadFromStorage();
  }
);

export const addToCart = createAsyncThunk<Cart, Product, { state: RootState }>(
  "cart/add",
  async (product, { getState }) => {
    const { cart } = getState();
    let currentCart = cart.data ?? loadFromStorage();

    const existingProducts = currentCart?.products ?? [];
    const exists = existingProducts.find((p) => p.id === product.id);

    const updatedProducts = exists
      ? existingProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      : [
          ...existingProducts,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            total: product.price,
            discountPercentage: product.discountPercentage ?? 0,
            discountedTotal: product.price,
            thumbnail: product.thumbnail,
          } as CartProduct,
        ];

    const newCart: Cart = {
      id: currentCart?.id ?? 999999, // фейковий id
      userId: currentCart?.userId ?? 1,
      products: updatedProducts,
      totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
      totalProducts: updatedProducts.length,
      total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      discountedTotal: updatedProducts.reduce(
        (acc, p) => acc + (p.discountedTotal ?? p.price * p.quantity),
        0
      ),
    };

    saveToStorage(newCart);
    return newCart;
  }
);

export const updateQuantity = createAsyncThunk<
  Cart,
  { productId: number; quantity: number },
  { state: RootState }
>(
  "cart/updateQuantity",
  async ({ productId, quantity }, { getState }) => {
    const { cart } = getState();
    let currentCart = cart.data ?? loadFromStorage();

    if (!currentCart) throw new Error("Cart not found");

    const updatedProducts =
      quantity <= 0
        ? currentCart.products.filter((p) => p.id !== productId)
        : currentCart.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  quantity,
                  total: p.price * quantity,
                  discountedTotal: p.price * quantity,
                }
              : p
          );

    const newCart: Cart = {
      ...currentCart,
      products: updatedProducts,
      totalQuantity: updatedProducts.reduce((acc, p) => acc + p.quantity, 0),
      totalProducts: updatedProducts.length,
      total: updatedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
      discountedTotal: updatedProducts.reduce(
        (acc, p) => acc + (p.discountedTotal ?? p.price * p.quantity),
        0
      ),
    };

    saveToStorage(newCart);
    return newCart;
  }
);

export const clearCart = createAsyncThunk<void, void, { state: RootState }>(
  "cart/clear",
  async () => {
    saveToStorage(null);
  }
);