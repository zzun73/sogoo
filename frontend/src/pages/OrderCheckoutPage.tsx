import { Outlet } from "react-router-dom";

const OrderCheckoutPage = () => {
  return (
    <div className="flex flex-col items-center py-14">
      <Outlet />
    </div>
  );
};

export default OrderCheckoutPage;
