import { Link } from "react-router";
import styles from "./logo.module.scss";
export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logoMark}>S</span>
      <span className={styles.logoText}>SHOPPY</span>
    </Link>
  );
};
