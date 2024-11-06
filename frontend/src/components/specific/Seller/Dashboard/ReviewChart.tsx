import React, { useEffect, useRef, useMemo } from "react";
import Chart, { ChartOptions, TooltipItem } from "chart.js/auto";
import Box from "../../../common/Box";

const ReviewChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const chartData = useMemo(
    () => ({
      positiveCnt: 24,
      negativeCnt: 20,
      aiSummary: "맛이 짜요",
    }),
    []
  );

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: ["Positive", "Negative"],
      datasets: [
        {
          label: "Sentiment Analysis",
          data: [chartData.positiveCnt, chartData.negativeCnt],
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
  }, [chartData]);

  return (
    <Box className="flex flex-col w-full h-[300px] gap-y-1">
      <p className="text-xl text-center font-bold">감정 분석 결과</p>
      <div className="flex h-2/3 items-center">
        <canvas ref={chartRef} id="sentimentChart" className="w-full h-full" />
      </div>
      <p className="text-center font-bold">AI 리뷰</p>
      <p className="text-center text-sm">{chartData.aiSummary}</p>
    </Box>
  );
};

export default ReviewChart;
