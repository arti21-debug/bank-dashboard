// config/routes.ts
export type NavKey =
  | "Dashboard"
  | "Transactions"
  | "Accounts"
  | "Investments"
  | "Credit-Cards"
  | "Loans"
  | "Services"
  | "My-Privileges"
  | "Setting";

export interface NavItem {
  key: NavKey; // ключ иконок в Nav.tsx
  path: string; // маршрут (строчными, как в App.tsx)
  label: string; // подпись в меню
  title: string; // заголовок <h1> в шапке
}

export const NAV_ITEMS: NavItem[] = [
  { key: "Dashboard", path: "/", label: "Dashboard", title: "Overview" },
  {
    key: "Transactions",
    path: "/transactions",
    label: "Transactions",
    title: "Transactions",
  },
  { key: "Accounts", path: "/accounts", label: "Accounts", title: "Accounts" },
  {
    key: "Investments",
    path: "/investments",
    label: "Investments",
    title: "Investments",
  },
  {
    key: "Credit-Cards",
    path: "/credit-cards",
    label: "Credit Cards",
    title: "Credit Cards",
  },
  { key: "Loans", path: "/loans", label: "Loans", title: "Loans" },
  { key: "Services", path: "/services", label: "Services", title: "Services" },
  {
    key: "My-Privileges",
    path: "/my-privileges",
    label: "My Privileges",
    title: "My Privileges",
  },
  { key: "Setting", path: "/setting", label: "Setting", title: "Setting" },
];

// приводит адрес к единому виду для сравнения: нижний регистр, без слэшей в конце
// («/Transactions/» и «/transactions» — один и тот же адрес)
const normalize = (pathname: string) =>
  pathname.toLowerCase().replace(/\/+$/, "");

// проверяет, соответствует ли текущий адрес пункту меню (для подсветки активного пункта)
export const isActivePath = (pathname: string, path: string) =>
  normalize(pathname) === normalize(path);

// возвращает заголовок страницы для шапки; если адрес не найден — «Page not found»
export const getPageTitle = (pathname: string) =>
  NAV_ITEMS.find((item) => isActivePath(pathname, item.path))?.title ??
  "Page not found";
