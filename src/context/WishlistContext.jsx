import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext(null);

export const WishlistContextProvider = (props) => {
  const [WISHLIST, setWISHLIST] = useState([]);

  useEffect(() => {
    console.log(WISHLIST);
  }, [WISHLIST]);

  const addToWishlist = (product) => {
    const productExists = WISHLIST.find((item) => item.id === product.id);
    // Remove wishlist item if it already exists
    if (productExists) {
      const newWishlist = WISHLIST.filter((item) => item.id !== product.id);
      setWISHLIST(newWishlist);
      return;
    }
    setWISHLIST([...WISHLIST, product]);
  };

  const contextValue = {
    WISHLIST,
    addToWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {props.children}
    </WishlistContext.Provider>
  );
};
