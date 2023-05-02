// Import necessary modules and styles
import "./Menu.css";
import { useState } from "react";
import SubMenu from "./SubMenu";

// Define a new React component named Menu
export default function Menu() {
  // Set up state for the current menu state (open or closed)
  const [menu, setMenu] = useState("closed");

  // Define a click handler for the menu button
  const clickHandler = () => {
    // Toggle the menu state between open and closed
    if (menu === "open") {
      setMenu("closed");
    } else {
      setMenu("open");
    }
  };

  // Render the component's UI
  return (
    <>
      {/* Button that toggles the menu when clicked */}
      <button className="btn" onClick={clickHandler}>
        Menu
      </button>

      {/* SubMenu component that displays the menu options */}
      <SubMenu class={menu === "open" ? "open" : "closed"} />
    </>
  );
}
