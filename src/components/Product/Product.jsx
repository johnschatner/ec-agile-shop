import "./Product.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { CartContext } from "../../context/CartContext";

import SkeletonImage from "../SkeletonLoader/SkeletonImage";
import { increment } from "@firebase/firestore";

export default function Product(props) {
  const { getProduct } = useContext(ShopContext);
  const { addToCart, decrementQuantity, incrementQuantity } =
    useContext(CartContext);

  const product = getProduct(props.id);
  const { name, price, description, image } = product;

  const imageIsObject = typeof image === "object";

  return (
    <div className="product-card">
      <div className="product-img">
        <SkeletonImage delay={200}>
          <img src={imageIsObject ? image.image1 : image} alt="" />
        </SkeletonImage>
      </div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{description}</div>
      <button onClick={() => addToCart(product)}>Köp</button>
      <button onClick={() => decrementQuantity(props.id)}>-</button>
    </div>
  );
}
