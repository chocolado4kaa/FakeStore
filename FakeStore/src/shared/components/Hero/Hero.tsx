import { CiLogout } from "react-icons/ci";
import type { AuthResponse } from "../../../features/auth/types/AuthResponse";
import styles from "./hero.module.scss";
import { Button } from "../Button/Button";

export const HeroContainer = ({
  user,
  handleLogout,
}: {
  user: AuthResponse;
  handleLogout: () => void;
}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.avatarWrap}>
        <img
          src={user.image}
          alt={user.username}
          className={styles.avatarImg}
        />
        <div className={styles.avatarBadge}>
          {user.role === "admin" ? "★" : "✓"}
        </div>
      </div>
      <div className={styles.heroInfo}>
        <h1 className={styles.fullName}>
          {user.firstName} {user.lastName}
        </h1>
        <span className={styles.username}>@{user.username}</span>
        {user.role === "admin" && (
          <span className={styles.roleBadge}>Admin</span>
        )}
      </div>
      <Button className={styles.logoutBtn} onClick={handleLogout}>
        <CiLogout size={18} />
        Sign Out
      </Button>
    </div>
  );
};
