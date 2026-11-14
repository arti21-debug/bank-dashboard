import Chip_Card from "@/icons/card-icons/Chip_Card.svg";
import masterCard from "@/icons/card-icons/master-card.svg";
import Chip_Card_2 from "@/icons/card-icons/Chip_Card-2.svg";
import masterCard_2 from "@/icons/card-icons/master-card-2.svg";
import { useCardsStore } from "../store/useCardsStore";
import { formatMoney } from "../utils/money";

interface ColorProps {
  color: string;
}

export default function Card({ color }: ColorProps) {
  const cardId = color === "blue" || color === "light-blue" ? 1 : 2;

  const cards = useCardsStore((state) => state.cards);
  const switchCard = useCardsStore((state) => state.switchActive);
  const activeCard = cards.find((c) => c.active);

  const card = cards.find((c) => c.id === cardId);

  const activeCardBorderStyle =
    (activeCard?.id === 1 && color === "blue") ||
    (activeCard?.id === 2 && color === "white")
      ? "border-4 border-green-500"
      : "";

  const isInteractive = color !== "light-blue" && color !== "light-white";

  return (
    <article
      onClick={() => isInteractive && switchCard(cardId)}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          switchCard(cardId);
        }
      }}
      className={`font-lato text-xs w-full h-58.75 overflow-auto ${color === "blue" || color === "light-blue" ? "bg-linear-to-b from-[#4C49ED] to-[#0A06F4] text-white" : "bg-[white] text-dark-blue"} rounded-3xl leading-none ${color === "light-blue" || color === "light-white" ? "cursor-default border-none" : `cursor-pointer max-[1035px]:w-57 ${activeCardBorderStyle}`} max-[1200px]:h-42.5 max-[1035px]:shrink-0`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={isInteractive ? activeCard?.id === cardId : undefined}
      aria-label={isInteractive ? `Select card ${cardId}` : undefined}
    >
      <div className="flex items-end-safe justify-between">
        <div className="pt-6 px-6.5">
          <div className="max-[1200px]:text-[11px]">Balance</div>
          <div className="text-xl font-semibold max-[1200px]:text-base">
            {formatMoney(card?.balance ?? 0)}
          </div>
        </div>
        <img
          src={`${color === "blue" || color === "light-blue" ? Chip_Card : Chip_Card_2}`}
          alt=""
          className="pr-6.25 max-[1200px]:w-12.5 max-[1200px]:h-12.5"
        />
      </div>
      <div className="flex gap-16.75 py-8.25 px-6.5 max-[1200px]:py-4 max-[1200px]:gap-8.25">
        <div className="flex flex-col gap-0.5">
          <div
            className={`${color === "blue" || color === "light-blue" ? "text-white/70" : "text-grey"} max-[1200px]:text-[10px] whitespace-nowrap`}
          >
            CARD HOLDER
          </div>
          <div className="text-base font-semibold max-[1200px]:text-[13px] whitespace-nowrap">
            Eddy Cusuma
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div
            className={`${color === "blue" || color === "light-blue" ? "text-white/70" : "text-grey"} max-[1200px]:text-[10px] whitespace-nowrap`}
          >
            VALID THRU
          </div>
          <div className="text-base font-semibold max-[1200px]:text-[13px] whitespace-nowrap">
            12/29
          </div>
        </div>
      </div>
      <div
        className={`flex items-center justify-between px-6.5 ${color === "blue" || color === "light-blue" ? "bg-linear-to-r from-white/15 to-white/0" : "bg-linear-to-r from-black/15 to-white/0"} max-[1360px]:gap-6.25 max-[1260px]:justify-center`}
      >
        <div className="font-semibold text-xl whitespace-nowrap pl-6.5 max-[1310px]:text-lg max-[1200px]:text-[15px]">
          3778 **** **** 1234
        </div>
        <img
          src={`${color === "blue" || color === "light-blue" ? masterCard : masterCard_2}`}
          alt=""
          className="w-9.5 h-full max-[1200px]:w-6.75 max-[1200px]:h-4.5"
        />
      </div>
    </article>
  );
}
