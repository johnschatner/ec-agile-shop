import { createContext, useState } from "react";
// Products
import { PRODUCTS } from "../assets/products/products";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Stuff
  console.log(PRODUCTS);

  // Export
  const contextValue = {};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
