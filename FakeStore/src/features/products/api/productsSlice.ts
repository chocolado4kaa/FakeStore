import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories, fetchProductsByCategory } from "./productsThunks";
import { ProductsState, SortOption } from "../types/ProductsState";

const initialState: ProductsState = {
  categories: [],
  byCategory: {},
  selectedCategory: "",
  sort: "rating",
  categoriesStatus: "idle",
  categoryStatus: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      const cat = action.payload;
      state.selectedCategory = cat;     
      delete state.byCategory[cat];
      delete state.categoryStatus[cat];
    },
    setSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload;
    },
  },
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
        const {category} = action.meta.arg;
        state.categoryStatus[category] = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { category, products } = action.payload;
        state.byCategory[category] = products;
        state.categoryStatus[category] = "succeeded";
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const {category} = action.meta.arg;
        state.categoryStatus[category] = "failed";
      });
  },
});


export const { setCategory, setSort } = productsSlice.actions;
export default productsSlice.reducer;
