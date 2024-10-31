import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignPage from "../pages/SignPage";
import OrderCheckoutPage from "../pages/OrderCheckoutPage";
import OrderForm from "../components/specific/Order/OrderForm";
import SellerMyPage from "../pages/SellerMyPage";
import Dashboard from "../components/specific/Seller/Dashboard";
import Menus from "../components/specific/Seller/Menus";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route index element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {/* Order Domain */}
      <Route path="/orders" element={<OrderCheckoutPage />}>
        <Route path="form" element={<OrderForm />} />
      </Route>
      {/* Seller Domain */}
      <Route path="/seller" element={<SellerMyPage />}>
        <Route index element={<Dashboard />} />
        <Route path="menus" element={<Menus />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
