import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesStatus,
} from "@features/products/productsSelectors";
import styles from "./HomePage.module.scss";
import { fetchCategories } from "@features/products/api/productsThunks";
import { CategoryRow } from "@features/products/components/caterogyRow/CategoryRow";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { CategoryRowSkeleton } from "@shared/components/Skeleton/Skeleton";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoriesStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, []);

  const FEATURED_SLUGS = [
    "smartphones",
    "mobile-accessories",
    "groceries",
    "sports-accessories",
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            FIND YOUR
            <br />
            <span className={styles.heroAccent}>STYLE.</span>
          </h1>
          <p className={styles.heroSub}>
            Premium products curated for those who know what they want.
          </p>
        </div>
      </section>
      <div className={styles.categories}>
        {status === "loading" &&
          Array.from({ length: 3 }).map((_, i) => (
            <CategoryRowSkeleton key={i} />
          ))}
        {status === "succeeded" &&
          categories
            .filter((category) => FEATURED_SLUGS.includes(category.slug))
            .sort(
              (a, b) =>
                FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug),
            )
            .map((category) => (
              <CategoryRow key={category.slug} category={category} />
            ))}
      </div>
    </div>
  );
};
