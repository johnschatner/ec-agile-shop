import "./SearchPage.css";
import { useLocation } from "react-router";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function SearchPage() {
  const { PRODUCTS } = useContext(ShopContext);

  const location = useLocation().pathname.replace("/search/", "");

  const searchResults = PRODUCTS.filter((product) => {
    return product.name.toLowerCase().includes(location.toLowerCase());
  });

  console.log(searchResults);

  const searchItems = searchResults.map((item) => {
    const { name, image, price, id } = item;
    const imageIsObject = typeof image === "object";
    return (
      <div key={id} className="product-item">
        <img src={imageIsObject ? image.image1 : image} alt={name}></img>
        <div className="product-title">{name}</div>
        <div className="product-price">{price}</div>
      </div>
    );
  });

  return (
    <>
      <div className="search-grid">{searchItems}</div>
    </>
  );
}
