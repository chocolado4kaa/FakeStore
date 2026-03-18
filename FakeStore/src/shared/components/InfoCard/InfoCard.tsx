import type { InfoCardProps } from "@/types/InfoCardProps";
import styles from "./infoCard.module.scss";

export const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <div className={styles.card}>
    <div className={styles.cardIcon}>{icon}</div>
    <div className={styles.cardBody}>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{value}</span>
    </div>
  </div>
);
