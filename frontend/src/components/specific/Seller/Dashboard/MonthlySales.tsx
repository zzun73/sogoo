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
        "30/12/2019",
        "29/12/2019",
        "28/12/2019",
        "27/12/2019",
        "26/12/2019",
        "25/12/2019",
        "24/12/2019",
        "23/12/2019",
        "22/12/2019",
        "21/12/2019",
        "20/12/2019",
        "19/12/2019",
      ],
      datasets: [
        {
          label: "Long",
          backgroundColor: "#0353a4",
          data: [
            9000, 5000, 5240, 3520, 2510, 3652, 4555, 7850, 8850, 4000, 5000,
            4520,
          ],
        },
        {
          label: "Short",
          backgroundColor: "#ff8552",
          data: [
            3000, 4000, 6000, 3500, 3600, 8060, 9120, 8900, 9300, 10010, 9500,
            6300,
          ],
        },
      ],
    };

    const options = {
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
    <Box className="w-full gap-y-3">
      <p className="text-xl text-center font-bold">월별 매출</p>
      <div className="flex h-full items-center">
        <canvas ref={chartRef} id="myChart" className="w-full" />
      </div>
    </Box>
  );
};

export default MonthlySales;
