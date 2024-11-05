import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useRootStore from "../stores";

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
    <>
      <Outlet />
    </>
  );
};

export default SellerMyPage;
