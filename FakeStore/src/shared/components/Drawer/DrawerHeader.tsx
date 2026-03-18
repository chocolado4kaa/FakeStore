import { DrawerHeaderProps } from "@/types/DrawerProps";
import { Button } from "../Button/Button";
import styles from "./Drawer.module.scss";

export const DrawerHeader = ({
  onClose,
  children,
  actions,
}: DrawerHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>{children}</div>
      <div className={styles.headerActions}>
        {actions}
        <Button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};
