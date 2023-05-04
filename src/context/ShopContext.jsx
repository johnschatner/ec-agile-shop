import { createContext, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Stuff

  // Export
  const contextValue = {};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
