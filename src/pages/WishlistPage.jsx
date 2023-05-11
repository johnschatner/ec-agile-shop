import "./WishlistPage.css";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

// Components
import RenderProducts from "../components/Product/RenderProducts";

export default function HomePage() {
  const { WISHLIST } = useContext(WishlistContext);

  const itemsInWishlist = WISHLIST.length !== 0;

  return (
    <>
      <div className="wishlist-grid">
        {itemsInWishlist ? (
          <RenderProducts products={WISHLIST} />
        ) : (
          <div>Your wishlist is empty</div>
        )}
      </div>
    </>
  );
}
