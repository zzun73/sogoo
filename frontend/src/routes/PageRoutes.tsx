import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignPage from "../pages/SignPage";
import OrderCheckoutPage from "../pages/OrderCheckoutPage";
import OrderForm from "../components/specific/Order/OrderForm";
import StorePage from "../pages/StorePage";
import TossPaymentsCheckoutSuccess from "../components/specific/Order/TossPayments/TossPaymentsCheckoutSuccess";
import TossPaymentsCheckoutFail from "../components/specific/Order/TossPayments/TossPaymentsCheckoutFail";
import SellerMyPage from "../pages/SellerMyPage";
import Dashboard from "../components/specific/Seller/Dashboard";
import Menus from "../components/specific/Seller/Menus";
import AddFood from "../components/specific/Seller/AddFood";
import BuyerMyPage from "../pages/BuyerMyPage";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route index element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {/* Order Domain */}
      <Route path="/orders" element={<OrderCheckoutPage />}>
        <Route path="form" element={<OrderForm />} />
        <Route path="success" element={<TossPaymentsCheckoutSuccess />} />
        <Route path="fail" element={<TossPaymentsCheckoutFail />} />
      </Route>
      {/* Member Domain */}
      <Route path="/mypage" element={<BuyerMyPage />} />
      <Route path="/seller" element={<SellerMyPage />}>
        <Route index element={<Dashboard />} />
        <Route path="menus" element={<Menus />} />
        <Route path="add/food" element={<AddFood />} />
      </Route>
      {/* Store Domain */}
      <Route path="/store" element={<StorePage />} />
    </Routes>
  );
};

export default PageRoutes;
