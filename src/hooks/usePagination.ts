import { useState } from "react";
import { Transaction } from "../types/data";

export default function usePagination(latestTrans: Transaction[]) {
  const [currTransPage, setCurrTransPage] = useState(0);
  const [pageGroupStart, setPageGroupStart] = useState(0);

  const currPageT = latestTrans.slice(
    currTransPage * 5,
    (currTransPage + 1) * 5,
  );
  const totalPages = Math.ceil(latestTrans.length / 5);

  const goNext = () => {
    setCurrTransPage((prev) => prev + 1);
    if (currTransPage + 1 >= pageGroupStart + 5) {
      setPageGroupStart((prev) => prev + 5);
    }
  };

  const goPrev = () => {
    setCurrTransPage((prev) => prev - 1);
    if (currTransPage - 1 < pageGroupStart) {
      setPageGroupStart((prev) => prev - 5);
    }
  };

  const reset = () => {
    setCurrTransPage(0);
    setPageGroupStart(0);
  };

  return {
    currPageT,
    pageGroupStart,
    totalPages,
    currTransPage,
    setCurrTransPage,
    goNext,
    goPrev,
    reset,
  };
}