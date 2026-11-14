import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../../types/data";
import { useEffect, useState } from "react";

interface InvestmentChartProps {
  activeCard: Card;
}

export default function TotalInvestmentChart({
  activeCard,
}: InvestmentChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  // адаптивный размер
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440 ? true : false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currYear = new Date().getFullYear();
  const closestYears = Array.from({ length: 6 }, (_, i) => {
    return currYear - (5 - i);
  });

  // подготовка данных
  const data = closestYears.map((year) => {
    const yearTransactions = activeCard.investments.filter(
      (t) => t.date === year,
    );

    const totalYearInvest = yearTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    return {
      year: year,
      activity: totalYearInvest,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
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
          tick={{ fill: "#718EBF", fontSize: 13 }}
          hide={isMobile}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value.toLocaleString("en-US")}`}
          tickMargin={10}
          tick={{ fill: "#718EBF", fontSize: 13 }}
        />
        <Line dataKey="activity" stroke="#FCAA0B" strokeWidth={3} />
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
