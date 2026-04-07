import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { addToCart, updateQuantity, clearCart } from "../api/cartThunks";
import type { Product } from "@features/products/types/Product";
import {
  selectCart,
  selectCartProducts,
  selectCartCount,
  selectCartTotal,
  selectCartStatus,
  selectAddingProductId,
  selectIsInCart,
} from "../Cartselectors";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const cart = useSelector(selectCart);
  const products = useSelector(selectCartProducts);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const status = useSelector(selectCartStatus);
  const addingProductId = useSelector(selectAddingProductId);

  const add = (product: Product) => dispatch(addToCart(product));
  const changeQuantity = (productId: number, quantity: number) =>
    dispatch(updateQuantity({ productId, quantity }));
  const clear = () => dispatch(clearCart());

  const isInCart = (productId?: number) => useSelector(selectIsInCart(productId));

  return {
    cart,
    products,
    count,
    total,
    status,
    addingProductId,
    add,
    changeQuantity,
    clear,
    isInCart,
  };
};
