import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import {
  selectWishlistItems,
  selectWishlistCount,
  selectIsInWishlist,
} from "../wishlistSelectors";
import { Product } from "@/features/products/types/Product";
import {
  toggleWishlist,
  clearWishlist,
  toggleWishlistDrawer,
} from "../api/wishlistSlice";

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const items = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);

  const toggle = (product: Product) => dispatch(toggleWishlist(product));
  const clear = () => dispatch(clearWishlist());
  const searchItem = (id: number) => useSelector(selectIsInWishlist(id));

  const toggleDrawer = () => dispatch(toggleWishlistDrawer());

  return { items, count, toggle, clear, searchItem, toggleDrawer };
};
