import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useRootStore from "../stores";

import UserInfo from "../components/specific/Buyer/MyPage/UserInfo";
import SubscriptionList from "../components/specific/Buyer/MyPage/SubscriptionList";
import FoodTradeList from "../components/specific/Buyer/MyPage/FoodTradeList";
import ReviewManagement from "../components/specific/Buyer/MyPage/ReviewManagement";
import { useGetBuyerMyPage } from "../queries/queries";

// import { buyerMyPageData } from "../../src/assets/dummyData";

const BuyerMyPage = () => {
  const navigate = useNavigate();
  const { memberInfo, isLogin } = useRootStore();
  const { data, isLoading } = useGetBuyerMyPage();

  useEffect(() => {
    if (!isLogin) {
      navigate("/sign");
    } else if (memberInfo?.role === "SELLER") {
      navigate("/");
    }
  }, [navigate, isLogin, memberInfo?.role]);

  if (isLoading) {
    return <div>Loading...</div>; // 또는 별도의 로딩 컴포넌트
  }

  // const data: BuyerDetailInfo = buyerMyPageData;
  console.log(data);

  return (
    <div className="w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="my-10 px-[200px] w-full">
        <h2 className="text-5xl font-shilla font-bold text-center mb-8">마이페이지</h2>
        <div className="min-w-[800px] grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <UserInfo memberInfo={memberInfo} />
          </div>
          <div className="col-span-1">
            <SubscriptionList subscriptions={data?.subscribes || []} />
          </div>
          <div className="col-span-1">
            <FoodTradeList foodTrades={data?.foodTrades || []} />
          </div>
          <div className="col-span-2">
            <ReviewManagement reviews={data?.reviews || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMyPage;
