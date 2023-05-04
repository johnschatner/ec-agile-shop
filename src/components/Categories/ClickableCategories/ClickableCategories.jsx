import "./ClickableCategories.css";
import { ShopContext } from "../../../context/ShopContext";
import { useContext, useEffect } from "react";

export default function ClickableCategories() {
  const { getProductsInCategory } = useContext(ShopContext);

  console.log(getProductsInCategory("Shirts"));

  return (
    <section className="clickable-categories">
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
    </section>
  );
}
