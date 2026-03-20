import { SortOption } from "./ProductsState";

export interface FetchProductsArgs {
  category: string;
  limit?: number;
  sort?: SortOption;
}