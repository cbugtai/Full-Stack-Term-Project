import { useEffect, useRef, useState } from "react";

// this hook manages loading state, if your page is loading data in asynchronously, you can use this hook to manage the loading state and control the loading placeholder display
export function useLoading() {
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // start: sets loading to true

  const start = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setLoading(true);
  };

  // stop: sets loading to false
  /*for demonstrattion purpose to simulate delay for data loading */
  const stop = () => {
    timerRef.current = setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // const stop = () => setLoading(false);
  return { loading, start, stop };
}
