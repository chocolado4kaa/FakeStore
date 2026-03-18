import { Button } from "@/shared/components/Button/Button";
import { CiHeart } from "react-icons/ci";
import { IoHeartSharp } from "react-icons/io5";
import { useWishlist } from "../../hooks/useWishlist";
import { Product } from "@/features/products/types/Product";

export const WishlistButton = ({ product }: { product: Product }) => {
  const { toggle, searchItem } = useWishlist();
  const isInWishlist = searchItem(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  return (
    <Button
      className={`wishlistBtn ${isInWishlist ? "active" : ""}`}
      onClick={handleClick}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isInWishlist ?
        <IoHeartSharp size={16} />
      : <CiHeart size={18} />}
    </Button>
  );
};
