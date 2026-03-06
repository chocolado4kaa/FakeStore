  import { useState } from "react";
  import { login } from "../api/authThunks";
  import { useAuth } from "./useAuth";

  export const useLoginForm = (onSuccess?: () => void) => {
    const { login: handleLogin, isLoading, error } = useAuth();

    const [fields, setFields] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const isDisabled = isLoading || !fields.username || !fields.password;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await handleLogin(fields);
      if (login.fulfilled.match(result)) {
        onSuccess?.();
      }
    };

    const togglePassword = () => setShowPassword((v) => !v);

    return {
      fields,
      showPassword,
      isLoading,
      isDisabled,
      error,
      handleChange,
      handleSubmit,
      togglePassword,
    };
  };
