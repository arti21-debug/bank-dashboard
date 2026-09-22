import MaskGroup_1 from "@/icons/people-transfer/MaskGroup_1.svg";
import MaskGroup_2 from "@/icons/people-transfer/MaskGroup_2.svg";
import MaskGroup_3 from "@/icons/people-transfer/MaskGroup_3.svg";
import tg_vector from "@/icons/people-transfer/tg-vector.svg";
import { useState } from "react";
import { CircleAlert } from "lucide-react";
import { CircleCheck } from "lucide-react";
import useMakeTransfer from "../hooks/useMakeTransfer";

import { useCardsStore } from "../store/useCardsStore";
import MobileCarousel from "../features/transfer/MobileCarousel";
import WeeklyActivity from "../features/charts/WeeklyActivity";
import ExpenseStat from "../features/charts/ExpenceStat";
import BalanceHistory from "../features/charts/BalanceHistory";
import CardsBlock from "../components/CardsBlock";
import QuickTransfer from "../features/transfer/QuickTransfer";
import RecentTransactions from "../features/transactions/RecentTransactions";

export const userAvatars = [
  MaskGroup_1,
  MaskGroup_2,
  MaskGroup_3,
  MaskGroup_3,
  MaskGroup_3,
  MaskGroup_3,
];

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [amountValue, setAmountValue] = useState("");

  const cards = useCardsStore((state) => state.cards);
  const { handleMakeTransfer, error, setError, isPopOpen, isVisible } =
    useMakeTransfer(selectedUser, amountValue, setAmountValue, cards);

  const activeCard = cards.find((c) => c.active);
  if (!activeCard) return;

  // recent transaction block - sort latest
  const sortedTransactions = [...activeCard.transactions]
    .sort((a, b) => b.date - a.date)
    .slice(0, 3);

  // date from timestamp
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
    <>
      <main>
        <div className="container">
          <section className="flex justify-between pt-6 max-[960px]:flex-row max-[770px]:flex-col max-[770px]:gap-6">
            <div className="flex-2 min-w-0 mr-6 max-[1200px]:max-w-121.75 max-[400px]:w-full">
              <CardsBlock action={"See All"} />
            </div>
            <div className="flex-1 min-w-0 max-[960px]:max-w-121.75 max-[400px]:w-full">
              <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                Recent Transaction
              </h2>
              <div className="relative bg-bg-block w-full h-58.75 rounded-3xl max-[1200px]:h-42.5">
                <RecentTransactions recentTransactions={recentTransactions} />
              </div>
            </div>
          </section>
          <section className="flex justify-between pt-6 max-[1024px]:flex-row max-[670px]:flex-col max-[670px]:gap-6">
            <div className="flex-2 min-w-0 mr-6 w-full">
              <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                Weekly Activity
              </h2>
              <div className="bg-bg-block w-full h-80.5 rounded-3xl">
                <div className="flex justify-end gap-7.5 pt-7 pb-5.5 pr-7.5">
                  <div className="flex items-center gap-2.5 text-[15px] text-grey max-[1024px]:text-[13px] max-[375px]:text-xs">
                    <span className="block w-3.75 h-3.75 bg-[#16DBCC] rounded-full max-[1024px]:w-3 max-[1024px]:h-3"></span>
                    Deposit
                  </div>
                  <div className="flex items-center gap-2.5 text-[15px] text-grey max-[1024px]:text-[13px] max-[375px]:text-xs">
                    <span className="block w-3.75 h-3.75 bg-gray-blue rounded-full max-[1024px]:w-3 max-[1024px]:h-3"></span>
                    Withdraw
                  </div>
                </div>
                <WeeklyActivity activeCard={activeCard} />
              </div>
            </div>
            <div className="flex-1 min-w-0 max-[960px]:w-57.5 max-[770px]:flex-col max-[400px]:w-full">
              <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                Expense Statistics
              </h2>
              <div className="relative bg-bg-block w-full h-80.5 rounded-3xl max-[400px]:w-full">
                {recentTransactions.length > 0 ? (
                  <ExpenseStat activeCard={activeCard} />
                ) : (
                  <div className="absolute top-1/2 left-1/2 -translate-1/2 whitespace-nowrap font-medium text-lg text-blue-700 max-[1024px]:text-base">
                    No transactions yet...
                  </div>
                )}
              </div>
            </div>
          </section>
          <section className="flex w-full justify-between pt-6 pb-9.75 max-[960px]:flex-row max-[770px]:flex-col max-[770px]:gap-6">
            <div className="w-[clamp(18.438rem,15.028rem+17.05vw,27.813rem)] shrink-0 mr-6 max-[1200px]:flex-1 max-[1200px]:min-w-0 max-[400px]:w-full">
              <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                Quick Transfer
              </h2>
              <div className="bg-bg-block text-black w-full h-69 rounded-3xl pt-8.75 px-6.25">
                <QuickTransfer
                  userAvatars={userAvatars}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
                <MobileCarousel
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
                <div className="flex justify-between items-center pt-7.25 text-grey gap-4 max-[1024px]:pt-12">
                  <div className="shrink-0 max-[1024px]:text-xs">
                    Write Amount
                  </div>
                  <div className="relative w-full">
                    <input
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!/^\d*\.?\d*$/.test(value) || value.startsWith("."))
                          return;

                        setError(null);
                        setAmountValue(e.target.value);
                      }}
                      value={amountValue}
                      placeholder="525.50"
                      className="w-full h-12.5 bg-[#EDF1F7] rounded-full pl-7.5 pr-31.75 outline-none max-[1200px]:placeholder:text-sm max-[1200px]:pr-22 max-[1024px]:h-10 max-[400px]:placeholder:opacity-0"
                    />
                    <button
                      className="absolute w-31.25 h-12.5 right-0 rounded-full bg-gray-blue max-[1200px]:w-[clamp(5rem,5vw,7.8125rem)] max-[1024px]:h-10 max-[500px]:w-15 transition duration-300 hover:bg-[#2c2ab2]"
                      onClick={() => handleMakeTransfer()}
                    >
                      <div className="flex items-center justify-center gap-2.75">
                        <span className="text-white font-medium max-[1200px]:hidden">
                          Send
                        </span>
                        <img
                          src={`${tg_vector}`}
                          alt=""
                          className="max-[500px]:w-5"
                        />
                      </div>
                    </button>
                    {error && (
                      <div className="absolute text-red-500 text-xs pt-1">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3 max-[400px]:w-full">
                Balance History
              </h2>
              <div className="flex items-center bg-bg-block w-full h-69 rounded-3xl text-grey">
                <BalanceHistory activeCard={activeCard} />
              </div>
            </div>
          </section>
        </div>
      </main>
      {isPopOpen && (
        <div
          className={`flex items-center justify-between fixed top-10 right-10 z-50 w-50 h-10 p-5 rounded-full bg-white transition-all duration-300 ease-out ${
            isVisible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2"
          }`}
        >
          {error ? (
            <>
              <CircleAlert color="#f81616" />
              <div className="font-bold text-red-500 text-sm">
                Not enough funds
              </div>
            </>
          ) : (
            <>
              <CircleCheck color="#12d929" />
              <div className="font-bold text-green-500 text-sm">
                Transfer success
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
