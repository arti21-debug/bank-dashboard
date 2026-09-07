import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
} from "recharts";
import { Card } from "../../../types/data";
import { useEffect, useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface BalanceProps {
  activeCard: Card;
}

export default function BalanceHistory({ activeCard }: BalanceProps) {
  const [fontSize, setFontSize] = useState(13);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 440 ? 10 : 13);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 5 последних месяцев до текущего
  const currentMonth = new Date().getMonth();
  const closestMonths = Array.from({ length: 7 }, (_, i) => {
    // возврат месяцев в естественном порядке и защита от отрицательных индексов при переходе через январь
    return months[(currentMonth - (5 - i) + 12) % 12];
  });

  // Подготовка данных
  const data = closestMonths.map((m, mIndex) => {
    const monthIndex = (currentMonth - (5 - mIndex) + 12) % 12;

    const monthTransactions = activeCard.transactions.filter(
      (t) => new Date(t.date).getMonth() === monthIndex,
    );

    return {
      name: m,
      activity: monthTransactions.reduce(
        (sum, t) => sum + Math.abs(t.amount),
        0,
      ),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 5, left: 10 }}
        accessibilityLayer={false}
      >
        <defs>
          {/* градиент заливки под линией */}
          <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1814F3" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#1814F3" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="5 5"
          stroke="#DFE5EE"
          vertical={(props: any) => {
            // скрываем последнюю вертикальную линию
            if (props.index === data.length - 1) return <line />;
            return (
              <line
                key={props.index}
                x1={props.x1}
                y1={props.y1}
                x2={props.x2}
                y2={props.y2}
                stroke={props.stroke}
                strokeDasharray={props.strokeDasharray}
                strokeWidth={props.strokeWidth}
              />
            );
          }}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickMargin={10}
          interval={0}
          tickLine={false}
          tick={(props) => {
            const { x, y, payload, index } = props;
            const xNum = Number(x);
            const yNum = Number(y);

            if (index === data.length - 1) return <g />;
            return (
              <g>
                {/* линия */}
                <line
                  x1={xNum}
                  y1={yNum - 10}
                  x2={xNum}
                  y2={yNum}
                  stroke="#718EBF"
                  strokeWidth={1}
                />
                {/* текст */}
                <text
                  x={xNum}
                  y={yNum}
                  fill="#718EBF"
                  textAnchor="middle"
                  dy={10}
                  fontSize={fontSize}
                >
                  {payload.value}
                </text>
              </g>
            );
          }}
        />
        <YAxis
          axisLine={false}
          tick={{ fill: "#718EBF", fontSize }}
          tickLine={{ stroke: "#718EBF" }}
        />
        <Tooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              // скрываем tooltip для последнего месяца
              if (payload[0].payload.name === data[data.length - 1].name)
                return null;
              const value = Number(payload[0].value);
              return (
                <div className="bg-white shadow rounded px-3 py-1 text-dark-blue font-semibold text-sm">
                  {value.toFixed(2)}$
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="activity"
          stroke="#1814F3"
          strokeWidth={3}
          fill="url(#colorActivity)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}