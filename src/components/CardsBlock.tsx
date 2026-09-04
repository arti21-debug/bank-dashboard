import Card from "./Card";

interface CardsProps {
  action: string;
}

export default function CardsBlock ({ action }: CardsProps) {
  return (
    <div>
      <div className="flex items-center justify-between pb-5 max-[375px]:pb-3">
        <h2 className="text-[22px] font-semibold max-[1024px]:text-lg max-[375px]:text-base">
          My Cards
        </h2>
        <button className="text-[17px] font-semibold mr-2 max-[1024px]:text-[15px] max-[375px]:text-sm transition duration-300 hover:text-[#6060c6]">
          {action}
        </button>
      </div>
      <div className="flex gap-7.5 scrollbar max-[1035px]:overflow-x-auto">
        <Card color={"blue"} />
        <Card color={"white"} />
      </div>
    </div>
  );
}