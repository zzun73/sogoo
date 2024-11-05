import { useState } from "react";
import ChoiceStore from "./MenuComponents/ChoiceStore";

const Dashboard = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const handleStoreSelect = (storeId: string | null) => {
    setSelectedStoreId(storeId);
    console.log("선택된 Store ID:", storeId);
  };

  return (
    <div>
      <h1>대시보드</h1>
      <ChoiceStore onStoreSelect={handleStoreSelect} />
      {selectedStoreId && <p>현재 선택된 가게 ID: {selectedStoreId}</p>}
    </div>
  );
};

export default Dashboard;
