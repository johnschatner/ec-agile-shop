import "./Header.css";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu.jsx";
import Cart from "./Cart/Cart";
import Search from "./Search/Search";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <Link to="/">
              <img src="" alt="LOGO" />
            </Link>
          </div>
          <div className="header-link">
            <Link to="/admin-page-hc">
              <span>AdminPanel</span>
            </Link>
          </div>
          <div className="header-link">
            <Link to="/wishlist">
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
        <div className="header-right">
          <Search />
          <Cart />
          <Menu />
        </div>
      </div>
    </header>
  );
}
