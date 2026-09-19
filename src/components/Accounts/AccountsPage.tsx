import Header from "../Header";
import Nav from "../Nav";

import balanceIcon from "@/icons/accounts-page/balance-icon.svg";
import incomeIcon from "@/icons/accounts-page/income-icon.svg";
import expenceIcon from "@/icons/accounts-page/expence-icon.svg";
import totalSavingIcon from "@/icons/accounts-page/total-saving-icon.svg";
import { transactionIcons } from "../Dashboard/Dashboard";
import { useCardsStore } from "../../store/useCardsStore";
import Card from "../Card";
import CardsBlock from "../CardsBlock";
import { useState } from "react";
import OverviewChart from "./OverviewChart";

import invoiceIcon1 from "@/icons/accounts-page/invoice-icon-1.svg";
import invoiceIcon2 from "@/icons/accounts-page/invoice-icon-2.svg";
import invoiceIcon3 from "@/icons/accounts-page/invoice-icon-3.svg";
import invoiceIcon4 from "@/icons/accounts-page/invoice-icon-4.svg";
import useTouchTooltip from "../../hooks/useTouchTooltip";

export default function AccountsPage() {
  const cards = useCardsStore((state) => state.cards);
  const switchCard = useCardsStore((state) => state.switchActive);

  // touch tooltip на чарте
  const {
    isTooltipOpen,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
  } = useTouchTooltip();

  const activeCard = cards.find((c) => c.active);
  const [currCard, setCurrCard] = useState(
    activeCard?.id === 1 ? "light-blue" : "light-white",
  );
  if (!activeCard) return;

  const sortedTransactions = [...activeCard.transactions]
    .sort((a, b) => b.date - a.date)
    .slice(0, 3);

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

  const totalBal = activeCard.balance.toLocaleString("en-US");

  const income = activeCard.transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, el) => sum + el.amount, 0)
    .toLocaleString("en-US");

  const expense = activeCard.transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, el) => sum + Math.abs(el.amount), 0)
    .toLocaleString("en-US");

  // вычисление транзакций за последнюю неделю
  const date = new Date();
  const shift = date.getDay();

  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - shift);
  startOfWeek.setHours(0, 0, 0, 0);

  const debitedLastWeek = activeCard.transactions
    .filter((t) => t.amount < 0 && t.date >= startOfWeek.getTime())
    .reduce((sum, el) => sum + Math.abs(el.amount), 0)
    .toLocaleString("en-US");

  const creditedLastWeek = activeCard.transactions
    .filter((t) => t.amount > 0 && t.date >= startOfWeek.getTime())
    .reduce((sum, el) => sum + el.amount, 0)
    .toLocaleString("en-US");

  return (
    <div className="flex items-start bg-bg">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main>
          <div className="container">
            <section className="flex gap-7.5 w-full mt-6.5 text-grey max-[1050px]:grid max-[1050px]:grid-cols-2 max-[960px]:flex max-[800px]:grid max-[800px]:grid-cols-2 max-[580px]:gap-3.75 max-[440px]:grid-cols-1">
              {[
                {
                  icon: balanceIcon,
                  bg: "#FFF5D9",
                  label: "My Balance",
                  value: `$${totalBal}`,
                },
                {
                  icon: incomeIcon,
                  bg: "#E7EDFF",
                  label: "Income",
                  value: `$${income}`,
                },
                {
                  icon: expenceIcon,
                  bg: "#FFE0EB",
                  label: "Expense",
                  value: `$${expense}`,
                },
                {
                  icon: totalSavingIcon,
                  bg: "#DCFAF8",
                  label: "Total Saving",
                  value: "$7,920",
                },
              ].map(({ icon, bg, label, value }) => (
                <div
                  key={label}
                  className="flex-1 min-w-0 flex items-center justify-center bg-bg-block rounded-2xl py-[clamp(1rem,0.5rem+2.5vw,1.875rem)] px-3 @container h-30 max-[1240px]:h-22.5"
                >
                  <div className="flex items-center min-w-0 max-w-full gap-[clamp(0.5rem,0.25rem+1.25vw,0.938rem)]">
                    <div
                      className="rounded-full flex items-center justify-center shrink-0
            w-[clamp(2.5rem,1.5rem+5vw,4.375rem)]
            h-[clamp(2.5rem,1.5rem+5vw,4.375rem)] max-[1240px]:w-15 max-[1240px]:h-15 max-[1100px]:w-12.5 max-[1100px]:h-12.5"
                      style={{ backgroundColor: bg }}
                    >
                      <img
                        src={icon}
                        alt=""
                        className="w-[clamp(1rem,0.5rem+2.5vw,1.75rem)] h-[clamp(1rem,0.5rem+2.5vw,1.75rem)] max-[1100px]:w-5 max-[1100px]:h-5"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[clamp(0.875rem,10cqw,1rem)] truncate max-[500px]:text-xs">
                        {label}
                      </div>
                      <div className="text-text-primary font-semibold text-[clamp(0.75rem,10cqw,1.563rem)] truncate">
                        {value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            <section className="flex gap-7.5 pt-6 max-[800px]:flex-col">
              <div className="flex-2 min-w-0 max-[800px]:w-121.75 max-[570px]:w-full">
                <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                  Last Transaction
                </h2>
                <div className="relative bg-bg-block w-full h-58.75 overflow-y-hidden overflow-x-auto rounded-3xl max-[1200px]:h-42.5">
                  {recentTransactions.length > 0 ? (
                    <ul className="flex flex-col gap-2.5 py-6.25 px-4 text-grey max-[1200px]:p-4 max-[1200px]:gap-2 max-[400px]:p-2">
                      {recentTransactions.map((tran, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between gap-6 max-[400px]:gap-4"
                        >
                          <div className="flex gap-6.25">
                            {transactionIcons.map(
                              (icon, i) =>
                                icon.type === tran.category && (
                                  <div
                                    key={i}
                                    className="relative w-13.75 h-13.75 max-[1200px]:w-10 max-[1200px]:h-10 shrink-0 rounded-2xl"
                                    style={{ backgroundColor: icon.bg }}
                                  >
                                    {icon.icon}
                                  </div>
                                ),
                            )}
                            <div className="flex flex-col max-[770px]:items-start max-[380px]:items-stretch">
                              <div className="text-text-primary font-medium max-[1200px]:text-sm truncate">
                                {tran.description}
                              </div>
                              <div className="text-grey text-[15px] pt-1.75 max-[1200px]:text-xs truncate">
                                {tran.date}
                              </div>
                            </div>
                          </div>
                          <div className="max-[1200px]:text-xs max-[440px]:hidden">
                            {tran.category}
                          </div>
                          <div className="whitespace-nowrap max-[1200px]:text-xs max-[440px]:hidden">
                            1234 ****
                          </div>
                          <div className="max-[1200px]:text-xs max-[440px]:hidden">
                            {tran.status}
                          </div>
                          <div
                            className={`${tran.amount < 0 ? "text-[#FF4B4A]" : "text-[#41D4A8]"} font-medium shrink-0 max-[1200px]:text-sm pr-4 max-[400px]:pr-2`}
                          >
                            {tran.amount < 0
                              ? `-$${String(tran.amount).slice(1)}`
                              : `+$${tran.amount}`}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 whitespace-nowrap font-medium text-lg text-blue-700 max-[1024px]:text-base">
                      No transactions yet...
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0 max-[800px]:hidden max-[400px]:block">
                <div className="flex items-center justify-between pb-5 max-[375px]:pb-3">
                  <h2 className="text-text-primary text-[22px] font-semibold max-[1024px]:text-lg max-[375px]:text-base">
                    My Cards
                  </h2>
                  <button
                    onClick={() => {
                      setCurrCard((prev) =>
                        prev === "light-blue" ? "light-white" : "light-blue",
                      );
                      switchCard();
                    }}
                    className="text-text-primary text-[17px] font-semibold mr-2 cursor-pointer max-[1024px]:text-[15px] max-[375px]:text-sm transition duration-300 hover:text-[#6060c6]"
                  >
                    Switch Card
                  </button>
                </div>
                <div className="overflow-auto">
                  <Card color={currCard} />
                </div>
              </div>
              <div className="hidden w-121.75 overflow-auto max-[800px]:block max-[570px]:w-full max-[400px]:hidden">
                <CardsBlock action={"See All"} />
              </div>
            </section>
            <section className="flex gap-7.5 pt-6 pb-9 max-[650px]:flex-col">
              <div className="flex-2 min-w-0 max-[1024px]:flex-1">
                <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                  Debit & Credit Overview
                </h2>
                <div className="bg-bg-block w-full h-91 rounded-3xl">
                  <div className="flex justify-between gap-7.5 pt-7 pb-5.5 px-7.5">
                    <div
                      className="relative min-w-0 text-grey max-[1024px]:text-xs group"
                      onPointerDown={handlePointerDown}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerCancel}
                      onPointerLeave={handlePointerCancel}
                    >
                      <div className="truncate">
                        {`$${debitedLastWeek} Debited & $${creditedLastWeek} Credited in this Week`}
                      </div>
                      <span
                        className={`absolute px-7 bottom-full bg-grey text-white w-50 h-5 text-xs rounded-full whitespace-nowrap group-hover:flex ${isTooltipOpen ? "flex justify-center" : "hidden"} group-hover:items-center`}
                      >
                        {`$${debitedLastWeek} Debited & $${creditedLastWeek} Credited`}
                      </span>
                    </div>
                    <div className="flex gap-6.25">
                      <div className="flex items-center gap-2.5 text-grey max-[1024px]:text-xs">
                        <span className="block w-3.75 h-3.75 bg-[#4C78FF] rounded-sm max-[1024px]:w-3 max-[1024px]:h-3"></span>
                        Debit
                      </div>
                      <div className="flex items-center gap-2.5 text-grey max-[1024px]:text-xs">
                        <span className="block w-3.75 h-3.75 bg-[#FCAA0B] rounded-sm max-[1024px]:w-3 max-[1024px]:h-3"></span>
                        Credit
                      </div>
                    </div>
                  </div>
                  <OverviewChart activeCard={activeCard} />
                </div>
              </div>
              <div className="flex-1 min-w-0 max-[650px]:max-w-75">
                <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                  Invoices Sent
                </h2>
                <div className="flex flex-col justify-between gap-5 my-auto bg-bg-block text-grey w-full h-91 rounded-3xl py-7.5 px-6.25 max-[1130px]:py-3 max-[1130px]:px-3  max-[420px]:px-4">
                  {[
                    {
                      icon: invoiceIcon1,
                      bg: "#DCFAF8",
                      label: "Apple Store",
                      time: "5h ago",
                      value: "$450",
                    },
                    {
                      icon: invoiceIcon2,
                      bg: "#FFF5D9",
                      label: "Michael",
                      time: "2 days ago",
                      value: "$160",
                    },
                    {
                      icon: invoiceIcon3,
                      bg: "#E7EDFF",
                      label: "Playstation",
                      time: "5 days ago",
                      value: "$1085",
                    },
                    {
                      icon: invoiceIcon4,
                      bg: "#FFE0EB",
                      label: "William",
                      time: "10 days ago",
                      value: "$90",
                    },
                  ].map(({ icon, bg, label, time, value }) => (
                    <div
                      key={label}
                      className="flex justify-between gap-3 items-center flex-1 min-w-0 max-[1024px]:px-5 max-[700px]:px-0"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`relative w-15 h-15 max-[1200px]:w-11.25 max-[1200px]:h-11.25 shrink-0 rounded-2xl`}
                          style={{ backgroundColor: bg }}
                        >
                          <img
                            src={icon}
                            alt=""
                            className="absolute inset-0 m-auto shrink-0 max-[1200px]:w-4.5 max-[1200px]:h-4.5"
                          />
                        </div>
                        <div className="">
                          <div className="text-[#B1B1B1] font-medium">
                            {label}
                          </div>
                          <div className="text-[15px]">{time}</div>
                        </div>
                      </div>
                      <div className="truncate">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}