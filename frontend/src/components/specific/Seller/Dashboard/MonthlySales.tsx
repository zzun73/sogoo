import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Box from "../../../common/Box"; // 필요한 경우 MUI 사용

const MonthlySales = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      labels: [
        "30",
        "29",
        "28",
        "27",
        "26",
        "25",
        "24",
        "23",
        "22",
        "21",
        "20",
        "19",
      ],
      datasets: [
        {
          label: "개별 상품",
          backgroundColor: "#0353a4",
          data: [
            9000, 5000, 5240, 3520, 2510, 3652, 4555, 7850, 8850, 4000, 5000,
            4520,
          ],
        },
        {
          label: "구독 상품",
          backgroundColor: "#ff8552",
          data: [
            3000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500,
            6300,
          ],
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
  }, []);

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
