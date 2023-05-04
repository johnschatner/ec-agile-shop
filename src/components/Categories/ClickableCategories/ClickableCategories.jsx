import "./ClickableCategories.css";
import { ShopContext } from "../../../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function ClickableCategories() {
  const { getProductsInCategory } = useContext(ShopContext);

  return (
    <section className="clickable-categories">
      <Link to="/category">Kategori</Link>
      <Link to="/category">Kategori</Link>
      <Link to="/category">Kategori</Link>
    </section>
  );
}
