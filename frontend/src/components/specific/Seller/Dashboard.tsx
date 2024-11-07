import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceStore from "./MenuComponents/ChoiceStore";
import Button from "@mui/material/Button";

import SalesOverview from "./Dashboard/SalesOverview";
import MonthlySales from "./Dashboard/MonthlySales";
import ScheduledProducts from "./Dashboard/ScheduledProduct";
import TodaySalesStatus from "./Dashboard/TodaySalesStatus";
import ReviewChart from "./Dashboard/ReviewChart";

const Dashboard: React.FC = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStoreSelect = (storeId: string | null) => {
    setSelectedStoreId(storeId);
    console.log("선택된 Store ID:", storeId);
  };

  const handleNavigate = () => {
    navigate(`/seller/menus?store=${selectedStoreId}`);
  };

  return (
    <div className="flex flex-col gap-y-5 w-full px-[200px] bg-slate-200 py-10">
      <div className="w-full p-5">
        <ChoiceStore onStoreSelect={handleStoreSelect} />
        {selectedStoreId && (
          <p className="mb-5">현재 선택된 가게 ID: {selectedStoreId}</p>
        )}
        <Button onClick={handleNavigate} variant="contained" size="large">
          판매상품 관리
        </Button>
      </div>
      <SalesOverview />
      <div className="grid grid-cols-2 gap-x-3 w-full">
        <MonthlySales />
        <ScheduledProducts />
      </div>
      <div className="grid grid-cols-2 gap-x-3 w-full">
        <TodaySalesStatus />
        <ReviewChart />
      </div>
    </div>
  );
};

export default Dashboard;
