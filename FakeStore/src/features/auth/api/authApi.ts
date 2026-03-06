import type { AuthResponse } from "../types/AuthResponse";
import type { LoginCredentials } from "../types/LoginCredentials";
import axiosInstance from "../../../api/axiosInstance";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    axiosInstance.post<AuthResponse>("/auth/login", {
      ...credentials,
      expiresInMins: 30,
    }),

  getMe: () =>
    axiosInstance.get<AuthResponse>("/auth/me"),
};