import { Outlet, useNavigate } from "react-router-dom";
import useRootStore from "../stores";
import { useEffect } from "react";

const OrderCheckoutPage = () => {
  const navigate = useNavigate();
  const isLogin = useRootStore((state) => state.isLogin);
  const isSeller = useRootStore((state) => state.memberInfo?.role === "SELLER");

  useEffect(() => {
    if (!isLogin) {
      navigate("/sign");
    } else if (isSeller) {
      navigate("/");
    }
  }, [navigate, isLogin, isSeller]);

  return (
    <div className="w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="my-10 mx-[200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default OrderCheckoutPage;
