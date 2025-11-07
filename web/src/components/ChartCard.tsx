"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ChartCard() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Incidents",
        data: [12, 19, 9, 14, 11, 7, 6],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
      },
      {
        label: "Vulnerabilities",
        data: [5, 7, 4, 9, 3, 2, 1],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" as const } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="card p-4">
      <div className="text-sm text-zinc-500 mb-2">Weekly Trends</div>
      <Line data={data} options={options} />
    </div>
  );
}
