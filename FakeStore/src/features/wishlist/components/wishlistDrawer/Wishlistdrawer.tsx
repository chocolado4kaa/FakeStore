import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useWishlist } from "../../hooks/useWishlist";
import { Drawer } from "@shared/components/Drawer/Drawer";
import { DrawerHeader } from "@/shared/components/Drawer/DrawerHeader";
import { selectIsWishlistOpen } from "../../wishlistSelectors";
import { closeWishlist } from "../../api/wishlistSlice";
import { CiHeart, CiTrash } from "react-icons/ci";
import styles from "./WishlistDrawer.module.scss";
import { Button } from "@/shared/components/Button/Button";
import { WishlistItem } from "../wishlistItem/wishlistItem";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/features/auth/authSelectors";
import { addToCart } from "@/features/cart/api/cartThunks";

export const WishlistDrawer = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const isOpen = useSelector(selectIsWishlistOpen);
  const { items, count, toggle, clear } = useWishlist();

  const handleClose = () => dispatch(closeWishlist());

  const handleAddAllToCart = async () => {
    if (!user) {
      navigate("/login");
      handleClose();
      return;
    }

    if (items.length === 0) return;

    try {
      for (const product of items) {
        await dispatch(addToCart(product));
      }

      alert(`✅ Successfully added ${count} items to your cart!`);
      navigate("/cart");
      handleClose();
    } catch (error) {
      console.error("Error adding items to cart:", error);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} side="right">
      <DrawerHeader
        onClose={handleClose}
        actions={
          count > 0 ?
            <>
              <Button
                className={styles.clearBtn}
                onClick={clear}
                aria-label="Clear all"
              >
                <CiTrash size={18} />
              </Button>
            </>
          : null
        }
      >
        <CiHeart size={22} />
        <h2 className={styles.title}>Wishlist</h2>
        {count > 0 && <span className={styles.count}>{count}</span>}
      </DrawerHeader>

      {count > 0 ?
        <>
          <div className={styles.items}>
            {items.map((product) => (
              <WishlistItem
                key={product.id}
                product={product}
                onClose={handleClose}
                toggle={toggle}
              />
            ))}
          </div>
          <Button onClick={handleAddAllToCart} className={styles.addAllBtn}>
            Add All to Cart
          </Button>
        </>
      : <div className={styles.empty}>
          <CiHeart size={52} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Your wishlist is empty</p>
          <p className={styles.emptySub}>Add items you love ♥</p>
        </div>
      }
    </Drawer>
  );
};
