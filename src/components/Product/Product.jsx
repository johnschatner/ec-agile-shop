import "./Product.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

import SkeletonImage from "../SkeletonLoader/SkeletonImage";

export default function Product(props) {
  const { getProduct } = useContext(ShopContext);

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
    </div>
  );
}
