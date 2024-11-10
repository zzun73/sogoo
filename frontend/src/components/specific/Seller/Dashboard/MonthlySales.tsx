import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Box from "../../../common/Box";
import { Skeleton } from "@mui/material";
import { useGetMonthlySales } from "../../../../queries/queries";
import formatters from "../../../../utils/formatters";

interface MonthlySalesProps {
  storeId: number;
}

const SkeletonUI = () => {
  return (
    <Box className="flex flex-col items-center justify-between w-full h-[300px] gap-y-3">
      <Skeleton variant="text" width="80px" height={40} />
      {/* 막대형 차트 스켈레톤 */}
      <div className="flex gap-2 justify-center items-end w-full">
        {[...Array(12)].map((_, index) => (
          <div key={`bar${index}`} className="flex flex-col items-center">
            <Skeleton
              variant="rectangular"
              width="20px"
              height={Math.random() * 100 + 50}
            />
            <Skeleton variant="text" width="15px" height={15} />
          </div>
        ))}
      </div>
    </Box>
  );
};

const MonthlySales = ({ storeId }: MonthlySalesProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const sales = useGetMonthlySales(storeId);
  console.log(sales);

  useEffect(() => {
    if (!sales) return;
    const { foodSales, subscribeSales } = sales;
    const label = formatters.formatMonthLabels();
    const updatedFoodSales = formatters.formatMonthData(foodSales);
    const updatedSubSales = formatters.formatMonthData(subscribeSales);

    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: label,
      datasets: [
        {
          label: "개별 상품",
          backgroundColor: "#0353a4",
          data: updatedFoodSales,
        },
        {
          label: "구독 상품",
          backgroundColor: "#ff8552",
          data: updatedSubSales,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false, // Aspect ratio 유지 여부 (false로 설정 시 커스터마이징 가능)
      scales: {
        y: { stacked: true },
        x: { stacked: true, ticks: { maxRotation: 0, minRotation: 0 } },
      },
    };

    const chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      chart.destroy();
    };
  }, [sales]);

  if (!sales) {
    return <SkeletonUI />;
  }
  return (
    <Box className="flex flex-col justify-between w-full h-[300px] gap-y-3">
      <p className="text-xl text-center font-bold">월별 매출</p>
      <div className="flex h-5/6 items-center">
        <canvas ref={chartRef} id="myChart" className="w-full h-full" />
      </div>
    </Box>
  );
};

export default MonthlySales;
