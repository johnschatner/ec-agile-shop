// Import necessary modules
import { useEffect, useState } from "react";
import "./SubMenu.css";

// Define a new React component named SubMenu
export default function SubMenu(props) {
  // Set up state for the current level
  const [level, setLevel] = useState("");

  // Define a click handler for the menu buttons
  const clickHandler = (props) => {
    // Update the level state based on which button was clicked
    setLevel(props);
  };

  // Set up an effect that logs the current level whenever it changes
  useEffect(() => {
    console.log(level);
  }, [level]);

  // Render the component's UI
  return (
    <>
      {/* Outer container for the submenu */}
      <section className={`submenu ${props.class}`}>
        {/* Navigation container for the submenu */}
        <nav className="submenu-nav">
          {/* If the level is not empty, show a "Back" button */}
          {level !== "" ? (
            <button onClick={() => clickHandler("")}>Back</button>
          ) : null}

          {/* If the level is empty, show the top-level menu options */}
          {level === "" ? (
            <>
              <button onClick={() => clickHandler("cars")}>Bilar</button>
              <button onClick={() => clickHandler("airplanes")}>
                Flygplan
              </button>
              <button onClick={() => clickHandler("boats")}>Båtar</button>
            </>
          ) : null}

          {/* If the level is "cars", show the detailed car menu */}
          {level === "cars" ? (
            <>
              <div>Bilar</div>
            </>
          ) : null}

          {/* If the level is "airplanes", show the detailed airplane menu */}
          {level === "airplanes" ? (
            <>
              <div>Flygplan</div>
            </>
          ) : null}

          {/* If the level is "boats", show the detailed boat menu */}
          {level === "boats" ? (
            <>
              <div>Båtar</div>
            </>
          ) : null}
        </nav>
      </section>
    </>
  );
}
