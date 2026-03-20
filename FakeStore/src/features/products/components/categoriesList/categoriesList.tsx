import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import {
  selectCategories,
  selectCategoriesStatus,
  selectSelectedCategory,
  selectCollectionStatus,
  selectSort,
} from "@features/products/productsSelectors";
import styles from "./CategoriesList.module.scss";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../api/productsThunks";
import { setCategory } from "../../api/productsSlice";
import { Button } from "@/shared/components/Button/Button";

export const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const { category: categoryParam } = useParams<{ category?: string }>();

  const categories = useSelector(selectCategories);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const selectedCategory = useSelector(selectSelectedCategory);
  const collectionStatus = useSelector(selectCollectionStatus);
  const sort = useSelector(selectSort);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, []);

  useEffect(() => {
    dispatch(setCategory(categoryParam ?? ""));
  }, [categoryParam]);

  useEffect(() => {
    if (collectionStatus === "idle") {
      dispatch(
        fetchProductsByCategory({
          category: selectedCategory,
          limit: 100,
          sort,
        }),
      );
    }
  }, [selectedCategory, collectionStatus]);

  return (
    <aside className={styles.sidebar}>
      <span className={styles.title}>Categories</span>
      <Button
        className={`${styles.item} ${selectedCategory === "" ? styles.itemActive : ""}`}
        onClick={() => dispatch(setCategory(""))}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.slug}
          className={`${styles.item} ${selectedCategory === cat.slug ? styles.itemActive : ""}`}
          onClick={() => dispatch(setCategory(cat.slug))}
        >
          {cat.name}
        </Button>
      ))}
    </aside>
  );
};
