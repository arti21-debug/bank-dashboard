interface CarouselProps {
  users: string[];
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}

export default function MobileCarousel({
  users,
  selectedUser,
  setSelectedUser,
}: CarouselProps) {
  return (
    <div className="hidden max-[480px]:flex gap-4 overflow-x-auto snap-x snap-mandatory pt-2 pb-2">
      {users.map((img, i) => (
        <div
          key={i}
          onClick={() => setSelectedUser(i)}
          className="flex-[0_0_38%] snap-center flex flex-col items-center shrink-0"
        >
          <button
            className={`rounded-full ${i === selectedUser ? "outline-4 outline-green-500" : ""}`}
          >
            <img
              src={img}
              alt=""
              className="block rounded-full w-12.5 h-12.5"
            />
          </button>
          <span className="pt-3.75 text-xs truncate w-full text-center">
            {
              [
                "Livia Bator",
                "Randy Press",
                "Workman",
                "Workman",
                "Workman",
                "Workman",
              ][i]
            }
          </span>
          <span className="text-grey pt-0.75 text-xs">
            {
              [
                "CEO",
                "Director",
                "Director",
                "Director",
                "Director",
                "Director",
              ][i]
            }
          </span>
        </div>
      ))}
    </div>
  );
}