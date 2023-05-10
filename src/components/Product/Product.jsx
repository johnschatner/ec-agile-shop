import "./Product.css";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import SkeletonImage from "../SkeletonLoader/SkeletonImage";

export default function Product(props) {
  const { getProduct } = useContext(ShopContext);
  const { addToCart, decrementQuantity } = useContext(CartContext);
  const { addToWishlist, productInWishlist } = useContext(WishlistContext);

  const product = getProduct(props.id);
  const { name, price, description, image } = product;

  const imageIsObject = typeof image === "object";

  const alreadyInWishlist = productInWishlist(product);

  return (
    <div className="product-card">
      <button onClick={() => addToWishlist(product)}>
        {alreadyInWishlist ? "<3" : "Add to wishlist"}
      </button>
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
