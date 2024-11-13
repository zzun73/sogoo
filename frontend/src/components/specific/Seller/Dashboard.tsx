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
      <div className="flex justify-center items-center bg-white rounded-3xl h-[500px] mx-[200px] my-5 min-w-[1100px]">
        <p className="text-sub font-bold">가게를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mx-[200px] min-w-[1100px] mb-10">
      <h2 className="font-shilla text-5xl text-center">대시보드</h2>
      <div className="flex flex-col gap-4">
        <SalesOverview storeId={selectedStoreId} />
        <div className="grid grid-cols-2 gap-4 w-full">
          <MonthlySales storeId={selectedStoreId} />
          <ScheduledProducts storeId={selectedStoreId} />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <TodaySalesStatus storeId={selectedStoreId} />
          <ReviewChart storeId={selectedStoreId} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
