import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card } from "../../types/data";
import { useEffect, useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ActivityProps {
  activeCard: Card;
}

export default function WeeklyActivity({ activeCard }: ActivityProps) {
  const [fontSize, setFontSize] = useState(13);

  // адаптивный размер
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 440 ? 10 : 13);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Подготовка данных
  const data = days.map((day, dayIndex) => {
    const dayTransactions = activeCard.transactions.filter(
      (t) => new Date(t.date).getDay() === dayIndex,
    );

    return {
      name: day,
      deposit: dayTransactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
      withdraw: dayTransactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    };
  });

  return (
    <div className="w-full px-4">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          barGap={4}
          barCategoryGap="35%"
          margin={{ top: 5, right: 0, bottom: 15, left: 0 }}
          accessibilityLayer={false}
        >
          <CartesianGrid vertical={false} stroke="#F3F3F5" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#718EBF", fontSize }}
            tickMargin={10}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#718EBF", fontSize }}
            tickMargin={10}
          />
          {data.some(
            (item) => item.deposit !== 0 || item.withdraw !== 0,
          ) ? null : (
            <ReferenceLine y={0} stroke="#1814F3" strokeWidth={2} />
          )}
          <Bar dataKey="deposit" fill="#16DBCC" radius={[10, 10, 10, 10]} />
          <Bar dataKey="withdraw" fill="#1814F3" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
