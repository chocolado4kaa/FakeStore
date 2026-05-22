import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={`${styles.card} ${className || ""}`}>{children}</div>;
};

Card.Left = function CardLeft({ children }: { children: React.ReactNode }) {
  return <div className={styles.left}>{children}</div>;
};

Card.Media = function CardMedia({ children, className }: CardProps) {
  return <div className={`${styles.media} ${className || ""}`}>{children}</div>;
};

Card.Body = function CardBody({ children, className }: CardProps) {
  return <div className={`${styles.body} ${className || ""}`}>{children}</div>;
};

Card.Actions = function CardActions({ children, className }: CardProps) {
  return (
    <div className={`${styles.actions} ${className || ""}`}>{children}</div>
  );
};
