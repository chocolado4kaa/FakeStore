import type { InputTextProps } from "../../../types/InputTextProps";
import styles from "./inputText.module.scss";

export const InputText = ({
  name,
  label,
  icon,
  children,
  ...props
}: InputTextProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <div className={styles.inputIcon}>{icon}</div>
        <input id={name} name={name} type="text" {...props} />
        {children}
      </div>
    </div>
  );
};
