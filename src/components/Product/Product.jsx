import "./Product.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function Product(props) {
  const { getProduct } = useContext(ShopContext);

  const product = getProduct(props.id);
  const { name, price, description, image } = product;

  return (
    <div className="product-card">
      <div>{name}</div>
      <div>{price}</div>
      <div>{description}</div>
      <img src={image} alt="" />
    </div>
  );
}
