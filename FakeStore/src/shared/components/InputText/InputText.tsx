import type { InputTextProps } from "@/types/InputTextProps";
import styles from "./inputText.module.scss";

export const InputText = ({
  name,
  label,
  icon,
  error,
  children,
  ...props
}: InputTextProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div
        className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ""}`}
      >
        <div className={styles.inputIcon}>{icon}</div>
        <input id={name} name={name} {...props} />
        {children}
      </div>
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
};
