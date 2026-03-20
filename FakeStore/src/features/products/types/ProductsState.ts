import { Category } from "./Category";
import { Product } from "./Product";

export interface ProductsState {
  categories: Category[];
  byCategory: Record<string, Product[]>;
  selectedCategory: string;
  sort: SortOption;
  categoriesStatus: Status;
  categoryStatus: Record<string, Status>;
}

export type SortOption = "rating" | "price_asc" | "price_desc" | "title";

export type Status = "idle" | "loading" | "succeeded" | "failed";