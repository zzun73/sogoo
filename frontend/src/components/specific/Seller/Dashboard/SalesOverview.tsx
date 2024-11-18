import formatters from "../../../../utils/formatters";
import { CiDeliveryTruck } from "react-icons/ci";
import Box from "../../../common/Box";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { useGetSalesOverview } from "../../../../queries/queries";
import { Skeleton } from "@mui/material";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import sogoo from "../../../../services/sogoo";

const SkeletonUI = () => {
  return (
    <Box className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-2">
        <Skeleton variant="rectangular" width="40px" height={30} />
        <div className="flex flex-row justify-between w-full items-end">
          <div className="flex flex-row gap-x-2 items-end">
            <Skeleton variant="text" width="80px" height={30} />
            <Skeleton variant="text" width="60px" height={30} />
          </div>
          <Skeleton variant="rectangular" width="10%" height={30} />
        </div>
      </div>
      <div className="flex flex-row mx-2 justify-between gap-x-3 h-20">
        <div className="w-full flex flex-col justify-between">
          <Skeleton variant="text" width="60px" height={30} />
          <Skeleton
            variant="text"
            width="150px"
            height={50}
            sx={{ marginLeft: "auto" }}
          />
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <Skeleton variant="text" width="60px" height={30} />
          <Skeleton
            variant="text"
            width="150px"
            height={50}
            sx={{ marginLeft: "auto" }}
          />
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <Skeleton variant="text" width="60px" height={30} />
          <Skeleton
            variant="text"
            width="150px"
            height={50}
            sx={{ marginLeft: "auto" }}
          />
        </div>
      </div>
    </Box>
  );
};

interface SalesOverviewProps {
  storeId: number;
}

const SalesOverview = ({ storeId }: SalesOverviewProps) => {
  const navigate = useNavigate();

  const { mutate: handleDownload } = useMutation({
    mutationFn: (storeId: StoreId) => sogoo.getDeliveryOrdersFile(storeId),
    onSuccess: async (response) => {
      if (response == 200) {
        console.log("다운로드 성공", response);
      }
    },
    onError: (error: AxiosError) => console.error("다운로드 실패", error),
  });

  const initiateDownloadFile = () => {
    handleDownload(storeId);
  };

  const overview = useGetSalesOverview(storeId);
  if (!overview) {
    return <SkeletonUI />;
  }

  const handleNavigate = () => {
    navigate(`/seller/menus`);
  };

  const { todaySales, subscribePeopleCnt, todayTradeCnt } = overview;
  const currentDate = formatters.formatToDate(new Date());
  return (
    <Box className="flex flex-col gap-y-4">
      <div className="flex flex-row gap-x-2">
        <CiDeliveryTruck className="w-8 h-8" />
        <div className="flex flex-row justify-between w-full items-end">
          <div className="flex flex-row gap-x-4 items-end">
            <p className="text-xl font-bold">판매 현황</p>
            <p className="text-sm text-gray-500">기준일 | {currentDate}</p>
          </div>
          <div className="space-x-3">
            <Button
              onClick={initiateDownloadFile}
              variant="contained"
              size="small"
            >
              출고 물품 빼기
            </Button>
            <Button onClick={handleNavigate} variant="contained" size="small">
              판매 상품 관리
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-2 justify-between gap-x-3 h-20">
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">당일 매출</p>
          <p className="text-right text-2xl font-bold">
            {formatters.formatToCurrency(todaySales, " 원")}
          </p>
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">구독자 수</p>
          <p className="text-right text-2xl font-bold">
            {formatters.formatToCurrency(subscribePeopleCnt, " 명")}
          </p>
        </div>
        <div className="border-l-2 border-gray-400"></div>
        <div className="w-full flex flex-col justify-between">
          <p className="text-base">당일 주문 건수</p>
          <p className="text-right text-2xl font-bold">
            {formatters.formatToCurrency(todayTradeCnt, " 건")}
          </p>
        </div>
      </div>
    </Box>
  );
};

export default SalesOverview;
