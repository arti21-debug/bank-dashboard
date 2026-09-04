import { useState } from "react";
import { useCardsStore } from "../../store/useCardsStore";
import CardsBlock from "../CardsBlock";
import Header from "../Header";
import Nav from "../Nav";
import MyExpense from "./MyExpense";

export default function TransactionPage() {
  const [activeTransactions, setActiveTransactions] = useState("all");

  const cards = useCardsStore((state) => state.cards);
  const activeCard = cards.find((c) => c.active);
  if (!activeCard) return;

  return (
    <div className="flex items-start">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main>
          <div className="container">
            <section className="flex justify-between pt-6 max-[960px]:flex-row max-[770px]:flex-col max-[770px]:gap-6">
              <div className="flex-2 min-w-0 mr-6 max-[1200px]:max-w-121.75 max-[400px]:w-full">
                <CardsBlock action={"+ Add Card"} />
              </div>
              <div className="flex-1 min-w-0 max-[960px]:max-w-121.75 max-[400px]:w-full">
                <h2 className="text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
                  My Expense
                </h2>
                <div className="bg-background-white w-full h-58.75 rounded-3xl max-[1200px]:h-42.5">
                  <MyExpense activeCard={activeCard} />
                </div>
              </div>
            </section>
            <section className="pt-6">
              <h2 className="text-[22px] font-semibold max-[1024px]:text-lg max-[375px]:text-base">
                Recent Transactions
              </h2>
              <div className="pt-6.75">
                <div className="flex gap-20.5 font-medium border-b border-[#EBEEF2]">
                  <button
                    onClick={() => setActiveTransactions("all")}
                    className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "all" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"}`}
                  >
                    All Transactions
                  </button>
                  <button
                    onClick={() => setActiveTransactions("income")}
                    className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "income" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"}`}
                  >
                    Income
                  </button>
                  <button
                    onClick={() => setActiveTransactions("expense")}
                    className={`cursor-pointer pb-2.75 border-b-3 ${activeTransactions === "expense" ? "text-gray-blue border-gray-blue" : "text-grey border-transparent"}`}
                  >
                    Expense
                  </button>
                </div>
                <div className="w-full h-100 mt-6.25 mb-7.5 rounded-2xl bg-white">
                  <ul className="flex justify-between pt-5.5">
                    {[
                      "Description",
                      "Transaction ID",
                      "Type",
                      "Card",
                      "Date",
                      "Amount",
                      "Receipt",
                    ].map((el) => (
                      <li key={el} className="font-medium text-grey">
                        {el}
                      </li>
                    ))}
                  </ul>
                  <div className="border-b border-[#EBEEF2] pt-2.75"></div>
                  {activeCard.transactions
                    .map((t) => (
                      <div key={t.date} className="flex justify-between">
                        <div>{t.description}</div>
                        <div>#12548796</div>
                        <div>{t.category}</div>
                        <div>1234 ****</div>
                        <div>{t.date}</div>
                        <div>{t.amount}</div>
                        <div>Download</div>
                      </div>
                    ))
                    .slice(0, 5)}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}