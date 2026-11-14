import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center gap-4 p-30 pb-[env(safe-area-inset-bottom)] max-[600px]:p-10">
      <div className="text-text-primary font-bold text-lg">Page not found</div>
      <Link
        to="/"
        className="rounded-2xl bg-gray-blue px-8 py-3 font-medium text-white transition duration-300 hover:bg-[#120fc2]"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
