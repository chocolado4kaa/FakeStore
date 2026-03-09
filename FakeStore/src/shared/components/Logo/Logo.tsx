import styles from "./logo.module.scss";
export const Logo = () => {
  return (
    <a href="/" className={styles.logo}>
      <span className={styles.logoMark}>S</span>
      <span className={styles.logoText}>SHOPPY</span>
    </a>
  );
};
