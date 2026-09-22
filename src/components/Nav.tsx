import iconLogo from "../icons/nav-icons/icon_logo.svg";
import BankDash from "../icons/nav-icons/BankDash.svg";
import BankDashLight from "../icons/nav-icons/BankDash-light.svg";

import vector1 from "../icons/nav-icons/vector-1.svg";
import vector1Active from "../icons/nav-icons/active/vector-1-active.svg";
import vector2 from "../icons/nav-icons/vector-2.svg";
import vector2Active from "../icons/nav-icons/active/vector-2-active.svg";
import vector3 from "../icons/nav-icons/vector-3.svg";
import vector3Active from "../icons/nav-icons/active/vector-3-active.svg";
import vector4 from "../icons/nav-icons/vector-4.svg";
import vector4Active from "../icons/nav-icons/active/vector-4-active.svg";
import vector5 from "../icons/nav-icons/vector-5.svg";
import vector5Active from "../icons/nav-icons/active/vector-5-active.svg";
import vector6 from "../icons/nav-icons/vector-6.svg";
import vector6Active from "../icons/nav-icons/active/vector-6-active.svg";
import vector7 from "../icons/nav-icons/vector-7.svg";
import vector7Active from "../icons/nav-icons/active/vector-7-active.svg";
import vector8 from "../icons/nav-icons/vector-8.svg";
import vector8Active from "../icons/nav-icons/active/vector-8-active.svg";
import vector9 from "../icons/nav-icons/vector-9.svg";
import vector9Active from "../icons/nav-icons/active/vector-9-active.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export const NAV_VECTORS = {
  Dashboard: { vector: vector1, active: vector1Active },
  Transactions: { vector: vector2, active: vector2Active },
  Accounts: { vector: vector3, active: vector3Active },
  Investments: { vector: vector4, active: vector4Active },
  "Credit-Cards": { vector: vector5, active: vector5Active },
  Loans: { vector: vector6, active: vector6Active },
  Services: { vector: vector7, active: vector7Active },
  "My-Privileges": { vector: vector8, active: vector8Active },
  Setting: { vector: vector9, active: vector9Active },
};

export default function Nav() {
  const isDark = useTheme();
  const navigate = useNavigate();

  const location = useLocation();
  const activePage =
    location.pathname === "/" ? "Dashboard" : location.pathname.slice(1);

  return (
    <nav className="bg-bg-block w-[clamp(12.5rem,11.364rem+5.68vw,15.625rem)] pb-10.5 min-h-screen self-stretch max-[1055px]:w-55 max-[960px]:hidden">
      <ul className="flex flex-col gap-10.5">
        <li className="flex items-center min-h-25">
          <button className="flex justify-center gap-2.25 px-10">
            <img src={`${iconLogo}`} alt="" />
            <img src={isDark ? BankDashLight : BankDash} alt="" />
          </button>
        </li>
        {Object.entries(NAV_VECTORS).map(([el, i]) => (
          <li
            onClick={() => {
              navigate(`/${el !== "Dashboard" ? el : "/"}`);
            }}
            key={el}
            className={`relative flex items-center whitespace-nowrap gap-6.5 px-10.75 max-[840px]:hidden`}
          >
            {activePage === el && (
              <div className="absolute w-1.5 h-15 bg-[#2D60FF] left-0 rounded-full"></div>
            )}
            <img
              src={activePage === el ? i.active : i.vector}
              alt=""
              className={`w-6.25 h-6.25 shrink-0 max-[1024px]:w-5 ${activePage === el ? "text-[#2D60FF]" : "text-[#B1B1B1]"}`}
            />
            <button
              className={`font-medium text-lg max-[1024px]:text-base transition duration-300 ${activePage === el ? "text-[#2D60FF] cursor-default" : "text-[#B1B1B1] hover:text-[#ddd8d8] cursor-pointer"}`}
            >
              {el === "Credit-Cards"
                ? "Credit Cards"
                : el === "My-Privileges"
                  ? "My Privileges"
                  : el}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
