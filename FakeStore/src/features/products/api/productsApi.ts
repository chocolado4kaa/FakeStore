import axiosInstance from "../../../api/axiosInstance";
import type { Category } from "../types/Category";
import type { Product } from "../types/Product";
import type { ProductsResponse } from "../types/ProductsResponse";


export const productsApi = {
  getAll: (limit = 10, skip = 0) =>
    axiosInstance.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`),

  getByCategory: (category: string, limit = 10, skip = 0) =>
    axiosInstance.get<ProductsResponse>(`/products/category/${category}?limit=${limit}&skip=${skip}`),

  getById: (id: number) =>
    axiosInstance.get<Product>(`/products/${id}`),

  search: (q: string) =>
    axiosInstance.get<ProductsResponse>(`/products/search?q=${q}`),

  getCategories: () =>
    axiosInstance.get<Category[]>("/products/categories"),
};