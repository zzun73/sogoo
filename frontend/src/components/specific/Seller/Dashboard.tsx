import SalesOverview from "./Dashboard/SalesOverview";
import MonthlySales from "./Dashboard/MonthlySales";
import ScheduledProducts from "./Dashboard/ScheduledProduct";
import TodaySalesStatus from "./Dashboard/TodaySalesStatus";
import ReviewChart from "./Dashboard/ReviewChart";
import useRootStore from "../../../stores";
const Dashboard: React.FC = () => {
  const { selectedStoreId } = useRootStore();
  if (!selectedStoreId) {
    return (
      <div className="flex justify-center items-center bg-white rounded-3xl h-[500px] mx-[200px] my-5">
        <p className="text-sub font-bold">가게를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-5 w-full px-[200px] md-5">
      <SalesOverview storeId={selectedStoreId} />
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
