import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectProductsByCategory,
  selectCategoryStatus,
} from "../../productsSelectors";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./Categoryrow.module.scss";
import { fetchProductsByCategory } from "../../api/productsThunks";
import type { Category } from "../../types/Category";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "@shared/components/Button/Button";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { ProductCardSkeleton } from "@shared/components/Skeleton/Skeleton";

interface CategoryRowProps {
  category: Category;
}

export const CategoryRow = ({ category }: CategoryRowProps) => {
  const dispatch = useAppDispatch();
  const products = useSelector(selectProductsByCategory(category.slug));
  const status = useSelector(selectCategoryStatus(category.slug));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductsByCategory(category.slug));
    }
  }, [category.slug]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 600 : -600,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>{category.name}</h2>
        </div>
        <Link to={`/collections/${category.slug}`} className={styles.viewAll}>
          View all <CiPlay1 size={16} />
        </Link>
      </div>
      <div className={styles.rowWrap}>
        <Button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </Button>
        <div className={styles.row} ref={scrollRef}>
          {status === "loading" &&
            Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          {status === "succeeded" &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          ›
        </Button>
      </div>
    </section>
  );
};
