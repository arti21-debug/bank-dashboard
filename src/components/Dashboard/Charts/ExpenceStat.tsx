import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { PieLabelRenderProps } from "recharts";
import { Card } from "../../../types/data";

interface ExpenceProps {
  activeCard: Card;
}

const categories = [
  { name: "Bill Expense", color: "#FF6B35" },
  { name: "Entertainment", color: "#343C6A" },
  { name: "Investment", color: "#FF00FF" },
  { name: "Others", color: "#1814F3" },
];

const categoryMap: Record<string, string> = {
  Bills: "Bill Expense",
  Entertainment: "Entertainment",
  Investment: "Investment",
  Income: "Others",
  Shopping: "Others",
  Food: "Others",
  Transportation: "Others",
  Education: "Others",
  Health: "Others",
  Travel: "Others",
  Transfer: "Others",
};

const RADIAN = Math.PI / 180;

// смещение сектора наружу создает асимметрию через доп радиус
const outerRadiusOffsets: Record<string, number> = {
  "Bill Expense": 15,
  Entertainment: 10,
  Investment: 0,
  Others: 10,
};

export default function ExpenseStat({ activeCard }: ExpenceProps) {
  // стейт под адаптив с радиусом круга и размером шрифта для разных размеров секторов
  const [outerRadius, setOuterRadius] = useState(100);
  const [fontSize, setFontSize] = useState({
    large: 13,
    medium: 11,
    small: 10,
  });

  // смена радиуса круга и font-size сектора через подписку на resize событие
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setOuterRadius(90);
        setFontSize({ large: 13, medium: 11, small: 10 });
      } else if (w <= 700) {
        setOuterRadius(75);
        setFontSize({ large: 10, medium: 10, small: 9 });
      } else if (w <= 1080) {
        setOuterRadius(80);
        setFontSize({ large: 11, medium: 10, small: 9 });
      } else {
        setOuterRadius(100);
        setFontSize({ large: 13, medium: 11, small: 10 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // подготовка данных для Pie Charts
  const total = activeCard.transactions.reduce(
    (sum, t) => sum + Math.abs(t.amount),
    0,
  );

  const data = categories
    .map((cat) => {
      const catSum = activeCard.transactions
        .filter((t) => categoryMap[t.category] === cat.name)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const percent = Math.round((catSum / total) * 100);
      // если процент сектора - 0%, скрываем, иначе мин размер сектора
      const displayValue = percent === 0 ? 0 : Math.max(percent, 3);

      return {
        name: cat.name,
        value: displayValue,
        label: `${percent}%`,
        color: cat.color,
      };
    })
    .filter((cat) => cat.value > 0);

  // рендер кастомной формы сектора
  const renderCustomShape = (props: any) => {
    const {
      cx, // центр круга
      cy, // центр круга
      innerRadius, // внутренний радиус (0 для обычного pie)
      outerRadius: or, // базовый внешний радиус
      startAngle, // угол начала сектора
      endAngle, // угол конца сектора
      fill, // цвет из data[].color через Cell
      index, // индекс элемента в data[]
    } = props;

    // доп радиус сектора
    const extraRadius = outerRadiusOffsets[data[index]?.name] ?? 0;

    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={or + extraRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="white" // белая обводка = зазор между секторами
        strokeWidth={6} // толщина зазора
      />
    );
  };

  // кастомный лейбл вызывается для каждого сектора автоматически Recharts-ом
  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius: or,
    index,
  }: PieLabelRenderProps) => {
    const cxNum = Number(cx ?? 0);
    const cyNum = Number(cy ?? 0);
    const midAngleNum = Number(midAngle ?? 0);
    const innerR = Number(innerRadius ?? 0);
    const outerR = Number(or ?? 0);
    const idx = Number(index ?? 0);

    const sectorValue = data[idx].value;

    // не рендерим текст если сектор слишком маленький — текст не влезет
    if (sectorValue < 8) return null;

    const offset = outerRadiusOffsets[data[idx]?.name] ?? 0;

    // размер шрифта зависит от размера сектора
    const fs =
      sectorValue <= 15
        ? fontSize.small
        : sectorValue <= 20
          ? fontSize.medium
          : fontSize.large;

    // радиус точки размещения лейбла = середина сектора
    // 0.55 — коэффициент: 0 = центр круга, 1 = край сектора
    const radius = innerR + (outerR + offset - innerR) * 0.55;

    // перевод полярных координат в декартовы
    const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
    const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

    // // обрезаем длинные названия с многоточием
    const name = data[idx].name;
    const maxChars = sectorValue <= 15 ? 6 : sectorValue <= 25 ? 10 : 20;
    const displayName =
      name.length > maxChars ? name.slice(0, maxChars) + "…" : name;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {/* процент — первая строка, реальное значение */}
        <tspan x={x} dy="-0.5em" fontWeight="bold" fontSize={fs}>
          {data[idx].label}
        </tspan>
        {/* название категории — вторая строка */}
        <tspan x={x} dy="1.4em" fontWeight="bold" fontSize={fs - 1}>
          {displayName}
        </tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          dataKey="value" // поле из data[] определяющее размер сектора
          labelLine={false} // убираем линии от сектора к лейблу
          label={renderLabel} // наша кастомная функция лейблов
          shape={renderCustomShape} // наша кастомная форма сектора
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} /> // цвет i-го сектора
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}