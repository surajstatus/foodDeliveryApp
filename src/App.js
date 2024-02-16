import Home from "./screens/Home";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import Signup from "./screens/Signup.jsx";
import Login from "./screens/Login.jsx";
import { CartProvider } from "./Component/ContextReducer.jsx";
import Cart from "./screens/Cart.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/myOrders" element={<div>order</div>} />
          
        </Routes>
      </CartProvider>
    </>
  );
}

export default App;
