import { ChevronLeft, ChevronRight } from "lucide-react";
import DashCarousel from "./DashCarousel";
import { useState } from "react";

interface CarouselProps {
  userAvatars: string[];
  selectedUser: number | null;
  setSelectedUser: (user: number | null) => void;
}

export default function QuickTransfer({ userAvatars, selectedUser, setSelectedUser }: CarouselProps) {
  const [currUserIndex, setCurrUserIndex] = useState(0);

  return (
    <div className="flex items-center justify-between max-[480px]:hidden">
      {currUserIndex > 0 && (
        <button
          className="relative shrink-0 w-12.5 h-12.5 cursor-pointer bg-background-white rounded-full shadow-[0_0_18px_-2px_rgb(231_228_232/80%)] mr-4 max-[1200px]:w-0 max-[1200px]:h-0 transition duration-300 hover:bg-[#e8e8f2] max-[480px]:hidden"
          onClick={() => setCurrUserIndex(currUserIndex - 1)}
        >
          <ChevronLeft
            color="#718EBF"
            className="absolute inset-0 max-[1200px]:right-0 max-[1200px]:inset-auto m-auto"
          />
        </button>
      )}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <DashCarousel
          currUserIndex={currUserIndex}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>
      {currUserIndex + 3 < userAvatars.length && (
        <button
          className="relative shrink-0 w-12.5 h-12.5 bg-background-white cursor-pointer rounded-full shadow-[0_0_18px_-2px_rgb(231_228_232/80%)] ml-4 max-[1200px]:w-0 max-[1200px]:h-0 transition duration-300 hover:bg-[#e8e8f2] max-[480px]:hidden"
          onClick={() => setCurrUserIndex(currUserIndex + 1)}
        >
          <ChevronRight
            color="#718EBF"
            className="absolute inset-0 max-[1200px]:left-0 max-[1200px]:inset-auto m-auto"
          />
        </button>
      )}
    </div>
  );
}
