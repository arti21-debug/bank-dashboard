import search from "../icons/header-icons/search.svg";
import settings from "../icons/header-icons/settings.svg";
import _002notification1 from "../icons/header-icons/002-notification-1.svg";
import MaskGroup from "../icons/header-icons/Mask Group.svg";
import { useEffect, useRef, useState } from "react";
import { NAV_VECTORS } from "./Nav";
import { useLocation, useNavigate } from "react-router-dom";
import NotifyDropdown from "./NotifyDropdown";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useCardsStore } from "../store/useCardsStore";

export default function Header() {
  const [isBurgOpen, setIsBurgOpen] = useState(false);
  const [isNotifyDropdownOpen, setIsNotifyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const burgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isBurgOpen) return;

    const handeClickOutside = (e: MouseEvent) => {
      if (burgRef.current && !burgRef.current.contains(e.target as Node)) {
        setIsBurgOpen(false);
      }
    };

    document.addEventListener("mousedown", handeClickOutside);
    return () => document.removeEventListener("mousedown", handeClickOutside);
  }, [isBurgOpen]);

  const isDark = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const activePage =
    location.pathname === "/"
      ? "Overview"
      : location.pathname.slice(1).replaceAll("-", " ");

  const activeAvatar = useCardsStore((state) => state.userAvatar);

  return (
    <header className="bg-bg-block flex items-center justify-between min-h-25 w-full">
      <div className="container flex items-center justify-between gap-5 max-[380px]:justify-center">
        <div className="flex items-center gap-7.5 max-[380px]:gap-4">
          {/* Burger */}
          <div ref={burgRef} className="relative hidden max-[960px]:block">
            <button
              className="flex flex-col gap-1.5 p-2 cursor-pointer max-[400px]:gap-1"
              onClick={() => setIsBurgOpen((prev) => !prev)}
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
                  <li
                    key={el}
                    onClick={() => {
                      navigate(`/${el !== "Dashboard" ? el : "/"}`);
                      setIsBurgOpen(false);
                    }}
                    className="whitespace-nowrap text-[#B1B1B1]"
                  >
                    <button className="cursor-pointer font-base transition duration-300 hover:text-[#ddd8d8]">
                      {el.replace("-", " ")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h1 className="text-text-primary text-[28px] font-semibold truncate max-[1024px]:text-[25px] max-[500px]:text-[20px] max-[400px]:text-xl">
            {activePage}
          </h1>
        </div>
        <div className="flex items-center gap-7.5 max-[1024px]:gap-5 max-[430px]:gap-4">
          <div className="flex justify-between gap-2.75 bg-bg-input rounded-full w-[clamp(12.5rem,11.25rem+6.25vw,15.938rem)] max-[1100px]:w-50 max-h-12.5 max-[810px]:hidden focus-within:outline focus-within:outline-grey">
            <img
              src={`${search}`}
              alt=""
              className="ml-6.25 cursor-pointer shrink-0 max-[1024px]:w-4"
            />
            <input
              type="text"
              placeholder="Search for something"
              className="text-text-primary py-4 px-2 truncate outline-none bg-transparent min-w-0 w-full max-[1024px]:h-10 max-[1100px]:placeholder:text-xs"
            />
          </div>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="w-12.25 h-12.25 relative bg-border-color p-3 rounded-full shrink-0 cursor-pointer max-[1024px]:w-10 max-[1024px]:h-10 transition duration-300 hover:bg-[#e8e8f2] max-[400px]:w-8.75 max-[400px]:h-8.75"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            {isDark ? (
              <Sun
                color="#718EBF"
                className=" absolute inset-0 m-auto max-[1024px]:w-5 max-[1024px]:h-5"
              />
            ) : (
              <Moon
                color="#718EBF"
                className="absolute inset-0 m-auto max-[1024px]:w-4.5 max-[1024px]:h-4.5"
              />
            )}
          </button>
          <button
            onClick={() => navigate(`/Setting`)}
            className="bg-border-color rounded-full shrink-0 cursor-pointer max-[1024px]:w-10 max-[1024px]:h-10 max-[560px]:hidden transition duration-300 hover:bg-[#e8e8f2]"
            aria-label="Open settings"
          >
            <img
              src={`${settings}`}
              alt=""
              className="p-3"
              aria-hidden="true"
            />
          </button>
          <div ref={dropdownRef} className="flex relative max-[560px]:hidden">
            <button
              onClick={() => setIsNotifyDropdownOpen((prev) => !prev)}
              className="bg-border-color rounded-full shrink-0 cursor-pointer max-[1024px]:w-10 max-[1024px]:h-10 transition duration-300 hover:bg-[#e8e8f2]"
              aria-label="Open notifications"
            >
              <img
                src={`${_002notification1}`}
                alt=""
                className="p-3"
                aria-hidden="true"
              />
            </button>

            {isNotifyDropdownOpen && (
              <NotifyDropdown
                setIsNotifyDropdownOpen={setIsNotifyDropdownOpen}
                dropdownRef={dropdownRef}
              />
            )}
          </div>
          <button
            onClick={() => navigate(`/Setting`)}
            className="ml-1.25 shrink-0 cursor-pointer max-[1024px]:w-11.5 max-[1024px]:h-11.5 max-[400px]:w-8.75 max-[400px]:h-8.75"
            aria-label="Open setting"
          >
            <img
              src={`${activeAvatar ?? MaskGroup}`}
              alt=""
              className="w-full max-w-15 max-h-15 rounded-full"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
