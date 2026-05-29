export interface AddToCartPayload {
  userId: number;
  products: { id: number; quantity: number }[];
}

export interface UpdateCartPayload {
  products: { id: number; quantity: number }[];
}