import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import "./main.css";
import TransactionPage from "./components/Transactions/TransactionsPage.js";
import AccountsPage from "./components/Accounts/AccountsPage.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="/accounts" element={<AccountsPage />} />
    </Routes>
  );
}