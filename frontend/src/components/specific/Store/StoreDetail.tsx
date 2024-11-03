import { useState } from "react";

import StoreInfo from "./Detail/StoreInfo";
import StoreContent from "./Detail/StoreContent";
import TabBar from "./Detail/TabBar";

const StoreDetail = () => {
  const [selectedTab, setSelectedTab] = useState("subscribe");
  const handleTab = (key: string) => {
    setSelectedTab(key);
  };
  return (
    <div>
      <StoreInfo />
      <TabBar selectedTab={selectedTab} handleTab={handleTab} />
      <StoreContent />
    </div>
  );
};

export default StoreDetail;
