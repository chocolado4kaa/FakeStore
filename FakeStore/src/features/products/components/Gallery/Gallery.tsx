import { WishlistButton } from "@/features/wishlist/components/wishlistButton/wishlistButton";
import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import styles from "./gallery.module.scss";
import { Button } from "@/shared/components/Button/Button";

export const Gallery = ({ product }: { product: Product }) => {
  const [activeImg, setActiveImg] = useState(0);

  const discountedPrice = product.discountPercentage > 0;

  useEffect(() => {
    setActiveImg(0);
  }, [product?.id]);

  const ProductThumbs = product.images.length > 1 && (
    <div className={styles.thumbs}>
      {product.images.map((img, i) => (
        <Button
          key={i}
          className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ""}`}
          onClick={() => setActiveImg(i)}
        >
          <img src={img} alt={`${product.title} ${i + 1}`} />
        </Button>
      ))}
    </div>
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImg}>
        <img
          src={product.images[activeImg] ?? product.thumbnail}
          alt={product.title}
        />
        <div className={styles.wishlistBtn}>
          <WishlistButton product={product} />
        </div>
        {discountedPrice && (
          <span className={styles.discountBadge}>
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>
      {ProductThumbs}
    </div>
  );
};
