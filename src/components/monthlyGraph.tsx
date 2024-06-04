"use client";

import { MonthlyHousePrice as TMonthlyHousePrice } from "@/db/queries/monthlyHousePrice";
import {
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyGraph({
  monthlyHousePrice,
}: {
  monthlyHousePrice: TMonthlyHousePrice;
}) {
  const chartData: ChartData = {
    labels: monthlyHousePrice.map((row) => row.month),
    datasets: [
      {
        label: "ppm2",
        type: "line",
        data: monthlyHousePrice.map((row) => row.averagePricePerM2),
        backgroundColor: "rgba(227, 138, 197, 0.2)",
        borderColor: "rgb(227, 138, 197)",
        yAxisID: "pricePerM2",
      },
      {
        label: "total price",
        type: "bar",
        data: monthlyHousePrice.map((row) => row.averagePrice),
        backgroundColor: "rgba(255, 239, 97, 0.6)",
        borderColor: "rgba(255, 239, 97, 1)",
        yAxisID: "totalPrice",
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      pricePerM2: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "ppm2",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      totalPrice: {
        type: "linear",
        display: true,
        title: {
          display: true,
          text: "total price",
        },
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="w-100">
      <h2 className="text-3xl mb-3">average price over the last 12 months:</h2>
      <Chart data={chartData} options={options} type="bar" />
    </div>
  );
}
