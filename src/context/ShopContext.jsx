import { createContext, useState } from "react";
// Products
import { products } from "../assets/products/products";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Stuff
  const [PRODUCTS, setPRODUCTS] = useState(products);

  // Export
  const contextValue = {
    PRODUCTS,
    setPRODUCTS,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
