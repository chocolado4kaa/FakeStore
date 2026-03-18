import { useState, useEffect } from "react";
import styles from "./header.module.scss";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  BurgerIcon,
  WishlistIcon,
  CartIcon,
  UserIcon,
} from "./HeaderIcons/HeaderIcons";
import { selectIsLoggedIn, selectUser } from "@features/auth/authSelectors";
import { Dropdown } from "../Dropdown/Dropdown";
import { useWishlist } from "@/features/wishlist/hooks/useWishlist";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count: wishCount, toggleDrawer } = useWishlist();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const userName = user ? `${user.firstName} ${user.lastName}` : "";

  const avatar = user && user.image ? user.image : "";

  const cartCount = 0;

  const navigate = useNavigate();

  const handleUserClick = () => {
    if (isLoggedIn) {
      setDropdownOpen((v) => !v);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const burgerClass = "burger" + (menuOpen ? " burgerOpen" : "");

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
              <Link
                to="/"
                className={`${styles.navLink} ${styles.navLinkActive}`}
              >
                Home
              </Link>
              <Link to="/collections" className={styles.navLink}>
                Collections
              </Link>
            </nav>
          </div>
          <div className={styles.right}>
            <Button
              className="iconBtn"
              aria-label="Wishlist"
              onClick={() => toggleDrawer()}
            >
              <WishlistIcon count={wishCount} />
            </Button>
            <Button className="iconBtn" aria-label="Cart">
              <CartIcon count={cartCount} />
            </Button>
            <div style={{ position: "relative" }}>
              <Button
                className="iconBtn"
                aria-label={isLoggedIn ? "Account" : "Sign in"}
                onClick={handleUserClick}
              >
                <UserIcon isLoggedIn={isLoggedIn} avatar={avatar} />
              </Button>

              {isLoggedIn && dropdownOpen && (
                <Dropdown
                  userName={userName}
                  onClose={() => setDropdownOpen(false)}
                />
              )}
            </div>
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
