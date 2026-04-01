import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { fetchProductById } from "@features/products/api/productsThunks";
import {
  selectSelectedProduct,
  selectSelectedProductStatus,
} from "@features/products/productsSelectors";
import styles from "./productpage.module.scss";
import { ReviewCard } from "@/shared/components/ReviewCard/Reviewcard";
import { Gallery } from "@/features/products/components/Gallery/Gallery";
import { ProductInfo } from "@/features/products/components/ProductInfo/ProductInfo";
import { MetaInfo } from "@/features/products/components/ProductInfo/Meta";
import { Button } from "@/shared/components/Button/Button";
import { Title } from "@/shared/components/Title/Title";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectSelectedProductStatus);

  useEffect(() => {
    if (id) dispatch(fetchProductById(Number(id)));
  }, [id]);

  if (status === "loading")
    return (
      <div className={styles.loading}>
        <span className={styles.spinner} />
      </div>
    );
  if (status === "failed" || !product)
    return (
      <div className={styles.error}>
        <p>Product not found</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    );

  const ProductTags = product.tags.length > 0 && (
    <div className={styles.tags}>
      {product.tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Gallery product={product} />
          <div className={styles.info}>
            <ProductInfo product={product} />
            <Button className={styles.addToCart}>Add to Cart</Button>
            <MetaInfo product={product} />
            {ProductTags}
          </div>
        </div>
        <section className={styles.reviews}>
          <Title className={styles.reviewsTitle}>
            Reviews
            <span className={styles.count}>{product.reviews.length}</span>
          </Title>
          <div className={styles.reviewsList}>
            {product.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
