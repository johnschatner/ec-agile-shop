import "./WishlistPage.css";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function HomePage() {
  const { WISHLIST } = useContext(WishlistContext);

  const wishlistItems = WISHLIST.map((item) => {
    const { name, image, price, quantity, id } = item;
    const imageIsObject = typeof image === "object";
    return (
      <div key={id} className="wishlist-item">
        <img src={imageIsObject ? image.image1 : image} alt={name}></img>
        <div className="wishlist-name">{name}</div>
        <div className="wishlist-price">{price}</div>
        <div className="wishlist-quantity">{quantity}</div>
      </div>
    );
  });

  return (
    <>
      <div className="wishlist-grid">{wishlistItems}</div>
    </>
  );
}
