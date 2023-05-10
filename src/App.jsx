import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Context
import { ShopContextProvider } from "./context/ShopContext";
import { CartContextProvider } from "./context/CartContext";

// Components
import PageRoutes from "./pages/PageRoutes";
import Header from "./components/Header/Header";

function App() {
  return (
    <ShopContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Header></Header>
          <PageRoutes />
        </BrowserRouter>
      </CartContextProvider>
    </ShopContextProvider>
  );
}

export default App;
