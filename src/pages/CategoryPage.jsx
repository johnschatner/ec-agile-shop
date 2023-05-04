import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function CategoryPage() {
  const { getProductsInCategory } = useContext(ShopContext);

  console.log(getProductsInCategory("Shoes"));

  return <div>hej</div>;
}
