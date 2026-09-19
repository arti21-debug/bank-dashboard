import { useEffect, useState } from "react";

export default function usePopup() {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsPopOpen(false), 300);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isPopOpen]);

  return {isPopOpen, setIsPopOpen, isVisible, setIsVisible};
}