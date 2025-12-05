import { useEffect, useRef, useState } from "react";

// this hook manages loading state, if your page is loading data in asynchronously, you can use this hook to manage the loading state and control the loading placeholder display
export function useLoading() {
  const [loading, setLoading] = useState(false);

  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef<number | null>(null);

  const showDelay = 200; // in 200ms finish loading, don't show loading placeholder
  const minShowTime = 200; // show  loading placeholder at least this time

  // start: sets loading to true

  const start = () => {
    // if has hide timer, clear it
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    // if already loading or has show timer, do nothing
    if (loading || showTimerRef.current) return;

    showTimerRef.current = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLoading((_prev) => true);
      shownAtRef.current = Date.now();
      showTimerRef.current = null;
    }, showDelay);
    // console.log("loading started");
  };

  const stop = () => {
    // console.log("loading stopped");
    // console.log("loading:", loading);
    // if has show timer, clear it and do nothing
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
      return;
    }
    // console.log("loading:", loading);
    // if not loading, do nothing
    // if (!loading) return;
    // console.log("xy");
    // ensure loading placeholder is shown at least minShowTime
    const elapsed = shownAtRef.current
      ? Date.now() - shownAtRef.current
      : Infinity;
    const remain = minShowTime - elapsed;
    // console.log("loading elapsed:", elapsed, "remain:", remain);
    if (remain <= 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setLoading((_prev) => false);
      shownAtRef.current = null;
    } else {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setLoading((_prev) => false);
        shownAtRef.current = null;
        hideTimerRef.current = null;
      }, remain);
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return { loading, start, stop };
}
