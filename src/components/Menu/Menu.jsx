import "./Menu.css";
import { useState } from "react";

import SubMenu from "./SubMenu";

export default function Menu() {
  const [menu, setMenu] = useState("closed");

  const clickHandler = () => {
    if (menu === "open") {
      setMenu("closed");
    } else {
      setMenu("open");
    }
  };

  return (
    <>
      <button className="btn" onClick={clickHandler}>
        Menu
      </button>
      <SubMenu class={menu === "open" ? "open" : "closed"} />
    </>
  );
}
