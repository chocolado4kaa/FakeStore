import { Button } from "@shared/components/Button/Button";
import { InputText } from "@shared/components/InputText/InputText";
import { Logo } from "@shared/components/Logo/Logo";
import { useLoginForm } from "../../hooks/useLoginForm";
import styles from "./loginForm.module.scss";
import { CiUser, CiLock, CiRead, CiUnread, CiWarning } from "react-icons/ci";

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    fields,
    showPassword,
    isLoading,
    isDisabled,
    error,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useLoginForm(onSuccess);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.header}>
        <Logo />
        <h2 className={styles.title}>Welcome back</h2>
        <p className={styles.subtitle}>Sign in to your account</p>
      </div>
      <div className={styles.fields}>
        <InputText
          name="username"
          label="Username"
          icon={<CiUser size={16} />}
          placeholder="emilys"
          value={fields.username}
          onChange={handleChange}
          autoComplete="username"
          disabled={isLoading}
          required
        />
        <InputText
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={<CiLock size={16} />}
          placeholder="••••••••"
          value={fields.password}
          onChange={handleChange}
          autoComplete="current-password"
          disabled={isLoading}
          required
        >
          <Button
            type="button"
            className={styles.eyeBtn}
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ?
              <CiUnread size={16} />
            : <CiRead size={16} />}
          </Button>
        </InputText>
      </div>
      {error && (
        <div className={styles.error}>
          <CiWarning size={16} />
          {error}
        </div>
      )}
      <Button type="submit" className={styles.submitBtn} disabled={isDisabled}>
        {isLoading ?
          <span className={styles.spinner} />
        : "Sign In"}
      </Button>
      <p className={styles.hint}>
        Demo: <span>emilys</span> / <span>emilyspass</span>
      </p>
    </form>
  );
};
