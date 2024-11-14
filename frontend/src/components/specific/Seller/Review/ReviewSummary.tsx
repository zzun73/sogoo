import Box from "../../../common/Box";
import Chart, { ChartOptions, TooltipItem } from "chart.js/auto";
import { useRef, useEffect } from "react";
import { RiChatSmile3Fill } from "react-icons/ri";

interface SummaryProps {
  summary: {
    positiveCnt: number;
    negativeCnt: number;
    aiSummary: string;
  };
}

const ReviewSummary = ({ summary }: SummaryProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!summary) {
      return;
    }
    if (summary.positiveCnt + summary.negativeCnt == 0) {
      return;
    }

    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: ["긍정", "부정"],
      datasets: [
        {
          label: "Sentiment Analysis",
          data: [summary.positiveCnt, summary.negativeCnt],
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
  }, [summary]);

  if (!summary || summary.positiveCnt + summary.negativeCnt == 0) {
    return (
      <Box className="flex flex-col items-center justify-center w-full h-[300px]">
        <p className="text-lg font-bold">작성된 리뷰가 없습니다.</p>
      </Box>
    );
  }
  const { positiveCnt, negativeCnt, aiSummary } = summary;

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 my-7">
        <div className="text-center my-auto mx-auto flex flex-col justify-between items-center h-full">
          <p className="text-xl text-center">전체 리뷰 수</p>
          <RiChatSmile3Fill className="inline-block w-16 h-16" />
          <p className="text-3xl mb-3">{positiveCnt + negativeCnt} 개</p>
        </div>
        <div className="flex flex-col border-l-2 border-r-2">
          <p className="text-xl text-center">리뷰 감정 분석</p>
          <div className="flex h-[180px] items-center my-auto">
            <canvas
              ref={chartRef}
              id="sentimentChart"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-xl text-center">AI 리뷰 분석</p>
          <div className="flex items-center border rounded-lg border-main-400 h-[200px] mx-5 p-3 overflow-y-scroll">
            <p>
              {aiSummary !== "없음" ? aiSummary : "AI 리뷰를 생성중입니다."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
