import { Product } from "@/features/products/types/Product";

export interface wishlistItemProps {
  product: Product;
  onClose: () => void;
  toggle: (product: Product) => void;
}

export interface ProductLinkProps {
  children: React.ReactNode;
  className: string;
}