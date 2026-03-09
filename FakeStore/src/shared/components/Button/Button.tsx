import type { ButtonProps } from "../../../types/ButtonProps";
import styles from "./button.module.scss";
export const Button = ({ className, children, ...props }: ButtonProps) => {
  const resultClasses = className
    ?.split(" ")
    .map((cls) => styles[cls] ?? cls)
    .join(" ");

  return (
    <button className={`${styles.button} ${resultClasses ?? ""}`} {...props}>
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
