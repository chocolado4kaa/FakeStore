import "./headericons.scss";
import { CiMenuBurger, CiShoppingCart, CiHeart, CiUser } from "react-icons/ci";

export const BurgerIcon = () => <CiMenuBurger size={22} />;

export const CartIcon = ({ count }: { count: number }) => (
  <>
    <CiShoppingCart size={24} />
    {count > 0 && <span className="badge">{count > 99 ? "99+" : count}</span>}
  </>
);

export const WishlistIcon = ({ count }: { count: number }) => (
  <>
    <CiHeart size={24} />
    {count > 0 && <span className="badge">{count}</span>}
  </>
);

export const UserIcon = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <>
    {isLoggedIn ?
      <div className="avatar"></div>
    : <CiUser size={24} />}
  </>
);
