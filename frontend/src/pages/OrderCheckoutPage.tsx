import { Outlet, useNavigate } from "react-router-dom";
import useRootStore from "../stores";
import { useEffect } from "react";

const OrderCheckoutPage = () => {
  const navigate = useNavigate();
  const isLogin = useRootStore((state) => state.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/sign");
    }
  }, [navigate, isLogin]);

  return (
    <div className="flex flex-col items-center mx-[300px] py-14">
      <Outlet />
    </div>
  );
};

export default OrderCheckoutPage;
