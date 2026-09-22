import {
  BanknoteArrowDown,
  Clapperboard,
  Receipt,
  ShoppingCart,
  ReceiptText,
  Utensils,
  Car,
  GraduationCap,
  HeartPulse,
  Plane,
} from "lucide-react";

export const transactionIcons = [
  {
    type: "Transfer",
    icon: (
      <BanknoteArrowDown color="#dad30b" className="absolute inset-0 m-auto" />
    ),
    bg: "#FFF5D9",
  },
  {
    type: "Entertainment",
    icon: <Clapperboard color="#49b800" className="absolute inset-0 m-auto" />,
    bg: "#defdc9",
  },
  {
    type: "Income",
    icon: <Receipt color="#588d35" className="absolute inset-0 m-auto" />,
    bg: "#c1d6b3",
  },
  {
    type: "Shopping",
    icon: <ShoppingCart color="#ae0cb0" className="absolute inset-0 m-auto" />,
    bg: "#ffd1ff",
  },
  {
    type: "Bills",
    icon: <ReceiptText color="#331ecc" className="absolute inset-0 m-auto" />,
    bg: "#cdc7f5",
  },
  {
    type: "Food",
    icon: <Utensils color="#f2d40d" className="absolute inset-0 m-auto" />,
    bg: "#fff8c7",
  },
  {
    type: "Transportation",
    icon: <Car color="#1f88a3" className="absolute inset-0 m-auto" />,
    bg: "#b2e5f0",
  },
  {
    type: "Education",
    icon: <GraduationCap color="#7026a1" className="absolute inset-0 m-auto" />,
    bg: "#d6b9e9",
  },
  {
    type: "Health",
    icon: <HeartPulse color="#d71414" className="absolute inset-0 m-auto" />,
    bg: "#f4b8b8",
  },
  {
    type: "Travel",
    icon: <Plane color="#4d91ea" className="absolute inset-0 m-auto" />,
    bg: "#b7d0f0",
  },
];
