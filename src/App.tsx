import { Routes, Route } from "react-router-dom";
import "./main.css";
import Dashboard from "./pages/Dashboard";
import TransactionPage from "./pages/TransactionsPage";
import AccountsPage from "./pages/AccountsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import CreditCardsPage from "./pages/CreditCardsPage";
import LoansPage from "./pages/LoansPage";
import ServicesPage from "./pages/ServicesPage";
import MyPrivilegesPage from "./pages/MyPrivilegesPage";
import SettingPage from "./pages/SettingPage";
import { AppLayout } from "./components/AppLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/credit-cards" element={<CreditCardsPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/my-privileges" element={<MyPrivilegesPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}