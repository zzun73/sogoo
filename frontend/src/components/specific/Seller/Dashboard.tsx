import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceStore from "./MenuComponents/ChoiceStore";
import Button from "@mui/material/Button";

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
    <div className="w-full p-5">
      <ChoiceStore onStoreSelect={handleStoreSelect} />
      {selectedStoreId && (
        <p className="mb-5">현재 선택된 가게 ID: {selectedStoreId}</p>
      )}
      <Button onClick={handleNavigate} variant="contained" size="large">
        판매상품 관리
      </Button>
    </div>
  );
};

export default Dashboard;
