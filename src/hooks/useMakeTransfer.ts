import { useState } from "react";
import { useCardsStore } from "../store/useCardsStore";
import { Card } from "../types/data";
import usePopup from "./usePopup";
import { validateTransfer } from "../utils/money";
import { getContactById } from "../config/contacts";

export default function useMakeTransfer(
  selectedUser: number | null,
  amountValue: string,
  setAmountValue: (val: string) => void,
  cards: Card[],
) {
  const [error, setError] = useState<string | null>(null);
  const [popupKind, setPopupKind] = useState<"success" | "error">("success");
  const activeCard = cards.find((c) => c.active);
  const makeTransfer = useCardsStore((state) => state.makeTransfer);
  const { isPopOpen, setIsPopOpen, isVisible, setIsVisible } = usePopup();

  // показываем попап: сначала монтируем скрытым, через 10 мс включаем видимость
  const showPopup = (kind: "success" | "error") => {
    setPopupKind(kind);
    setIsPopOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const handleMakeTransfer = () => {
    if (!activeCard) return;
    // сбрасываем ошибку от предыдущей попытки
    setError(null);

    const recipient = getContactById(selectedUser);

    const result = validateTransfer(
      amountValue,
      activeCard.balance,
      recipient !== undefined,
    );
    if (!result.ok) {
      setError(result.error);
      // нехватка средств дополнительно показывается попапом
      if (result.error === "Not enough funds") showPopup("error");
      return;
    }

    // очищаем поле и добавляем транзакцию к активной карте
    setAmountValue("");
    makeTransfer(activeCard.id, {
      id: crypto.randomUUID(),
      description: "Deposit from my Card",
      category: "Transfer",
      amount: result.amount,
      recipientId: recipient!.id,
      date: Date.now(), // время перевода в миллисекундах
      status: "Completed",
    });
    showPopup("success");
  };

  return { handleMakeTransfer, error, setError, isPopOpen, isVisible, popupKind };
}
