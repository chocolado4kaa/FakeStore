import { Routes, Route, HashRouter } from "react-router-dom";
import { Header } from "./shared/components/Header/Header";
import { fetchMe } from "./features/auth/api/authThunks";
import { useEffect } from "react";
import { selectToken } from "./features/auth/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { LoginPage } from "./pages/loginPage/LoginPage";
import type { AppDispatch } from "./api/store";
import { ProfilePage } from "./pages/Profile/Profile";
import { HomePage } from "./pages/Main/HomePage";
import "./App.scss";
import { WishlistDrawer } from "./features/wishlist/components/wishlistDrawer/Wishlistdrawer";
import { Footer } from "./shared/components/Footer/Footer";
import { CollectionsPage } from "./pages/Collectionspage/Collectionspage";
import { ProductPage } from "./pages/Product/Productpage";
import { CartPage } from "./pages/CartPage/CartPage";
import { fetchCart } from "./features/cart/api/cartThunks";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe()).then((result) => {
        if (fetchMe.fulfilled.match(result)) {
          console.log(`Fetched user: ${result.payload.id}`);
          dispatch(fetchCart(result.payload.id));
        }
      });
    }
  }, [token]);
  return (
    <HashRouter>
      <Header />
      <WishlistDrawer />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:category" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account/*" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
};

export default App;
