import "./App.css";
import { BrowserRouter } from "react-router-dom";

// Context
import { ShopContextProvider } from "./context/ShopContext";

// Components
import PageRoutes from "./pages/PageRoutes";
import Header from "./components/Header/Header";

function App() {
  return (
    <ShopContextProvider>
      <Header></Header>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
