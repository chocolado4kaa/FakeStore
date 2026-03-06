import type { AuthResponse } from "./AuthResponse";

export interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}