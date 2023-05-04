import { useState } from "react";
import "./App.css";

// Components
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import ClickableCategories from "./components/Categories/ClickableCategories/ClickableCategories";

function App() {
  return (
    <>
      <Header></Header>
      <HeroBanner></HeroBanner>
      <ClickableCategories></ClickableCategories>
    </>
  );
}

export default App;
