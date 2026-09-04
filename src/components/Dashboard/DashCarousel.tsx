interface CarouselProps {
  users: string[];
  currUserIndex: number;
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}

export default function DashCarousel({
  users,
  currUserIndex,
  selectedUser,
  setSelectedUser,
}: CarouselProps) {
  const visible = users.slice(currUserIndex, currUserIndex + 3);

  return (
    <>
      {visible.map((img, i) => (
        <div
          key={i}
          onClick={() => {
            setSelectedUser(currUserIndex + i);
          }}
          className="flex flex-col items-center min-w-0 flex-1"
        >
          <button
            className={`rounded-full ${currUserIndex + i === selectedUser ? "outline-4 outline-green-500" : ""}`}
          >
            <img
              src={img}
              alt=""
              className="block rounded-full w-17.5 h-17.5 shrink-0 max-[1100px]:w-12.5 max-[1100px]:h-12.5"
            />
          </button>
          <button className="pt-3.75 text-base font-bold truncate w-full text-center max-[1024px]:text-xs max-[1024px]:font-normal">
            {
              [
                "Livia Bator",
                "Randy Press",
                "Workman",
                "Workman",
                "Workman",
                "Workman",
              ][currUserIndex + i]
            }
          </button>
          <div className="text-grey pt-0.75 text-[15px] max-[1024px]:text-xs">
            {
              [
                "CEO",
                "Director",
                "Director",
                "Director",
                "Director",
                "Director",
              ][currUserIndex + i]
            }
          </div>
        </div>
      ))}
    </>
  );
}