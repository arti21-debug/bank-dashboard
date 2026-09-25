import { CONTACTS } from "../../config/contacts";

interface CarouselProps {
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}

export default function MobileCarousel({
  selectedUser,
  setSelectedUser,
}: CarouselProps) {
  return (
    <div className="hidden max-[480px]:flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-2">
      {CONTACTS.map((user, i) => (
        <div
          key={user.id}
          onClick={() => setSelectedUser(i)}
          className="flex-[0_0_38%] snap-center flex flex-col items-center shrink-0"
        >
          <button
            className={`rounded-full ${i === selectedUser ? "outline-4 outline-green-500" : ""}`}
          >
            <img
              src={user.avatar}
              alt=""
              className="block rounded-full w-12.5 h-12.5"
            />
          </button>
          <span className="text-text-primary pt-3.75 text-xs truncate w-full text-center">
            {user.name}
          </span>
          <span className="text-grey pt-0.75 text-xs">{user.role}</span>
        </div>
      ))}
    </div>
  );
}
