import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";
import type { SortOption } from "../types/ProductsState";
import { productsApi } from "./productsApi";
import { FetchProductsArgs } from "../types/FetchProductsArgs";

export const fetchCategories = createAsyncThunk<Category[]>(
  "products/fetchCategories",
  async () => {
    const { data } = await productsApi.getCategories();
    return data;
  },
);

const getSortParams = (
  sort: SortOption,
): { sortBy: string; order: "asc" | "desc" } => {
  switch (sort) {
    case "default":
      return { sortBy: "id", order: "asc" };
    case "price_asc":
      return { sortBy: "price", order: "asc" };
    case "price_desc":
      return { sortBy: "price", order: "desc" };
    case "title":
      return { sortBy: "title", order: "asc" };
    case "rating":
      return { sortBy: "rating", order: "desc" };
    default:
      return { sortBy: "rating", order: "desc" };
  }
};

export const fetchProductsByCategory = createAsyncThunk<
  { category: string; products: Product[] },
  FetchProductsArgs
>(
  "products/fetchByCategory",
  async ({ category, limit = 100, sort = "default" }) => {
    const { sortBy, order } = getSortParams(sort);

    const { data } = await (category === "" ?
      productsApi.getAll(limit, 0, sortBy, order)
    : productsApi.getByCategory(category, limit, 0, sortBy, order));

    return { category, products: data.products };
  },
);
