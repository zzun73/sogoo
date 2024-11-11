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
import StoreList from "../components/specific/Store/StoreList";
import StoreDetail from "../components/specific/Store/StoreDetail";
import AddFoodPage from "../pages/AddFoodPage";
import AddSubscribePage from "../pages/AddSubscribePage";
import BuyerMyPage from "../pages/BuyerMyPage";
import NotFoundPage from "../pages/NotFoundPage";
import ShoppingCart from "../components/specific/Order/ShoppingCart";
import TossPaymentsBillingCheckoutSuccess from "../components/specific/Order/TossPaymentsBilling/TossPaymentsBillingCheckoutSuccess";
import SubscribeDetail from "../pages/SubscribeDetailPage";
import ReviewList from "../components/specific/Seller/ReviewList";

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
        <Route
          path="billing/success"
          element={<TossPaymentsBillingCheckoutSuccess />}
        />
        <Route path="fail" element={<TossPaymentsCheckoutFail />} />
        <Route path="cart" element={<ShoppingCart />} />
      </Route>
      {/* Member Domain */}
      <Route path="/mypage" element={<BuyerMyPage />} />
      <Route path="/seller" element={<SellerMyPage />}>
        <Route index element={<Dashboard />} />
        <Route path="reviews" element={<ReviewList />} />
        <Route path="menus" element={<Menus />} />
        <Route path="add/food" element={<AddFoodPage />} />
        <Route path="add/subscribe" element={<AddSubscribePage />} />
        <Route path="subscribe/detail" element={<SubscribeDetail />} />
      </Route>
      {/* Store Domain */}
      <Route path="/store" element={<StorePage />}>
        <Route index element={<StoreList />} />
        <Route path=":id" element={<StoreDetail />} />
      </Route>
      <Route path="/store" element={<StorePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
