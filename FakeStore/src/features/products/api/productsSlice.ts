import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchProductsByCategory } from "./productsThunks";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";

interface ProductsState {
  categories: Category[];
  byCategory: Record<string, Product[]>;
  categoriesStatus: "idle" | "loading" | "succeeded" | "failed";
  categoryStatus: Record<string, "idle" | "loading" | "succeeded" | "failed">;
}

const initialState: ProductsState = {
  categories: [],
  byCategory: {},
  categoriesStatus: "idle",
  categoryStatus: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      })
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const category = action.meta.arg;
        state.categoryStatus[category] = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, products } = action.payload;
        state.byCategory[category] = products;
        state.categoryStatus[category] = "succeeded";
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        state.categoryStatus[category] = "failed";
      });
  },
});

export default productsSlice.reducer;