import { logout } from "../api/authSlice";
import { login, fetchMe } from "../api/authThunks";
import { selectUser, selectIsLoggedIn, selectAuthStatus, selectAuthError } from "../authSelectors";
import type { LoginCredentials } from "../types/LoginCredentials";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const isLoading = status === "loading";

  const handleLogin = (credentials: LoginCredentials) =>
    dispatch(login(credentials));

  const handleLogout = () => dispatch(logout());

  const handleFetchMe = () => dispatch(fetchMe());

  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    fetchMe: handleFetchMe,
  };
};