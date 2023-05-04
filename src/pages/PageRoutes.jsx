import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./HomePage";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<div>Hej</div>} />
    </Routes>
  );
}
