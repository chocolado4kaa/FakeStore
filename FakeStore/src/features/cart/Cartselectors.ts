import { RootState } from "@/api/store";

export const selectCart = (state: RootState) => state.cart.data;
export const selectCartProducts = (state: RootState) => state.cart.data?.products ?? [];
export const selectCartCount = (state: RootState) => state.cart.data?.totalQuantity ?? 0;
export const selectCartTotal = (state: RootState) => state.cart.data?.total ?? 0;
export const selectCartStatus = (state: RootState) => state.cart.status;
export const selectAddingProductId = (state: RootState) => state.cart.addingProductId;
export const selectIsInCart = (productId?: number) => (state: RootState) =>
  state.cart.data?.products.some((p) => p.id === productId) ?? false;