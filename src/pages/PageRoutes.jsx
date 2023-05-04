import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  );
}
