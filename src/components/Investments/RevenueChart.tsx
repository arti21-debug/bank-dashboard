import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyRevenueData = [
  { year: "2021", value: 10000 },
  { year: "2022", value: 25000 },
  { year: "2023", value: 20000 },
  { year: "2024", value: 18000 },
  { year: "2025", value: 30000 },
  { year: "2026", value: 15000 },
];

export default function RevenueChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440 ? true : false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={monthlyRevenueData}
        margin={{ top: 40, right: 40, bottom: 35, left: 40 }}
        accessibilityLayer={false}
      >
        <CartesianGrid
          vertical={false}
          stroke="#DFE5EE"
          strokeDasharray="4 4"
        />
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          tickMargin={25}
          interval={0}
          tick={{ fill: "#718EBF", fontSize: 12 }}
          hide={isMobile}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value.toLocaleString("en-US")}`}
          tickMargin={10}
          tick={{ fill: "#718EBF", fontSize: 13 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#16DBCC"
          strokeWidth={3}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;

            const value = payload[0].value;

            return (
              <div className="rounded-lg bg-white px-3 py-2 shadow-md">
                <div>{label}</div>
                <div>{Number(value).toLocaleString("en-US")}$</div>
              </div>
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
