import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import {
  selectCategories,
  selectCategoriesStatus,
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
  const navigate = useNavigate();
  const { category: categoryParam } = useParams<{ category?: string }>();

  const categories = useSelector(selectCategories);
  const categoriesStatus = useSelector(selectCategoriesStatus);
  const collectionStatus = useSelector(selectCollectionStatus);
  const sort = useSelector(selectSort);

  const handleCategoryClick = (slug: string) => {
    navigate(slug === "" ? "/collections" : `/collections/${slug}`);
  };

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
          category: categoryParam ?? "",
          limit: 100,
          sort,
        }),
      );
    }
  }, [categoryParam, collectionStatus]);

  return (
    <aside className={styles.sidebar}>
      <span className={styles.title}>Categories</span>
      <Button
        className={`${styles.item} ${categoryParam === "" ? styles.itemActive : ""}`}
        onClick={() => handleCategoryClick("")}
      >
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.slug}
          className={`${styles.item} ${categoryParam === cat.slug ? styles.itemActive : ""}`}
          onClick={() => handleCategoryClick(cat.slug)}
        >
          {cat.name}
        </Button>
      ))}
    </aside>
  );
};
