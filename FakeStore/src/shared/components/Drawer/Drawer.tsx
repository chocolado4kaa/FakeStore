import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Drawer.module.scss";
import { DrawerProps } from "@/types/DrawerProps";

export const Drawer = ({
  isOpen,
  onClose,
  side = "right",
  width = "22rem",
  children,
}: DrawerProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return createPortal(
    <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.panel} ${styles[side]}`} style={{ width }}>
        {children}
      </div>
    </div>,
    document.body,
  );
};
