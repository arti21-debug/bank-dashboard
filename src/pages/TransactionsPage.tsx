import { useState } from "react";
import { useCardsStore } from "../store/useCardsStore";
import CardsBlock from "../components/CardsBlock";
import MyExpense from "../features/charts/MyExpenseChart";

import arrUp from "@/icons/transactions-page/arr-up.svg";
import arrDown from "@/icons/transactions-page/arr-down.svg";
import arrPagLeft from "@/icons/transactions-page/arr-pag-left.svg";
import arrPagRight from "@/icons/transactions-page/arr-pag-right.svg";
import { generateDemoData } from "../utils/getMockTransactions";
import usePagination from "../hooks/usePagination";
import { generateDemoInvest } from "../utils/getMockInvestments";

// функция под нужный формат даты из timestamp
function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const day = date.toLocaleString("en-US", {
    day: "2-digit",
  });

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  const time = date
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(":", ".");

  return `${day} ${month}, ${time}`;
}

export default function TransactionPage() {
  const [activeTransactions, setActiveTransactions] = useState("all");

  const cards = useCardsStore((state) => state.cards);
  const activeCard = cards.find((c) => c.active);
  // генерация моковых транзакций и инвестиций
  const addMockTrans = useCardsStore((state) => state.addMockTransactions);
  const addMockInvestments = useCardsStore((state) => state.addMockInvestments);

  // фильтрация транзакций и затем сортировка по recent
  const transactions =
    activeTransactions === "all"
      ? activeCard?.transactions
      : activeTransactions === "income"
        ? activeCard?.transactions.filter((t) => t.amount > 0)
        : activeCard?.transactions.filter((t) => t.amount < 0);

  const latestTrans = [...(transactions ?? [])].sort((a, b) => b.date - a.date);
  const {
    currPageT,
    pageGroupStart,
    totalPages,
    currTransPageIndex,
    setCurrTransPageIndex,
    goNext,
    goPrev,
    reset,
  } = usePagination(latestTrans);

  if (!activeCard) return;

  function splitToCardsMockTrans() {
    const data = generateDemoData();
    const arr = Math.ceil(data.length / 2);
    const first = data.slice(0, arr);
    const second = data.slice(arr);

    return { first, second };
  }

  function splitToCardsMockInvests() {
    const investments = generateDemoInvest();
    const arrInvests = Math.ceil(investments.length / 2);
    const firstPart = investments.slice(0, arrInvests);
    const secondPart = investments.slice(arrInvests);

    return { firstPart, secondPart };
  }

  return (
    <main className="pb-[env(safe-area-inset-bottom)]">
      <div className="container">
        <section className="flex justify-between pt-6 max-[960px]:flex-row max-[770px]:flex-col max-[770px]:gap-6">
          <div className="flex-2 min-w-0 mr-6 max-[1200px]:max-w-121.75 max-[400px]:w-full">
            <CardsBlock action={"+ Add Card"} />
          </div>
          <div className="flex-1 min-w-0 max-[960px]:max-w-121.75 max-[400px]:w-full">
            <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
              My Expense
            </h2>
            <div className="bg-bg-block w-full h-58.75 rounded-3xl max-[1200px]:h-42.5">
              <MyExpense activeCard={activeCard} />
            </div>
          </div>
        </section>
        <section className="pt-6">
          <h2 className="text-text-primary text-[22px] font-semibold max-[1024px]:text-lg max-[375px]:text-base">
            Recent Transactions
          </h2>
          <div className="pt-6.75 max-[1024px]:pt-4.5">
            <div className="relative flex gap-20.5 font-medium border-b text-border-color max-[1024px]:gap-15 max-[1024px]:text-[13px] max-[550px]:flex-col max-[550px]:gap-5 max-[550px]:border-none max-[550px]:w-fit max-[550px]:mx-auto">
              <button
                onClick={() => {
                  setActiveTransactions("all");
                  reset();
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "all" ? "text-text-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1`}
              >
                All Transactions
              </button>
              <button
                onClick={() => {
                  setActiveTransactions("income");
                  reset();
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "income" ? "text-text-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1`}
              >
                Income
              </button>
              <button
                onClick={() => {
                  setActiveTransactions("expense");
                  reset();
                }}
                className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "expense" ? "text-text-blue border-gray-blue" : "text-grey border-transparent"} max-[550px]:p-1`}
              >
                Expense
              </button>
              <button
                onClick={() => {
                  const { first, second } = splitToCardsMockTrans();
                  addMockTrans(1, first);
                  addMockTrans(2, second);

                  const { firstPart, secondPart } = splitToCardsMockInvests();
                  addMockInvestments(1, firstPart);
                  addMockInvestments(2, secondPart);
                }}
                className="text-text-secondary absolute right-0 cursor-pointer pb-2.75 border-b-3 max-[550px]:static max-[550px]:border-none max-[550px]:p-0"
              >
                + generate data
              </button>
            </div>
            <div className="relative w-full h-100 mt-6.25 mb-7.5 rounded-2xl bg-bg-block overflow-y-auto max-[550px]:h-75">
              {(transactions?.length ?? 0) > 0 ? (
                <table className="relative w-full border-collapse min-w-175 max-[550px]:hidden">
                  <thead className="sticky top-0 bg-bg-block z-10">
                    <tr className="border-b border-[#EBEEF2] whitespace-nowrap max-[1024px]:text-[13px]">
                      {[
                        "Description",
                        "Transaction ID",
                        "Type",
                        "Card",
                        "Date",
                        "Amount",
                        "Receipt",
                      ].map((el) => (
                        <th
                          key={el}
                          className="font-medium text-grey text-left px-4 pt-5.5 pb-3 first:pl-7.5 last:pr-7.5"
                        >
                          {el}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {currPageT.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-[#EBEEF2] max-[1024px]:text-xs"
                      >
                        <td className="pl-7.5 pr-4 py-4.5">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={t.amount > 0 ? arrUp : arrDown}
                              alt=""
                              className="shrink-0 max-[1024px]:w-5 max-[1024px]:h-5"
                            />
                            <span className="text-text-primary truncate max-w-37.5">
                              {t.description}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4.5 text-dark-blue whitespace-nowrap">
                          #{t.id?.slice(0, 8)}
                        </td>
                        <td className="text-text-primary px-4 py-4.5 whitespace-nowrap">
                          {t.category}
                        </td>
                        <td className="text-text-primary px-4 py-4.5 whitespace-nowrap">
                          {activeCard.number}
                        </td>
                        <td className="text-text-primary px-4 py-4.5 whitespace-nowrap">
                          {formatDate(t.date)}
                        </td>
                        <td
                          className={`px-4 py-4.5 font-medium whitespace-nowrap ${t.amount > 0 ? "text-[#16DBAA]" : "text-[#FE5C73]"}`}
                        >
                          {t.amount > 0
                            ? `+$${t.amount}`
                            : `-$${Math.abs(t.amount)}`}
                        </td>
                        <td className="pl-4 pr-7.5 py-4.5">
                          <button className="text-[#123288] py-2 px-3.5 max-[1024px]:px-3 rounded-full border border-[#123288] whitespace-nowrap text-sm cursor-pointer max-[1024px]:text-xs">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="absolute top-1/2 left-1/2 -translate-1/2 whitespace-nowrap font-medium text-lg text-blue-700 max-[1024px]:text-base">
                  No transactions yet...
                </div>
              )}
              {/* Mobile transactions */}
              <div className="hidden max-[550px]:block">
                {currPageT.map((t) => (
                  <div
                    key={t.date}
                    className="flex items-center justify-between p-5 text-[13px] border-b border-[#EBEEF2] last:border-none max-[380px]:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={t.amount > 0 ? arrUp : arrDown}
                        alt=""
                        className="w-8.75 h-8.75 shrink-0"
                      />
                      <div>
                        <div className="font-medium text-text-primary max-w-37.5">
                          {t.description}
                        </div>
                        <div className="whitespace-nowrap text-grey text-xs">
                          {formatDate(t.date)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-medium whitespace-nowrap ${t.amount > 0 ? "text-[#16DBAA]" : "text-[#FE5C73]"}`}
                    >
                      {t.amount > 0
                        ? `+$${t.amount}`
                        : `-$${Math.abs(t.amount)}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-end gap-6.75 text-gray-blue mb-6.75 max-[1024px]:text-xs max-[1024px]:gap-5.5">
          {pageGroupStart > 0 && (
            <button
              onClick={() => goPrev()}
              className="flex items-center gap-1.75 cursor-pointer"
            >
              <img
                src={`${arrPagLeft}`}
                alt=""
                className="shrink-0 max-[1024px]:w-2.5 max-[1024px]:h-2.5"
              />
              <div>Previous</div>
            </button>
          )}
          {Array.from(
            {
              length: Math.min(5, Math.max(0, totalPages - pageGroupStart)),
            },
            (_, i) => {
              const pageIndex = pageGroupStart + i;
              return (
                <button
                  key={pageIndex}
                  onClick={() => setCurrTransPageIndex(pageIndex)}
                  className={`cursor-pointer text-[15px] ${pageIndex === currTransPageIndex ? "py-2 px-4 rounded-xl text-white bg-gray-blue max-[1024px]:px-3 -mx-2.75" : "text-gray-blue"} max-[1024px]:text-xs`}
                >
                  {pageIndex + 1}
                </button>
              );
            },
          )}

          {pageGroupStart + 5 < totalPages && (
            <button
              onClick={() => goNext()}
              className="flex items-center gap-1.75 cursor-pointer"
            >
              <div>Next</div>
              <img
                src={`${arrPagRight}`}
                alt=""
                className="shrink-0 max-[1024px]:w-2.5 max-[1024px]:h-2.5"
              />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
