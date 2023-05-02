import { useEffect, useState } from "react";
import "./SubMenu.css";

export default function SubMenu(props) {
  const [level, setLevel] = useState("");

  const clickHandler = (props) => {
    setLevel(props);
  };

  useEffect(() => {
    console.log(level);
  }, [level]);

  return (
    <>
      <section className={`submenu ${props.class}`}>
        <nav className="submenu-nav">
          {level !== "" ? (
            <button onClick={() => clickHandler("")}>Back</button>
          ) : null}
          {level === "" ? (
            <>
              <button onClick={() => clickHandler("cars")}>Bilar</button>
              <button onClick={() => clickHandler("airplanes")}>
                Flygplan
              </button>
              <button onClick={() => clickHandler("boats")}>Båtar</button>
            </>
          ) : null}
          {level === "cars" ? (
            <>
              <div>Bilar</div>
            </>
          ) : null}
          {level === "airplanes" ? (
            <>
              <div>Flygplan</div>
            </>
          ) : null}
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
