import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignPage from "../pages/SignPage";
import OrderCheckoutPage from "../pages/OrderCheckoutPage";
import OrderForm from "../components/specific/Order/OrderForm";
import TossPaymentsCheckoutSuccess from "../components/specific/Order/TossPayments/TossPaymentsCheckoutSuccess";
import TossPaymentsCheckoutFail from "../components/specific/Order/TossPayments/TossPaymentsCheckoutFail";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {/* Order Domain */}
      <Route path="/orders" element={<OrderCheckoutPage />}>
        <Route path="form" element={<OrderForm />} />
        <Route path="success" element={<TossPaymentsCheckoutSuccess />} />
        <Route path="fail" element={<TossPaymentsCheckoutFail />} />
      </Route>
    </Routes>
  );
};

export default PageRoutes;
