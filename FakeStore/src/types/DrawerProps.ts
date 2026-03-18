export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  width?: string;
  children: React.ReactNode;
}

export interface DrawerHeaderProps {
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}