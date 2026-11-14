import investSect1Icon1 from "@/icons/investments-page/invest-sect1-icon-1.svg";
import investSect1Icon2 from "@/icons/investments-page/invest-sect1-icon-2.svg";
import investSect1Icon3 from "@/icons/investments-page/invest-sect1-icon-3.svg";

import investSect3Icon1 from "@/icons/investments-page/invest-sect3-icon1.svg";
import investSect3Icon2 from "@/icons/investments-page/invest-sect3-icon2.svg";
import investSect3Icon3 from "@/icons/investments-page/invest-sect3-icon3.svg";

import TotalInvestmentChart from "../features/charts/TotalInvestmentChart";
import RevenueChart from "../features/charts/RevenueChart";
import { useCardsStore } from "../store/useCardsStore";

export default function InvestmentsPage() {
  const cards = useCardsStore((state) => state.cards);
  const activeCard = cards.find((c) => c.active);
  if (!activeCard) return;

  // общая сумма инвестиций
  const totalInvestments = cards
    .map((card) => card.investments.reduce((sum, el) => sum + el.amount, 0))
    .reduce((sum, el) => sum + el, 0)
    .toLocaleString("en-US");

  // количество инвестиций 
  const amountOfInvestment = cards
    .map((card) => card.investments.length)
    .reduce((sum, el) => sum + el, 0)
    .toLocaleString("en-US");

  return (
    <main className="pb-[env(safe-area-inset-bottom)]">
      <div className="container">
        <section className="flex justify-center flex-wrap gap-7.5 w-full mt-6.5 text-grey">
          {[
            {
              icon: investSect1Icon1,
              bg: "#DCFAF8",
              label: "Total Invested Amount",
              value: `$${totalInvestments}`,
            },
            {
              icon: investSect1Icon2,
              bg: "#FFE0EB",
              label: "Number of Investments",
              value: `${amountOfInvestment}`,
            },
            {
              icon: investSect1Icon3,
              bg: "#E7EDFF",
              label: "Rate of Return",
              value: "+5.80%",
            },
          ].map(({ icon, bg, label, value }) => (
            <div
              key={label}
              className="flex-1 min-w-67.5 max-w-87.5 flex items-center justify-center bg-bg-block rounded-2xl py-[clamp(1rem,0.5rem+2.5vw,1.875rem)] px-3 @container h-30 max-[1240px]:h-22.5"
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
                  <div className="text-text-primary font-semibold text-[clamp(0.75rem,10cqw,1.25rem)] truncate">
                    {value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="flex gap-7.5 pt-6 max-[1024px]:flex-col">
          <div className="flex-1 min-w-0 ">
            <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
              Yearly Total Investment
            </h2>
            <div className="bg-bg-block w-full h-70.5 rounded-3xl">
              <TotalInvestmentChart activeCard={activeCard} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-text-primary text-[22px] font-semibold pb-5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
              Monthly Revenue
            </h2>
            <div className="bg-bg-block w-full h-70.5 rounded-3xl">
              <RevenueChart />
            </div>
          </div>
        </section>
        <section className="flex gap-7.5 pt-6 pb-12.5 max-[800px]:flex-col">
          <div className="flex-2 min-w-0 h-86.25 max-[1280px]:flex-1">
            <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
              My Investment
            </h2>
            {[
              {
                icon: investSect3Icon1,
                bg: "#FFE0EB",
                label: "Apple Store",
                category: "E-commerce, Marketplace",
                value: "$54,000",
                percent: "+16%",
                percentColor: "#16DBAA",
              },
              {
                icon: investSect3Icon2,
                bg: "#E7EDFF",
                label: "Samsung Mobile",
                category: "E-commerce, Marketplace",
                value: "$25,300",
                percent: "-4%",
                percentColor: "#FE5C73",
              },
              {
                icon: investSect3Icon3,
                bg: "#FFF5D9",
                label: "Tesla Motors",
                category: "Electric Vehicles",
                value: "$8,200",
                percent: "+25%",
                percentColor: "#16DBAA",
              },
            ].map(
              ({ icon, bg, label, category, value, percent, percentColor }) => (
                <div
                  key={label}
                  className="grid grid-cols-[1fr_0.5fr_0.5fr] items-center gap-4 p-3.75 mb-3.75 bg-bg-block text-grey text-[15px] w-full h-22.5 rounded-2xl last:mb-0 max-[1280px]:text-xs max-[1080px]:p-2.75 max-[460px]:flex max-[460px]:justify-between"
                >
                  <div className="flex items-center gap-5 min-w-0 max-[460px]:gap-3">
                    <div
                      className={`relative w-15 h-15 rounded-2xl shrink-0 max-[1280px]:w-11.25 max-[1280px]:h-11.25`}
                      style={{ backgroundColor: bg }}
                    >
                      <img
                        src={icon}
                        alt=""
                        className="absolute inset-0 m-auto max-[1280px]:w-5 max-[1280px]:h-5"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-base text-text-primary truncate max-[1280px]:text-[13px]">
                        {label}
                      </div>
                      <div className="truncate">{category}</div>
                    </div>
                  </div>
                  <div className="max-[460px]:hidden">
                    <div className="font-medium text-base text-text-primary max-[1280px]:text-[13px]">
                      {value}
                    </div>
                    <div className="truncate">Envestment Value</div>
                  </div>
                  <div>
                    <div
                      className="font-medium text-base max-[1280px]:text-[13px]"
                      style={{ color: percentColor }}
                    >
                      {percent}
                    </div>
                    <div className="max-[460px]:hidden">Return Value</div>
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="flex-1 min-w-0 h-86.25">
            <h2 className="text-text-primary text-[22px] font-semibold pb-4.5 max-[1024px]:text-lg max-[375px]:text-base max-[375px]:pb-3">
              Trending Stock
            </h2>
            <div className="bg-bg-block w-full h-75 rounded-3xl overflow-hidden">
              <table className="w-full border-collapse table-fixed text-[14px]">
                <thead className="bg-bg-block">
                  <tr className="border-b border-[#EBEEF2] whitespace-nowrap max-[1024px]:text-[13px]">
                    {["SL No", "Name", "Price", "Return"].map((el) => (
                      <th
                        key={el}
                        className="font-medium text-grey text-left px-4 pt-5 pb-2 first:pl-7.5 last:pr-7.5"
                      >
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      number: "01.",
                      name: "Trivago",
                      price: "$520",
                      returnPercent: "+5%",
                      returnColor: "#16DBAA",
                    },
                    {
                      number: "02.",
                      name: "Canon",
                      price: "$480",
                      returnPercent: "+10%",
                      returnColor: "#16DBAA",
                    },
                    {
                      number: "03.",
                      name: "Uber Food",
                      price: "$350",
                      returnPercent: "-3%",
                      returnColor: "#FE5C73",
                    },
                    {
                      number: "04.",
                      name: "Nokia",
                      price: "$940",
                      returnPercent: "+2%",
                      returnColor: "#16DBAA",
                    },
                    {
                      number: "05.",
                      name: "Tiktok",
                      price: "$670",
                      returnPercent: "-12%",
                      returnColor: "#FE5C73",
                    },
                  ].map(
                    ({ number, name, price, returnPercent, returnColor }) => (
                      <tr key={number} className="text-text-primary">
                        <td className="pl-7.5 pr-3.5 py-3.25">{number}</td>
                        <td className="px-4 py-3.25">{name}</td>
                        <td className="px-4 py-3.25">{price}</td>
                        <td
                          className="px-4 py-3.25"
                          style={{ color: returnColor }}
                        >
                          {returnPercent}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
