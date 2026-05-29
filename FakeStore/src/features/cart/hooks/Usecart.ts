import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import {
  selectCartProducts,
  selectCartCount,
  selectCartTotal,
  selectCartStatus,
  selectAddingProductId,
  selectIsInCart,
} from "../Cartselectors";
import { addToCart, updateQuantity, clearCart } from "../api/cartThunks";
import type { Product } from "@features/products/types/Product";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const products = useSelector(selectCartProducts);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const status = useSelector(selectCartStatus);
  const addingProductId = useSelector(selectAddingProductId);

  const add = (product: Product) => dispatch(addToCart(product));
  const updateQty = (productId: number, quantity: number) =>
    dispatch(updateQuantity({ productId, quantity }));
  const clear = () => dispatch(clearCart());

  return { products, count, total, status, addingProductId, add, updateQty, clear };
};

export const useIsInCart = (productId: number) =>
  useSelector(selectIsInCart(productId));