import Header from "../Header";
import Nav from "../Nav";

export default function CreditCardsPage () {
  return (
    <div className="flex items-start bg-bg">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className=" flex items-center justify-center p-30">
          <div className="text-text-primary font-bold text-lg whitespace-nowrap">
            Coming soon...
          </div>
        </main>
      </div>
    </div>
  );
}