import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import AdminPage from "./AdminPage";
import WishlistPage from "./WishlistPage";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/admin-page-hc" element={<AdminPage />} />
    </Routes>
  );
}
