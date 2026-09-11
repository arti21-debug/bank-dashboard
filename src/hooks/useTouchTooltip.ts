import { useState } from "react";

export default function useTouchTooltip () {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      setIsTooltipOpen(true);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      setIsTooltipOpen(false);
    }
  };

  const handlePointerCancel = () => {
    setIsTooltipOpen(false);
  };

  return { isTooltipOpen, handlePointerDown, handlePointerUp, handlePointerCancel };
}