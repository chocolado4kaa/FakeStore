import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import styles from "./CollectionsPage.module.scss";
import { setSort } from "@/features/products/api/productsSlice";
import { CategoriesList } from "@/features/products/components/categoriesList/categoriesList";
import { ProductCard } from "@/features/products/components/ProductCard/ProductCard";
import {
  selectSort,
  selectSelectedCategory,
  selectProductsByCategory,
  selectCollectionStatus,
} from "@/features/products/productsSelectors";
import { SortOption } from "@/features/products/types/ProductsState";
import { ProductCardSkeleton } from "@/shared/components/Skeleton/Skeleton";
import { Button } from "@/shared/components/Button/Button";

export const CollectionsPage = () => {
  const dispatch = useAppDispatch();

  const sort = useSelector(selectSort);
  const selectedCategory = useSelector(selectSelectedCategory);
  const products = useSelector(selectProductsByCategory(selectedCategory));
  const collectionStatus = useSelector(selectCollectionStatus);

  const isLoading = collectionStatus === "loading";

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: "default" },
    { value: "rating", label: "Top Rated" },
    { value: "price_asc", label: "Price ↑" },
    { value: "price_desc", label: "Price ↓" },
    { value: "title", label: "Name A–Z" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <CategoriesList />
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <span className={styles.resultsCount}>
              {!isLoading && `${products.length} products`}
            </span>
            <div className={styles.sortWrap}>
              {SORT_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  className={`sortBtn ${sort === opt.value ? "sortBtnActive" : ""}`}
                  onClick={() => dispatch(setSort(opt.value))}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {isLoading &&
              Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            {!isLoading &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
