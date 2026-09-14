import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./main.css";
import TransactionPage from "./components/Transactions/TransactionsPage.js";
import AccountsPage from "./components/Accounts/AccountsPage.js";
import InvestmentsPage from "./components/Investments/InvestmentsPage.js";
import CreditCardsPage from "./components/CreditCards/CreditCardsPage.js";
import LoansPage from "./components/Loans/LoansPage.js";
import ServicesPage from "./components/Services/ServicesPage.js";
import MyPrivilegesPage from "./components/MyPrivileges/MyPrivilegesPage.js";
import SettingPage from "./components/Setting/SettingPage.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
      <Route path="/investments" element={<InvestmentsPage />} />
      <Route path="/credit cards" element={<CreditCardsPage />} />
      <Route path="/loans" element={<LoansPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/my privileges" element={<MyPrivilegesPage />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
}