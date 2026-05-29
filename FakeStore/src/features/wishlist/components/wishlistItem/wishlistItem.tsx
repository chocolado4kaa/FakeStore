import { Link } from "react-router-dom";
import styles from "./wishlistItem.module.scss";
import { Button } from "@/shared/components/Button/Button";
import { CiTrash } from "react-icons/ci";
import {
  wishlistItemProps,
  ProductLinkProps,
} from "@/features/wishlist/types/WishlistItemProps";
import { Card } from "@/shared/components/Card/Card";

export const WishlistItem = ({
  product,
  onClose,
  toggle,
}: wishlistItemProps) => {
  const ProductLink = ({ children, className = "" }: ProductLinkProps) => (
    <Link to={`/product/${product.id}`} className={className} onClick={onClose}>
      {children}
    </Link>
  );

  return (
    <Card className={styles.item}>
      <Card.Left>
        <Card.Media className={styles.media}>
          <ProductLink>
            <img src={product.thumbnail} alt={product.title} />
          </ProductLink>
        </Card.Media>
        <Card.Body>
          <ProductLink className={styles.title}>{product.title}</ProductLink>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        </Card.Body>
      </Card.Left>
      <Card.Actions>
        <Button
          className={styles.removeBtn}
          onClick={() => toggle(product)}
          aria-label="Remove"
        >
          <CiTrash size={18} />
        </Button>
      </Card.Actions>
    </Card>
  );
};
