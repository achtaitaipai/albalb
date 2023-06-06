import { useState, useEffect } from "react";
export const useSelectionRange = (
  element: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
  initialValue = 0
) => {
  const [selection, setSelectionRange] = useState<number | undefined>(
    initialValue
  );
  useEffect(() => {
    if (!element.current || selection === undefined) return;
    element.current.setSelectionRange(selection, selection);
    setSelectionRange(undefined);
  }, [selection, element]);
  return setSelectionRange;
};
