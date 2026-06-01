import { Link, useNavigate } from "react-router-dom";
import styles from "./cartPage.module.scss";
import { CartItem } from "@/features/cart/components/CartItem/CartItem";
import { useCart } from "@/features/cart/hooks/Usecart";
import { CiTrash, CiShoppingCart } from "react-icons/ci";
import { Title } from "@/shared/components/Title/Title";
import { Button } from "@/shared/components/Button/Button";
import { fetchMe } from "@/features/auth/api/authThunks";
import { selectIsLoggedIn, selectUser } from "@/features/auth/authSelectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";

export const CartPage = () => {
  const { products, count, total, clear } = useCart();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const handleLogin = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!user) dispatch(fetchMe());
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Title
          actions={
            <Button className={styles.clearBtn} onClick={clear}>
              <CiTrash size={16} />
              Clear Cart
            </Button>
          }
        >
          Cart
          <span className={styles.count}>{count}</span>
        </Title>
        {!isLoggedIn || !user ?
          <div className={styles.empty}>
            <CiShoppingCart size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Please login to see your cart</h2>
            <Button onClick={handleLogin} className={styles.emptyBtn}>
              Login
            </Button>
          </div>
        : count === 0 ?
          <div className={styles.empty}>
            <CiShoppingCart size={64} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptySub}>Add something nice to your cart.</p>
            <Link to="/" className={styles.emptyBtn}>
              Browse products
            </Link>
          </div>
        : count > 0 && (
            <div className={styles.content}>
              <div className={styles.items}>
                {products.map((product) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </div>
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Items ({count})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={styles.free}>Free</span>
                </div>
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className={styles.checkoutBtn}>
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};
