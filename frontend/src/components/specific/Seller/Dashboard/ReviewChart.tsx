import { useEffect, useRef } from "react";
import Chart, { ChartOptions, TooltipItem } from "chart.js/auto";
import Box from "../../../common/Box";
import { useGetReviewList } from "../../../../queries/queries";
import { Skeleton } from "@mui/material";

const SkeletonUI = () => {
  return (
    <Box className="flex flex-col w-full h-[300px] gap-y-2">
      {/* 제목 스켈레톤 */}
      <Skeleton
        variant="text"
        width={180}
        height={30}
        style={{ margin: "0 auto" }}
      />

      {/* 도넛차트 스켈레톤 */}
      <Box className="flex h-2/3 items-center justify-center">
        <Skeleton variant="circular" width={200} height={200} />
      </Box>

      {/* AI 리뷰 스켈레톤 */}
      <Skeleton
        variant="text"
        width={100}
        height={20}
        style={{ margin: "0 auto" }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={15}
        style={{ margin: "0 auto" }}
      />
    </Box>
  );
};

interface ReviewChartProps {
  storeId: number;
}

const ReviewChart = ({ storeId }: ReviewChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
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
  return (
    <Box className="flex flex-col justify-between w-full h-[300px] gap-y-3">
      <p className="text-xl text-center font-bold">리뷰 감정 분석</p>
      <div className="flex h-2/3 items-center">
        <canvas ref={chartRef} id="sentimentChart" className="w-full h-full" />
      </div>
    </Box>
  );
};

export default ReviewChart;
