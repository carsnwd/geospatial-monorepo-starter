import { useEffect } from "react";

export const useCloseOnEscape = (closeModal: () => void) => {
  // Attach the event listener when the component mounts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);
};
