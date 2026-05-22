import { Link } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import styles from "./cartItem.module.scss";
import { useCart } from "../../hooks/Usecart";
import { CartProduct } from "../../types/cart";
import { Button } from "@/shared/components/Button/Button";
import { Card } from "@/shared/components/Card/Card";

export const CartItem = ({ product }: { product: CartProduct }) => {
  const { changeQuantity } = useCart();

  return (
    <Card className={styles.item}>
      <Card.Left>
        <Card.Media className={styles.img}>
          <Link to={`/product/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} />
          </Link>
        </Card.Media>
        <Card.Body className={styles.info}>
          <Link to={`/product/${product.id}`} className={styles.title}>
            {product.title}
          </Link>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        </Card.Body>
      </Card.Left>
      <Card.Actions className={styles.controls}>
        <Button
          className={styles.qtyBtn}
          onClick={() => changeQuantity(product.id, product.quantity - 1)}
          disabled={product.quantity <= 1}
        >
          −
        </Button>
        <span className={styles.qty}>{product.quantity}</span>
        <Button
          className={styles.qtyBtn}
          onClick={() => changeQuantity(product.id, product.quantity + 1)}
        >
          +
        </Button>
        <span className={styles.total}>${product.total.toFixed(2)}</span>
        <Button
          className={styles.removeBtn}
          onClick={() => changeQuantity(product.id, 0)}
          aria-label="Remove"
        >
          <CiTrash size={18} />
        </Button>
      </Card.Actions>
    </Card>
  );
};
