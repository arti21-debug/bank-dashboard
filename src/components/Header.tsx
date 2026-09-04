import search from "../icons/header-icons/search.svg";
import settings from "../icons/header-icons/settings.svg";
import _002notification1 from "../icons/header-icons/002-notification-1.svg";
import MaskGroup from "../icons/header-icons/Mask Group.svg";
import { useState } from "react";
import { NAV_VECTORS } from "./Nav";
import { genereteDemoData } from "../utilits/getMockTransactions";
import { useCardsStore } from "../store/useCardsStore";

export default function Header() {
  const [isBurgOpen, setIsBurgOpen] = useState(false);

  const addMockTrans = useCardsStore((state) => state.addMockTransactions);
  const cards = useCardsStore((state) => state.cards);

  return (
    <header className="bg-background-white flex items-center justify-between min-h-25 w-full max-[580px]:flex-col max-[580px]:min-h-35 max-[580px]:justify-center max-[580px]:gap-6.25">
      <div className="container flex items-center justify-between">
        {/* Burger */}
        <div
          onClick={() => setIsBurgOpen((prev) => !prev)}
          className="relative hidden max-[960px]:block"
        >
          <button
            className="flex w-[clamp(1.875rem,1.739rem+0.68vw,2.25rem)] flex-col gap-1.5 p-2 max-[400px]:gap-1"
            aria-label={isBurgOpen ? "Close menu" : "Open menu"}
            aria-expanded={isBurgOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-dark-blue max-[375px]:w-4 max-[400px]:h-[1.5px] transition-all duration-300 ease-in-out
      ${isBurgOpen ? "translate-y-2 rotate-45 max-[400px]:translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-dark-blue max-[375px]:w-4 max-[400px]:h-[1.5px] transition-all duration-300 ease-in-out
      ${isBurgOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-dark-blue max-[375px]:w-4 max-[400px]:h-[1.5px] transition-all duration-300 ease-in-out
      ${isBurgOpen ? "-translate-y-2 -rotate-45 max-[400px]:-translate-y-1.5" : ""}`}
            />
          </button>
          {isBurgOpen && (
            <ul className="flex flex-col items-center gap-3 absolute z-50 w-40 py-5 rounded-md bg-[#6f7b8e] max-[480px]:w-35 max-[480px]:text-sm max-[480px]:gap-2 max-[480px]:py-3">
              {Object.entries(NAV_VECTORS).map(([el, _]) => (
                <li className="whitespace-nowrap text-[#B1B1B1]">
                  <button className="font-base transition duration-300 hover:text-[#ddd8d8]">
                    {el}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <h1 className="text-[28px] font-semibold max-[1024px]:text-[25px] max-[400px]:text-xl">
          Overview
        </h1>
        <button onClick={() => {
          const data = genereteDemoData();
          const arr = Math.ceil(data.length / 2);
          const first = data.slice(0, arr);
          const second = data.slice(arr);

          addMockTrans(1, first);
          addMockTrans(2, second);
          console.log(cards);
        }} className="border p-1">generete data</button>
        <div className="flex items-center gap-7.5">
          <div className="flex justify-between gap-3.75 bg-light-grey rounded-full w-[clamp(12.5rem,11.25rem+6.25vw,15.938rem)] max-h-12.5 max-[580px]:hidden focus-within:outline focus-within:outline-grey">
            <img
              src={`${search}`}
              alt=""
              className="ml-6.25 cursor-pointer shrink-0 max-[1024px]:w-4"
              aria-label="search button"
            />
            <input
              type="text"
              placeholder="Search for something"
              className="py-4 px-2 outline-none bg-transparent min-w-0 w-full max-[1024px]:h-10 max-[1024px]:placeholder:text-sm"
            />
          </div>
          <button className="bg-light-grey rounded-full shrink-0 max-[1024px]:w-10 max-[1024px]:h-10 max-[730px]:hidden transition duration-300 hover:bg-[#e8e8f2]">
            <img src={`${settings}`} alt="" className="p-3" />
          </button>
          <button className="bg-light-grey rounded-full shrink-0 max-[1024px]:w-10 max-[1024px]:h-10 max-[730px]:hidden transition duration-300 hover:bg-[#e8e8f2]">
            <img src={`${_002notification1}`} alt="" className="p-3" />
          </button>
          <button className="ml-1.25 shrink-0 max-[1024px]:w-11.5 max-[1024px]:h-11.5 max-[400px]:w-8.75 max-[400px]:h-8.75">
            <img src={`${MaskGroup}`} alt="" />
          </button>
        </div>
      </div>
      <div className="hidden justify-between gap-3.75 bg-light-grey rounded-full w-[clamp(15.625rem,13.92rem+8.52vw,20.313rem)] max-h-12.5 max-[580px]:flex focus-within:outline focus-within:outline-grey">
        <img
          src={`${search}`}
          alt=""
          className="ml-6.25 cursor-pointer shrink-0 max-[1024px]:w-4"
          aria-label="search button"
        />
        <input
          type="text"
          placeholder="Search for something"
          className="py-4 px-2 outline-none bg-transparent min-w-0 w-full max-[1024px]:h-10 max-[1024px]:placeholder:text-sm"
        />
      </div>
    </header>
  );
}
