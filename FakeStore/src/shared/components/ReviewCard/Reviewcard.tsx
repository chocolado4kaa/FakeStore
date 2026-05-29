import { IoStarSharp } from "react-icons/io5";
import type { Review } from "@features/products/types/Product";
import styles from "./reviewcard.module.scss";

export const ReviewCard = ({ review }: { review: Review }) => {
  const date = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const initials = review.reviewerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.meta}>
          <span className={styles.name}>{review.reviewerName}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStarSharp
              key={i}
              size={12}
              className={i < review.rating ? styles.starFilled : styles.starEmpty}
            />
          ))}
        </div>
      </div>
      <p className={styles.comment}>{review.comment}</p>
    </div>
  );
};