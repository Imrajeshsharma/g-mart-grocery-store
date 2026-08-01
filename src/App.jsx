import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";

import "./App.css";
import Navbar from "./components/navbar/Navbar.jsx";
import ContactUs from "./pages/contact/Contact.jsx";
import Category from "./pages/category/Category.jsx";
import Cart from "./pages/cart/Cart.jsx";
import ProductDetails from "./pages/product/ProductDetails.jsx";
import Wishlist from "./pages/wishlist/Wishlist";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import OrderSuccess from "./pages/order/OrderSuccess.jsx";
import MyOrders from "./pages/order/MyOrders.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Search from "./components/search/Search.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
