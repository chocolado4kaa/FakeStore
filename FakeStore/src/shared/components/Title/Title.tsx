import styles from "./title.module.scss";

interface TitleProps {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const Title = ({ children, actions, className }: TitleProps) => {
  return (
    <div className={`${styles.header} ${className || ""}`}>
      <h2 className={styles.title}>{children}</h2>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};
