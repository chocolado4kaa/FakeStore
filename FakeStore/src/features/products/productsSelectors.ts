import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../api/store";

export const selectCategories = (state: RootState) => state.products.categories;
export const selectCategoriesStatus = (state: RootState) =>
  state.products.categoriesStatus;
export const selectProductsByCategory =
  (category: string) => (state: RootState) =>
    state.products.byCategory[category] ?? [];
export const selectCategoryStatus = (category: string) => (state: RootState) =>
  state.products.categoryStatus[category] ?? "idle";

export const selectSelectedCategory = (state: RootState) =>
  state.products.selectedCategory;
export const selectSort = (state: RootState) => state.products.sort;
export const selectCollectionStatus = (state: RootState) => {
  const cat = state.products.selectedCategory;
  return state.products.categoryStatus[cat] ?? "idle";
};
export const selectSortedProducts = createSelector(
  (state: RootState) => {
    const cat = state.products.selectedCategory;
    return state.products.byCategory[cat] ?? [];
  },
  (state: RootState) => state.products.sort,
  (products, sort) =>
    [...products].sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "title":
          return a.title.localeCompare(b.title);
        case "rating":
        default:
          return b.rating - a.rating;
      }
    }),
);
