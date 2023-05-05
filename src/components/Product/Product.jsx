import "./Product.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

import SkeletonImage from "../SkeletonLoader/SkeletonImage";

export default function Product(props) {
  const { getProduct } = useContext(ShopContext);

  const product = getProduct(props.id);
  const { name, price, description, image } = product;

  return (
    <div className="product-card">
      <div className="product-img">
        <SkeletonImage delay={400}>
          <img src={image} alt="" />
        </SkeletonImage>
      </div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{description}</div>
    </div>
  );
}
