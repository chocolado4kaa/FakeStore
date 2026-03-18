import { Product } from "@/features/products/types/Product";

export interface wishlistState {
  items: Product[];
  isWishlistOpen: boolean;
}