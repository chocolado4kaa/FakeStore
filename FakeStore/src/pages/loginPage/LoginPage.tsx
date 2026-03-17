import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../features/auth/components/LoginForm/LoginForm";
import styles from "./LoginPage.module.scss";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className={styles.page}>
      <LoginForm onSuccess={() => navigate("/")} />
    </div>
  );
};
