import formatters from "../../../../utils/formatters";
import { CiDeliveryTruck } from "react-icons/ci";
import Box from "../../../common/Box";

const SalesOverview = () => {
  const currentDate = formatters.formatToDate(new Date());
  return (
    <Box className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-2">
        <CiDeliveryTruck className="w-8 h-8" />
        <div className="flex flex-row gap-x-2 items-end">
          <p className="text-xl font-bold">판매 현황</p>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>
      </div>
      <div className="flex flex-row mx-2 justify-between gap-x-3 h-20">
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">당일 매출</p>
          <p className="text-right text-2xl font-bold">168000000 원</p>
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">구독자 수</p>
          <p className="text-right text-2xl font-bold">168000000 원</p>
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">당일 주문 건수</p>
          <p className="text-right text-2xl font-bold">16 건</p>
        </div>
      </div>
    </Box>
  );
};

export default SalesOverview;
