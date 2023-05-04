import "./ClickableCategories.css";
import { ShopContext } from "../../../context/ShopContext";
import { useContext, useEffect } from "react";

export default function ClickableCategories() {
  //   const { clock, setClock } = useContext(ShopContext);

  //   useEffect(() => {
  //     console.log(clock);
  //     setClock("14:00");
  //   }, [clock]);

  return (
    <section className="clickable-categories">
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
      <a href="#">Kategori</a>
    </section>
  );
}
