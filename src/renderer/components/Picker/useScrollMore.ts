import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollMoreProps<T> {
  data: T[];
  initialAmount: number;
  scrollMoreAmount: number;
}

export const useScrollMore = <T>({
  data,
  initialAmount,
  scrollMoreAmount,
}: UseScrollMoreProps<T>) => {
  const ref = useRef<HTMLDivElement>();
  const [numberOfItemsToDisplay, setNumberOfItemsToDisplay] =
    useState(initialAmount);

  const onScroll = useCallback(
    (event: any) => {
      const element = event.currentTarget;
      const { scrollHeight, scrollTop, clientHeight } = element;
      const isBottom = scrollHeight - scrollTop === clientHeight;

      if (isBottom) {
        setNumberOfItemsToDisplay(numberOfItemsToDisplay + scrollMoreAmount);
      }
    },
    [numberOfItemsToDisplay, scrollMoreAmount],
  );

  useEffect(() => {
    ref.current.addEventListener("scroll", onScroll);

    const refCopy = ref.current;
    return () => refCopy.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const dataToRender = data.slice(0, numberOfItemsToDisplay);

  return { scrollRef: ref, dataToRender };
};
