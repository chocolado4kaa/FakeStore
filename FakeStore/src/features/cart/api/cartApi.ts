import axiosInstance from "@api/axiosInstance";
import { Cart } from "../types/cart";
import { AddToCartPayload, UpdateCartPayload } from "../types/cartPayload";

export const cartApi = {
  getByUserId: (userId: number) =>
    axiosInstance.get<{ carts: Cart[] }>(`/carts/user/${userId}`),

  create: (payload: AddToCartPayload) =>
    axiosInstance.post<Cart>("/carts/add", payload),

  update: (cartId: number, payload: UpdateCartPayload) =>
    axiosInstance.put<Cart>(`/carts/${cartId}`, {
      merge: true,
      ...payload,
    }),

  delete: (cartId: number) =>
    axiosInstance.delete<Cart>(`/carts/${cartId}`),
};