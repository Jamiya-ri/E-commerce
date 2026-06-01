import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../Layout/MainLayout";

// Pages
import Home from "../Pages/home";
import Products from "../Pages/product";
import Skincare from "../Pages/skincare";
import Makeup from "../Pages/makeup";
import About from "../Pages/about";
import Contact from "../Pages/contact";
import PrivacyPolicy from "../Pages/privacypolicy";
import RefundPolicy from "../Pages/refundpolicy";
import TermsConditions from "../Pages/termsandconditions";
import Cart from "../Pages/Cart";
import Auth from "../Pages/auth";
import Orders from "../Pages/orders";
import Wishlist from "../Pages/wishlist";
import CategoryProducts from "../Pages/categoryproducts"

const CustomerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        {/* 🟢 MAIN WEBSITE (with Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<CategoryProducts />}
/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />}
/>
        </Route>
      </Routes>
    </>
  );
};

export default CustomerRoutes;
