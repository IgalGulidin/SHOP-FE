import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FavoritesPage from "./pages/FavoritesPage";
import OrdersPage from "./pages/OrdersPage";
import PendingOrderPage from "./pages/PendingOrderPage";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <FavotietesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path="/orders/pending"
          element={
            <RequireAuth>
              <PendingOrderPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}