import "./App.css";
import NavBar from "./components/NavBar/navBar";
import HomePage from "./pages/HomePage/homePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SearchPage from "./pages/SearchPage/searchPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CartPage from "./pages/CartPage/cartPage";
import ShippingAddressPage from "./pages/ShippingAddressPage/shippingAddressPage";
import PaymentPage from "./pages/PaymentPage/paymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage/placeOrderPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer position="bottom-center" limit={5}/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingAddressPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
          </Routes>
        </main>
    </BrowserRouter>
  );
}

export default App;
