import { Outlet, useNavigate } from "react-router-dom";
import useRootStore from "../stores";

const OrderCheckoutPage = () => {
  const navigate = useNavigate();
  const isLogin = useRootStore((state) => state.isLogin);

  if (!isLogin) {
    return navigate("/sign");
  }

  return (
    <div className="flex flex-col items-center py-14">
      <Outlet />
    </div>
  );
};

export default OrderCheckoutPage;
