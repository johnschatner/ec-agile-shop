import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Context
import { ShopContextProvider } from "./context/ShopContext";
import { CartContextProvider } from "./context/CartContext";
import { WishlistContextProvider } from "./context/WishlistContext";

// Components
import PageRoutes from "./pages/PageRoutes";
import Header from "./components/Header/Header";

function App() {
  return (
    <ShopContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <BrowserRouter>
            <Header></Header>
            <PageRoutes />
          </BrowserRouter>
        </WishlistContextProvider>
      </CartContextProvider>
    </ShopContextProvider>
  );
}

export default App;
