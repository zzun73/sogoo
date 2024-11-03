import SubscribeList from "./SubscribeList";
import FoodList from "./FoodLIst";
import ReviewList from "./ReviewList";

interface StoreContentProps {
  selectedTab: string;
}

const StoreContent = ({ selectedTab }: StoreContentProps) => {
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

export default StoreContent;
