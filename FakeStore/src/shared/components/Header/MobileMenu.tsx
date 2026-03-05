import type { MobileMenuProps } from "../../../types/MobileMenuProps";
import { Button } from "../Button/Button";
import { Logo } from "../Logo/Logo";
import styles from "./header.module.scss";

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  isLoggedIn,
}: MobileMenuProps) => {
  return (
    <div
      className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
    >
      <div
        className={styles.mobileBackdrop}
        onClick={() => setMenuOpen(false)}
      />
      <nav className={styles.mobilePanel}>
        <div className={styles.mobilePanelHeader}>
          <Logo />
          <Button onClick={() => setMenuOpen(false)} className="mobileClose">
            ✕
          </Button>
        </div>
        <div className={styles.mobileLinks}>
          <a href="/" className={styles.mobileNavLink}>
            Home
          </a>
          <a href="/collections" className={styles.mobileNavLink}>
            Collections
          </a>
        </div>
        <div className={styles.mobileFooter}>
          <Button className="ctaBtn">
            {isLoggedIn ? "My Account" : "Sign In"}
          </Button>
        </div>
      </nav>
    </div>
  );
};
