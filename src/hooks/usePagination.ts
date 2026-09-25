import { useState } from "react";

export default function usePagination<T>(latestTrans: T[]) {
  const [currTransPageIndex, setCurrTransPageIndex] = useState(0);
  const [pageGroupStart, setPageGroupStart] = useState(0);

  const currPageT = latestTrans.slice(
    currTransPageIndex * 5,
    (currTransPageIndex + 1) * 5,
  );
  const totalPages = Math.ceil(latestTrans.length / 5);

  const goNext = () => {
    setCurrTransPageIndex((prev) => prev + 1);
    if (currTransPageIndex + 1 >= pageGroupStart + 5) {
      setPageGroupStart((prev) => prev + 5);
    }
  };

  const goPrev = () => {
    setCurrTransPageIndex((prev) => prev - 1);
    if (currTransPageIndex - 1 < pageGroupStart) {
      setPageGroupStart((prev) => prev - 5);
    }
  };

  const reset = () => {
    setCurrTransPageIndex(0);
    setPageGroupStart(0);
  };

  return {
    currPageT,
    pageGroupStart,
    totalPages,
    currTransPageIndex,
    setCurrTransPageIndex,
    goNext,
    goPrev,
    reset,
  };
}