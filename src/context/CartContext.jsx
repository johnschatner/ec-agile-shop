import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [CART, setCART] = useState([]);

  useEffect(() => {
    console.log(CART);
  }, [CART]);

  const addToCart = (product) => {
    const existingItem = CART.find((item) => item.id === product.id);
    if (existingItem) {
      setCART((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCART((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (productId) => {
    setCART((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCART((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCART((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Export
  const contextValue = {
    CART,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
