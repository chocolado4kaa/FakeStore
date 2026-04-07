import { Status } from "@/types/Statuses";
import type { AuthResponse } from "./AuthResponse";

export interface AuthState {
  user: AuthResponse | null;
  token: string | null;
  status: Status;
  error: string | null;
}