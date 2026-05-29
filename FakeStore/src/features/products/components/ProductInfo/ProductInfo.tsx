import { IoStarSharp } from "react-icons/io5";
import { Product } from "../../types/Product";
import styles from "./productinfo.module.scss";

export const ProductInfo = ({ product }: { product: Product }) => {
  const discountedPrice = product.discountPercentage > 0;
  const originalPrice =
    discountedPrice ?
      (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const stockStatus =
    product.stock <= 5 ? "low"
    : product.stock <= 20 ? "medium"
    : "high";

  return (
    <>
      <span className={styles.category}>{product.category}</span>
      <h1 className={styles.title}>{product.title}</h1>
      {product.brand && (
        <span className={styles.brand}>by {product.brand}</span>
      )}
      <div className={styles.row}>
        <div className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStarSharp
              key={i}
              size={14}
              className={
                i < Math.round(product.rating) ?
                  styles.starFilled
                : styles.starEmpty
              }
            />
          ))}
        </div>
        <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
        <span className={styles.reviewCount}>
          ({product.reviews.length} reviews)
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
        {originalPrice && (
          <span className={styles.originalPrice}>${originalPrice}</span>
        )}
      </div>
      <p className={styles.description}>{product.description}</p>
      <div
        className={`${styles.stockRow} ${styles.row} ${styles[`stock_${stockStatus}`]}`}
      >
        <span className={styles.stockText}>
          {product.availabilityStatus} — {product.stock} left
        </span>
      </div>
    </>
  );
};
