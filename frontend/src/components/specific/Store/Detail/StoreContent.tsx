import { useState } from "react";
import TabBar from "./TabBar";
import SubscribeList from "./SubscribeList";
import FoodList from "./FoodList";
import ReviewList from "./ReviewList";

const StoreContent = () => {
  const [selectedTab, setSelectedTab] = useState("subscribe");
  const handleTab = (key: string) => {
    setSelectedTab(key);
  };
  const Content = () => {
    switch (selectedTab) {
      case "subscribe":
        return <SubscribeList />;
      case "foods":
        return <FoodList />;
      case "review":
        return <ReviewList />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <TabBar selectedTab={selectedTab} handleTab={handleTab} />
      <Content />
    </div>
  );
};
export default StoreContent;
