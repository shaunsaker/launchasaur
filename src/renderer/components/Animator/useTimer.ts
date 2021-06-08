import { useEffect, useRef } from "react";

interface UseTimerProps {
  duration: number;
  onDurationEnd: () => void;
}

export const useTimer = ({ duration, onDurationEnd }: UseTimerProps) => {
  const callback = useRef<() => void>();

  useEffect(() => {
    callback.current = onDurationEnd;
  }, [onDurationEnd]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const onInterval = () => {
      if (callback.current) {
        callback.current();
      }

      clearTimeout(timer);
    };

    if (duration) {
      timer = setTimeout(onInterval, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);
};
