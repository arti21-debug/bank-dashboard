import { useEffect, useState } from "react";
import { useCardsStore } from "../store/useCardsStore";
import { Card } from "../types/data";

export default function useMakeTransfer(
  selectedUser: number | null,
  amountValue: string,
  cards: Card[],
) {
  const [error, setError] = useState<string | null>(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsPopOpen(false), 300);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isPopOpen]);


  const activeCard = cards.find((c) => c.active);
  const makeTransfer = useCardsStore((state) => state.makeTransfer);

  const handleMakeTransfer = () => {
    setError(null);

    try {
      if (!activeCard) throw new Error("Active card not found");

      if (selectedUser === null) throw new Error("Select a user for transfer");
      if (amountValue === "") throw new Error("Type amount");
      if (activeCard.balance < Number(amountValue))
        throw new Error("Not enough funds");

      makeTransfer(activeCard?.id, {
        description: "Deposit from my Card",
        category: "Transfer",
        amount: Number(amountValue),
        date: Date.now(),
      });

      setIsPopOpen(true);
      setTimeout(() => setIsVisible(true), 10);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);

        if (err.message === "Not enough funds") {
          setIsPopOpen(true);
          setTimeout(() => setIsVisible(true), 10);
        }
      }
    }
  };

  return { handleMakeTransfer, error, setError, isPopOpen, isVisible };
}