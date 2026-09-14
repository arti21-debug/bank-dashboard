import Header from "../Header";
import Nav from "../Nav";

export default function SettingPage() {
  return (
    <div className="flex items-start">
      <Nav />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex items-center justify-center p-30">
          
        </main>
      </div>
    </div>
  );
}