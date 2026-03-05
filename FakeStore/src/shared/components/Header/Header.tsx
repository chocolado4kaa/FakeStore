import { useState, useEffect } from "react";
import styles from "./header.module.scss";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import {
  BurgerIcon,
  WishlistIcon,
  CartIcon,
  UserIcon,
} from "../../HeaderIcons/HeaderIcons";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = 0;
  const wishCount = 0;
  const isLoggedIn = false;

  const rightSideButtons = [
    {
      icon: <WishlistIcon count={wishCount} />,
      ariaLabel: "Wishlist",
    },
    {
      icon: <CartIcon count={cartCount} />,
      ariaLabel: "Cart",
    },
    {
      icon: <UserIcon isLoggedIn={isLoggedIn} />,
      ariaLabel: "User account",
    },
  ];

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
            {rightSideButtons.map((button, index) => (
              <Button
                key={index}
                className="iconBtn"
                aria-label={button.ariaLabel}
              >
                {button.icon}
              </Button>
            ))}
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
