import "./CategoryPage.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import Product from "../components/Product/Product";
import RenderProducts from "../components/Product/RenderProducts";

export default function CategoryPage() {
  const location = useLocation();
  const selectedCategory = location.pathname.split("/category/")[1];
  const { getProductsInCategory } = useContext(ShopContext);
  const productsInCategory = getProductsInCategory(selectedCategory);

  return <RenderProducts products={productsInCategory} />;
}
