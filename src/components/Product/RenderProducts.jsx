import "./RenderProducts.css";
import Product from "./Product";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function RenderProducts(props) {
  // Load global products
  const { PRODUCTS } = useContext(ShopContext);
  const limit = props.limit ? props.limit : 4; // set the maximum number of items to display
  const isDescending = true; // set the sorting order (true for descending, false for ascending)

  let products = props.products ? props.products : PRODUCTS;

  if (props.display === "latest") {
    console.log("Displaying latest products");
    const sortedProducts = products
      .sort((a, b) => {
        const dateA = new Date(a.dateAdded);
        const dateB = new Date(b.dateAdded);
        return isDescending ? dateB - dateA : dateA - dateB;
      })
      .slice(0, limit);
    products = sortedProducts;
  } else {
    console.log(false);
  }

  const productCards = products.map((product) => {
    return <Product key={product.id} id={product.id} />;
  });

  return <div className="category-grid">{productCards}</div>;
}
