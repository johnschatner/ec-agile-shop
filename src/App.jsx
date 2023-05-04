import { useState } from "react";
import "./App.css";

// Context
import { ShopContextProvider } from "./context/ShopContext";

// Components
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import ClickableCategories from "./components/Categories/ClickableCategories/ClickableCategories";

function App() {
  return (
    <ShopContextProvider>
      <Header></Header>
      <HeroBanner></HeroBanner>
      <ClickableCategories></ClickableCategories>
    </ShopContextProvider>
  );
}

export default App;
