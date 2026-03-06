import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthResponse } from "../types/AuthResponse";
import type { LoginCredentials } from "../types/LoginCredentials";
import { authApi } from "./authApi";

export const login = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authApi.login(credentials);
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message ?? "Login failed");
    }
  }
);

export const fetchMe = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authApi.getMe();
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.message ?? "Failed to fetch user");
    }
  }
);
