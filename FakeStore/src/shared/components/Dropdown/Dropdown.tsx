import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiLogout } from "react-icons/ci";
import styles from "./dropdown.module.scss";
import { logout } from "../../../features/auth/api/authSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Button } from "../Button/Button";
import type { DropdownProps } from "../../../types/DropdownProps";

export const Dropdown = ({ userName, onClose }: DropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleProfile = () => {
    navigate("/account");
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div className={styles.dropdown} ref={ref}>
      <div className={styles.avatar}>{userName}</div>
      <Button className="dropDownItem" onClick={handleProfile}>
        <CiUser size={16} />
        My Profile
      </Button>
      <Button className="dropDownItem itemDanger" onClick={handleLogout}>
        <CiLogout size={16} />
        Sign Out
      </Button>
    </div>
  );
};
