import { RefObject, useEffect } from "react";
import { useCardsStore } from "../store/useCardsStore";
import { transactionIcons } from "../config/transactionIcons";
import { formatSigned } from "../utils/money";

type NotifyProps = {
  setIsNotifyDropdownOpen: (val: boolean) => void;
  dropdownRef: RefObject<HTMLDivElement | null>;
};

export default function NotifyDropdown({
  setIsNotifyDropdownOpen,
  dropdownRef,
}: NotifyProps) {
  // закрытие по клику вне dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsNotifyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cards = useCardsStore((state) => state.cards);
  const activeCard = cards.find((c) => c.active);
  if (!activeCard) return;

  // сортировка последних 3 транзакций
  const sortedTransactions = [...activeCard.transactions]
    .sort((a, b) => b.date - a.date)
    .slice(0, 3);

  // перевод в дату от timestamp
  const recentTransactions = sortedTransactions.map((t) => {
    return {
      ...t,
      date: new Date(t.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return (
    <div
      className="absolute top-full right-0 z-10 max-h-62.5 mt-2 overflow-y-auto rounded-[5px] bg-bg p-1"
      role="listbox"
    >
      {recentTransactions.length > 0 && (
        <div className="flex flex-col gap-4 px-4 py-3 text-nowrap">
          {recentTransactions.map((tran, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              {transactionIcons.map(
                (icon) =>
                  icon.type === tran.category && (
                    <div
                      key={icon.type + icon.bg}
                      className={`relative w-13.75 h-13.75 max-[1200px]:w-10 max-[1200px]:h-10 shrink-0 rounded-full`}
                      style={{ backgroundColor: icon.bg }}
                    >
                      {icon.icon}
                    </div>
                  ),
              )}
              <div className="flex flex-col min-w-0 flex-1 max-[770px]:items-center max-[380px]:items-stretch">
                <div className="text-text-primary font-medium max-[1200px]:text-sm truncate">
                  {tran.description}
                </div>
                <div className="text-grey text-[15px] pt-1.75 max-[1200px]:text-xs truncate">
                  {tran.date}
                </div>
              </div>
              <div
                className={`${tran.amount < 0 ? "text-[#FF4B4A]" : "text-[#41D4A8]"} font-medium shrink-0 max-[1200px]:text-sm`}
              >
                {formatSigned(tran.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
