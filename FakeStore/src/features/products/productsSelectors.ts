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
