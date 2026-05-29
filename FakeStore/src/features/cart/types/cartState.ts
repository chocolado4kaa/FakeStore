import { Status } from "@/types/Statuses";
import { Cart } from "./cart";

export interface CartState {
  data: Cart | null;
  status: Status;
  addingProductId: number | null;
}