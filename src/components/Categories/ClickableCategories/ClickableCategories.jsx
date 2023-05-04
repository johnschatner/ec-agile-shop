import "./ClickableCategories.css";
import { ShopContext } from "../../../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function ClickableCategories() {
  const { getProductsInCategory } = useContext(ShopContext);

  return (
    <section className="clickable-categories">
      <Link to="/category/shirts">Shirts</Link>
      <Link to="/category/pants">Pants</Link>
      <Link to="/category/shoes">Shoes</Link>
    </section>
  );
}
