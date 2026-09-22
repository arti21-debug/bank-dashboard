import { transactionIcons } from "../../config/transactionIcons";

type RecentTransaction = {
  date: string;
  id: string;
  description: string;
  category: string;
  amount: number;
  status: string;
};

interface RecentTransactionsProps {
  recentTransactions: RecentTransaction[];
}

export default function RecentTransactions({
  recentTransactions,
}: RecentTransactionsProps) {
  return (
    <>
      {recentTransactions.length > 0 ? (
        <ul className="flex flex-col justify-between gap-2.5 p-6.25 max-[1200px]:p-4 max-[1200px]:gap-2">
          {recentTransactions.map((tran) => (
            <li
              key={tran.id}
              className="flex items-center justify-between gap-4"
            >
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
    </>
  );
}
