import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";
import { productsApi } from "./productsApi";


export const fetchCategories = createAsyncThunk<Category[]>(
  "products/fetchCategories",
  async () => {
    const { data } = await productsApi.getCategories();
    return data;
  }
);

export const fetchProductsByCategory = createAsyncThunk<
  { category: string; products: Product[] },
  { category: string; limit?: number } 
>(
  "products/fetchByCategory",
  async ({ category, limit = 10 }) => {
    const { data } = await productsApi.getByCategory(category, limit, 0);
    return { category, products: data.products };
  }
);
