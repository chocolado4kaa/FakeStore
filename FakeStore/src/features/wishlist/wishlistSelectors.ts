import { RootState } from "@/api/store";

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) =>
  state.wishlist.items.length;
export const selectIsInWishlist = (id: number) => (state: RootState) =>
  state.wishlist.items.some((p) => p.id === id);
export const selectIsWishlistOpen = (state: RootState) =>
  state.wishlist.isWishlistOpen;
