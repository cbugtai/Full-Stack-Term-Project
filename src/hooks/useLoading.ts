import { useState } from "react";

// this hook manages loading state, if your page is loading data in asynchronously, you can use this hook to manage the loading state and control the loading placeholder display
export function useLoading() {
  const [loading, setLoading] = useState(false);

  // start: sets loading to true
  const start = () => setLoading(true);

  // stop: sets loading to false
  /*for demonstrattion purpose to simulate delay for data loading */
  // const stop = () =>
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  const stop = () => setLoading(false);
  return { loading, start, stop };
}
