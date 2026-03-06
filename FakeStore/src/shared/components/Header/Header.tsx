import { useState, useEffect } from "react";
import styles from "./header.module.scss";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { logout } from "../../../features/auth/api/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BurgerIcon,
  WishlistIcon,
  CartIcon,
  UserIcon,
} from "./HeaderIcons/HeaderIcons";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../features/auth/authSelectors";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : "";

  const cartCount = 0;
  const wishCount = 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const burgerClass = "burger" + (menuOpen ? " burgerOpen" : "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Button
              className={burgerClass}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <BurgerIcon />
            </Button>
            <Logo />
            <nav className={styles.nav}>
              <a
                href="/"
                className={`${styles.navLink} ${styles.navLinkActive}`}
              >
                Home
              </a>
              <a href="/collections" className={styles.navLink}>
                Collections
              </a>
            </nav>
          </div>
          <div className={styles.right}>
            <Button className="iconBtn" aria-label="Wishlist">
              <WishlistIcon count={wishCount} />
            </Button>
            <Button className="iconBtn" aria-label="Cart">
              <CartIcon count={cartCount} />
            </Button>
            <Button
              className="iconBtn"
              aria-label={isLoggedIn ? "Logout" : "Sign in"}
              onClick={handleLoginClick}
            >
              <UserIcon isLoggedIn={isLoggedIn} userInitials={userInitials} />
            </Button>
          </div>
        </div>
      </header>
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};

export default Header;
