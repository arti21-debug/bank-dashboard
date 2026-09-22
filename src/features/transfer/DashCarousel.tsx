import { CONTACTS } from "../../config/contacts";

interface CarouselProps {
  currUserIndex: number;
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}

export default function DashCarousel({
  currUserIndex,
  selectedUser,
  setSelectedUser,
}: CarouselProps) {
  const visible = CONTACTS.slice(currUserIndex, currUserIndex + 3);

  return (
    <>
      {visible.map((user, i) => (
        <div
          key={user.id}
          onClick={() => {
            setSelectedUser(currUserIndex + i);
          }}
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <button
            className={`rounded-full cursor-pointer ${currUserIndex + i === selectedUser ? "outline-4 outline-green-500" : ""}`}
          >
            <img
              src={user.avatar}
              alt=""
              className="block rounded-full w-17.5 h-17.5 shrink-0 max-[1100px]:w-12.5 max-[1100px]:h-12.5"
            />
          </button>
          <button className="text-text-primary pt-3.75 text-base font-bold truncate w-full text-center cursor-pointer max-[1024px]:text-xs max-[1024px]:font-normal">
            {user.name}
          </button>
          <div className="text-grey pt-0.75 text-[15px] max-[1024px]:text-xs">
            {user.role}
          </div>
        </div>
      ))}
    </>
  );
}
