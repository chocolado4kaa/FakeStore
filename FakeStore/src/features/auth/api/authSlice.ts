import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../types/AuthState";
import { login, fetchMe } from "./authThunks";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      localStorage.removeItem("accessToken");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;