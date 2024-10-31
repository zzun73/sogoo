import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignPage from "../pages/SignPage";
import OrderCheckoutPage from "../pages/OrderCheckoutPage";
import OrderForm from "../components/specific/Order/OrderForm";
import StorePage from "../pages/StorePage";
const PageRoutes = () => {
  return (
    <Routes>
      {/* Common Domain */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign" element={<SignPage />} />
      {/* Order Domain */}
      <Route path="/orders" element={<OrderCheckoutPage />}>
        <Route path="form" element={<OrderForm />} />
      </Route>
      {/* Store Domain */}
      <Route path="/store" element={ <StorePage/>}/>
    </Routes>
  );
};

export default PageRoutes;
