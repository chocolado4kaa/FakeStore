import { Link } from "react-router-dom";
import styles from "./productCard.module.scss";
import type { Product } from "../../types/Product";
import { WishlistButton } from "@/features/wishlist/components/wishlistButton/wishlistButton";

export const ProductCard = ({ product }: { product: Product }) => {
  const discounted = product.discountPercentage > 0;
  const originalPrice =
    discounted ?
      (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.img}
          loading="lazy"
        />
        {discounted && (
          <span className={styles.discount}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <WishlistButton product={product} />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {originalPrice && (
            <span className={styles.originalPrice}>${originalPrice}</span>
          )}
        </div>
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingValue}>
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};
