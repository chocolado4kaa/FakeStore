import { Link } from "react-router-dom";
import { Drawer } from "@shared/components/Drawer/Drawer";
import { DrawerHeader } from "@shared/components/Drawer/DrawerHeader";
import { Logo } from "../Logo/Logo";
import { Button } from "../Button/Button";
import type { MobileMenuProps } from "@/types/MobileMenuProps";
import styles from "./header.module.scss";

export const MobileMenu = ({
  menuOpen,
  setMenuOpen,
  isLoggedIn,
}: MobileMenuProps) => {
  const handleClose = () => setMenuOpen(false);

  return (
    <Drawer isOpen={menuOpen} onClose={handleClose} side="left" width="17.5rem">
      <DrawerHeader onClose={handleClose}>
        <Logo />
      </DrawerHeader>

      <nav className={styles.mobileLinks}>
        <Link to="/" className={styles.navLink} onClick={handleClose}>
          Home
        </Link>
        <Link
          to="/collections"
          className={styles.navLink}
          onClick={handleClose}
        >
          Collections
        </Link>
      </nav>

      <div className={styles.footer}>
        <Button className="ctaBtn">
          {isLoggedIn ? "My Account" : "Sign In"}
        </Button>
      </div>
    </Drawer>
  );
};
