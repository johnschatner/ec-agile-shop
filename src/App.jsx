import { useState } from "react";
import "./App.css";

// Components
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";

function App() {
  return (
    <>
      <Header></Header>
      <HeroBanner></HeroBanner>
    </>
  );
}

export default App;
