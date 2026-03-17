import type { ButtonProps } from "../../../types/ButtonProps";
import clsx from "clsx";
import styles from "./button.module.scss";

export const Button = ({ className, children, ...props }: ButtonProps) => {
  const getStyles = (className?: string) => {
    if (!className) return undefined;
    return className.split(" ").map((cls) => styles[cls] ?? cls);
  };

  return (
    <button className={clsx(styles.button, getStyles(className))} {...props}>
      <div className={styles.buttonContent}>{children}</div>
    </button>
  );
};
