import { Link } from "react-router-dom";
import styles from "./wishlistItem.module.scss";
import { Button } from "@/shared/components/Button/Button";
import { CiTrash } from "react-icons/ci";
import { wishlistItemProps, ProductLinkProps } from "@/types/WishlistItemProps";

export const WishlistItem = ({
  product,
  onClose,
  toggle,
}: wishlistItemProps) => {
  const ProductLink = ({ children, className }: ProductLinkProps) => (
    <Link to={`/product/${product.id}`} className={className} onClick={onClose}>
      {children}
    </Link>
  );

  return (
    <div key={product.id} className={styles.item}>
      <ProductLink className={styles.itemImg}>
        <img src={product.thumbnail} alt={product.title} />
      </ProductLink>
      <div className={styles.itemInfo}>
        <ProductLink className={styles.itemTitle}>{product.title}</ProductLink>
        <span className={styles.itemPrice}>${product.price.toFixed(2)}</span>
      </div>
      <Button
        className={styles.removeBtn}
        onClick={() => toggle(product)}
        aria-label="Remove"
      >
        <CiTrash size={18} />
      </Button>
    </div>
  );
};
