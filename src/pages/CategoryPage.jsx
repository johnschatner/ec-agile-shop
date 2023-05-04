import "./CategoryPage.css";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Product from "../components/Product/Product";

export default function CategoryPage() {
  const location = useLocation();
  console.log(location);

  const selectedCategory = location.pathname.split("/category/")[1];

  const { getProductsInCategory } = useContext(ShopContext);

  const productsInCategory = getProductsInCategory(selectedCategory);

  const products = productsInCategory.map((product) => {
    return <Product key={product.id} id={product.id} />;
  });

  return <div className="category-grid">{products}</div>;
}
