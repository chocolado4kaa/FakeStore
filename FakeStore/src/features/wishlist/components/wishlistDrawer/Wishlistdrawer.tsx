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

export const WishlistDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsWishlistOpen);
  const { items, count, toggle, clear } = useWishlist();

  const handleClose = () => dispatch(closeWishlist());

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} side="right">
      <DrawerHeader
        onClose={handleClose}
        actions={
          count > 0 ?
            <Button
              className={styles.clearBtn}
              onClick={clear}
              aria-label="Clear all"
            >
              <CiTrash size={18} />
            </Button>
          : null
        }
      >
        <CiHeart size={22} />
        <h2 className={styles.title}>Wishlist</h2>
        {count > 0 && <span className={styles.count}>{count}</span>}
      </DrawerHeader>

      {count > 0 ?
        <div className={styles.items}>
          {items.map((product) => (
            <WishlistItem
              product={product}
              onClose={handleClose}
              toggle={toggle}
            />
          ))}
        </div>
      : <div className={styles.empty}>
          <CiHeart size={52} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Your wishlist is empty</p>
          <p className={styles.emptySub}>Add items you love ♥</p>
        </div>
      }
    </Drawer>
  );
};
