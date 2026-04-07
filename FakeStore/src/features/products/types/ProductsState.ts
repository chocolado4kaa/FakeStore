import { Status } from "@/types/Statuses";
import { Category } from "./Category";
import { Product } from "./Product";

export interface ProductsState {
  categories: Category[];
  byCategory: Record<string, Product[]>;
  selectedCategory: string;
  sort: SortOption;
  categoriesStatus: Status;
  categoryStatus: Record<string, Status>;
  selectedProduct: Product | null;
  selectedProductStatus: Status;
}

export type SortOption =
  | "default"
  | "rating"
  | "price_asc"
  | "price_desc"
  | "title";