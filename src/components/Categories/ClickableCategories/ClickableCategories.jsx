import "./ClickableCategories.css";
import { ShopContext } from "../../../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function ClickableCategories() {
  const { CATEGORIES } = useContext(ShopContext);

  return (
    <section className="clickable-categories">
      {CATEGORIES.map((category) => (
        <Link to={`/category/${category}`} key={category}>
          {category}
        </Link>
      ))}
    </section>
  );
}
