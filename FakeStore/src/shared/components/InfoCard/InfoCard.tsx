import type { InfoCardProps } from "@/types/InfoCardProps";
import styles from "./infoCard.module.scss";
import { Card } from "../Card/Card";

export const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <Card className={styles.InfoCard}>
    <Card.Left>
      <Card.Media className={styles.media}>{icon}</Card.Media>
      <Card.Body>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </Card.Body>
    </Card.Left>
  </Card>
);
