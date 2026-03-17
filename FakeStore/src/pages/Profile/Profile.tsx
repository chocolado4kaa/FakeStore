import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchMe } from "../../features/auth/api/authThunks";
import { logout } from "../../features/auth/api/authSlice";
import {
  selectUser,
  selectIsLoggedIn,
} from "../../features/auth/authSelectors";
import styles from "./profile.module.scss";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { HeroContainer } from "../../shared/components/Hero/Hero";
import { InfoCard } from "../../shared/components/InfoCard/InfoCard";
import { InfoCards } from "../../shared/const/InfoCards";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!user) dispatch(fetchMe());
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <span className={styles.spinner} />
        </div>
      </div>
    );
  }

  const fullAddress = [
    user.address?.address,
    user.address?.city,
    user.address?.state,
    user.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <HeroContainer user={user} handleLogout={handleLogout} />
        <div className={styles.grid}>
          {InfoCards({ user, fullAddress }).map((card) => (
            <InfoCard
              key={card.label}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
