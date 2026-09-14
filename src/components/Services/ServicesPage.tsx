import Header from "../Header";
import Nav from "../Nav";

export default function ServicesPage() {
  return (
    <div className="flex items-start">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex items-center justify-center p-30">
          <div className="text-black font-bold text-lg whitespace-nowrap">
            Coming soon...
          </div>
        </main>
      </div>
    </div>
  );
}