import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "../../types/data";

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

interface ExpenseProps {
  activeCard: Card;
}

export default function MyExpense({ activeCard }: ExpenseProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(13);

  // адаптивный fontSize
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 480 ? 10 : 13);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentMonth = new Date().getMonth();
  const closestMonths = Array.from({ length: 6 }, (_, i) => {
    return months[(currentMonth - (5 - i) + 12) % 12];
  });

  // подготовка данных
  const data = closestMonths.map((m, mIndex) => {
    const monthIndex = (currentMonth - (5 - mIndex) + 12) % 12;

    const monthTransactions = activeCard.transactions.filter(
      (t) => new Date(t.date).getMonth() === monthIndex,
    );

    const activity = monthTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      name: m,
      // минимальный размер бара
      activity: activity === 0 ? 50 : activity,
      realActivity: activity, // реальное значение для tooltip
    };
  });

  // кастомный tooltip с позицией точно над баром
  const CustomTooltip = ({ active, payload, coordinate, viewBox }: any) => {
    if (active && payload && payload.length) {
      return (
        // coordinate.x и coordinate.y — координаты курсора внутри SVG
        // transform сдвигает tooltip точно над баром
        <div
          style={{
            position: "absolute",
            left: coordinate?.x,
            top: (viewBox?.y ?? 15),
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
          className="text-dark-blue font-semibold text-base whitespace-nowrap"
        >
          ${payload[0].payload.realActivity.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="25%"
          margin={{ top: 40, right: 10, left: 10, bottom: 15 }}
          accessibilityLayer={false}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={(props) => {
              const { x, y, payload } = props;
              return (
                <text
                  x={x}
                  y={y}
                  fill="#718EBF"
                  textAnchor="middle"
                  dy={10}
                  fontSize={fontSize} // адаптивный шрифт
                >
                  {payload.value}
                </text>
              );
            }}
          />
          <YAxis hide />

          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
            // position убираем — теперь tooltip сам позиционируется через coordinate
          />

          <Bar
            dataKey="activity"
            radius={8}
            minPointSize={5} // минимальная высота бара в пикселях
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={index === activeIndex ? "#16DBCC" : "#E8F0FE"}
                fillOpacity={1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
