import "./Header.css";

import Menu from "../Menu/Menu.jsx";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <a href="/">
              <img src="" alt="LOGO" />
            </a>
          </div>
        </div>
        <div className="header-right">
          <Menu />
        </div>
      </div>
    </header>
  );
}
