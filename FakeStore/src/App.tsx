import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./shared/components/Header/Header";
import { fetchMe } from "./features/auth/api/authThunks";
import { useEffect } from "react";
import { selectToken } from "./features/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "./pages/loginPage/LoginPage";
import type { AppDispatch } from "./api/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
