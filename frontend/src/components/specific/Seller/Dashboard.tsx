import SalesOverview from "./Dashboard/SalesOverview";
import MonthlySales from "./Dashboard/MonthlySales";
import ScheduledProducts from "./Dashboard/ScheduledProduct";
import TodaySalesStatus from "./Dashboard/TodaySalesStatus";
import ReviewChart from "./Dashboard/ReviewChart";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-5 w-full px-[200px] py-10">
      <div className="w-full p-5"></div>
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
