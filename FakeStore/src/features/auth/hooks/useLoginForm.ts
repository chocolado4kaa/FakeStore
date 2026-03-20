import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../api/Loginschema";
import { useAuth } from "./useAuth";
import { login } from "../api/authThunks";

export const useLoginForm = (onSuccess?: () => void) => {
  const { login: handleLogin, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onTouched",
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    const result = await handleLogin(values);
    if (login.fulfilled.match(result)) {
      onSuccess?.();
    }
  });

  const togglePassword = () => setShowPassword((v) => !v);

  return {
    form,
    showPassword,
    isLoading,
    isDisabled: isLoading,
    error,
    handleSubmit,
    togglePassword,
  };
};