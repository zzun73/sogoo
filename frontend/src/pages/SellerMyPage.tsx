import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRootStore from "../stores";
import ChoiceStore from "../components/specific/Seller/MenuComponents/ChoiceStore";

const SellerMyPage = () => {
  const navigate = useNavigate();
  const { memberInfo, isLogin } = useRootStore();

  useEffect(() => {
    if (!isLogin) {
      navigate("/sign");
    } else if (memberInfo?.role !== "SELLER") {
      navigate("/");
    }
  }, [navigate, isLogin, memberInfo?.role]);

  return (
    <div className="min-h-dvh w-full bg-sub-100">
      <ChoiceStore />
      <Outlet />
    </div>
  );
};

export default SellerMyPage;
