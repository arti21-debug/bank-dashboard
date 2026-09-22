import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

export function AppLayout() {
  return (
    <div className="flex items-start bg-bg min-h-screen">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
