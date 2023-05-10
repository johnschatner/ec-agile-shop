import { createContext, useState, useEffect } from "react";

// Create a new context called CartContext
export const CartContext = createContext(null);

// Define the CartContextProvider component
export const CartContextProvider = (props) => {
  // Define a state variable called CART and a function to update it, setCART
  const [CART, setCART] = useState([]);

  // Run this effect whenever CART changes
  useEffect(() => {
    console.log(CART); // Log the current state of the CART array
  }, [CART]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = CART.find((item) => item.id === product.id);
    if (existingItem) {
      // If the product is already in the cart, update its quantity
      setCART((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCART((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  // Function to increment the quantity of a product in the cart
  const incrementQuantity = (productId) => {
    setCART((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement the quantity of a product in the cart
  const decrementQuantity = (productId) => {
    setCART((prevCart) =>
      prevCart.reduce((updatedCart, item) => {
        if (item.id === productId && item.quantity > 1) {
          updatedCart.push({ ...item, quantity: item.quantity - 1 });
        } else if (item.id !== productId) {
          updatedCart.push(item);
        }
        return updatedCart;
      }, [])
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCART((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Define the context value with all the functions and the CART state
  const contextValue = {
    CART,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  };

  // Render the CartContextProvider component with the provided children and the context value
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
