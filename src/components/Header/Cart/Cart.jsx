import "./Cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

export default function Cart() {
  const [cartWindow, setCartWindow] = useState(false);
  const { CART } = useContext(CartContext);

  const cartClickHandler = () => {
    if (cartWindow) {
      setCartWindow(false);
    } else {
      setCartWindow(true);
    }
  };

  const cartItems = CART.map((item) => {
    const { name, image, price, quantity, id } = item;
    const imageIsObject = typeof image === "object";
    return (
      <div key={id} className="cart-item">
        <img src={imageIsObject ? image.image1 : image} alt={name}></img>
        <div className="cart-title">{name}</div>
        <div className="cart-title">{price}</div>
        <div className="cart-title">{quantity}</div>
      </div>
    );
  });

  return (
    <>
      <button onClick={cartClickHandler}>Cartman</button>
      {cartWindow && (
        <div className="cart-window">
          <div>Your cart</div>
          <div className="cart-row">
            <div></div>
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
          </div>
          {cartItems}
        </div>
      )}
    </>
  );
}
