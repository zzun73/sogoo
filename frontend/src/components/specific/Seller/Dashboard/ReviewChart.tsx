import { useEffect, useRef } from "react";
import Chart, { ChartOptions, TooltipItem } from "chart.js/auto";
import Box from "../../../common/Box";
import { useGetReviewList } from "../../../../queries/queries";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SkeletonUI = () => {
  return (
    <Box className="flex flex-col w-full h-[300px] gap-y-2">
      <div className="mx-auto">
        <Skeleton variant="text" width={150} height={40} />
      </div>
      <div className="flex flex-row mx-auto w-56 justify-evenly gap-x-5">
        <Skeleton variant="text" width={80} height={30} />
        <Skeleton variant="text" width={80} height={30} />
      </div>
      <div className="flex flex-col gap-y-3 items-center">
        <Skeleton variant="circular" width={150} height={150} />
      </div>

      <Skeleton variant="text" width={80} height={30} className="mx-auto" />
    </Box>
  );
};

interface ReviewChartProps {
  storeId: number;
}

const ReviewChart = ({ storeId }: ReviewChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const reviewSummary = useGetReviewList(storeId);

  useEffect(() => {
    if (!reviewSummary) {
      return;
    }
    if (reviewSummary.positiveCnt + reviewSummary.negativeCnt == 0) {
      return;
    }

    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: ["긍정", "부정"],
      datasets: [
        {
          label: "Sentiment Analysis",
          data: [reviewSummary.positiveCnt, reviewSummary.negativeCnt],
          backgroundColor: ["#4CAF50", "#FF5252"],
          hoverBackgroundColor: ["#66BB6A", "#FF867C"],
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: TooltipItem<"doughnut">) => {
              return `${tooltipItem.label}: ${tooltipItem.raw}개`;
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });

    return () => {
      chart.destroy();
    };
  }, [reviewSummary]);

  if (!reviewSummary) {
    return <SkeletonUI />;
  }

  const { positiveCnt, negativeCnt } = reviewSummary;
  if (positiveCnt + negativeCnt == 0) {
    return (
      <Box className="flex flex-col items-center justify-center w-full h-[300px]">
        <p className="text-lg font-bold">작성된 리뷰가 없습니다.</p>
      </Box>
    );
  }

  const goToReviewList = () => {
    navigate("/seller/reviews");
  };
  return (
    <Box className="relative flex flex-col w-full h-[300px] gap-y-3">
      <button
        onClick={goToReviewList}
        className="text-sm font-bold absolute top-5 right-5"
      >
        전체 리뷰 보기
      </button>
      <p className="text-xl text-center font-bold">리뷰 감정 분석</p>
      <div className="flex h-[200px] items-center">
        <canvas ref={chartRef} id="sentimentChart" className="w-full h-full" />
      </div>
      <p className="text-base text-center text-gray-500">
        긍정 : {positiveCnt} | 부정 : {negativeCnt}
      </p>
    </Box>
  );
};

export default ReviewChart;
