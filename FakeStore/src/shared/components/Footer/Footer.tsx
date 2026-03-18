import { Logo } from "../Logo/Logo";
import styles from "./footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <Logo />
    <span className={styles.copy}>
      © {new Date().getFullYear()} Shoppy. All rights reserved.
    </span>
  </footer>
);