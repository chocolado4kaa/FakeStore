import axiosInstance from "@api/axiosInstance";
import type { Product } from "../types/Product";
import type { Category } from "../types/Category";
import { ProductsResponse } from "../types/ProductsResponse";

export const productsApi = {
  getAll: (limit = 10, skip = 0, sortBy = "id", order = "asc") =>
    axiosInstance.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    ),

  getByCategory: (category: string, limit = 10, skip = 0, sortBy = "id", order = "asc") =>
    axiosInstance.get<ProductsResponse>(
      `/products/category/${category}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    ),

  getById: (id: number) =>
    axiosInstance.get<Product>(`/products/${id}`),

  search: (q: string) =>
    axiosInstance.get<ProductsResponse>(`/products/search?q=${q}`),

  getCategories: () =>
    axiosInstance.get<Category[]>("/products/categories"),
};