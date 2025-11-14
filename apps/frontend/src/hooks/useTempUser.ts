import { useEffect, useState } from "react";
import * as tempUserService from "../services/tempUserService";

export function useTempUser() {
  const [tempUserId, setTempUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchTempUserId = async () => {
    try {
      const result: number = await tempUserService.fetchTempUserId();
      setTempUserId(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    const getTempUserId = async () => {
      try {
        await fetchTempUserId();
      } catch (errorObject) {
        setError(String(errorObject));
      }
    };

    getTempUserId();
  }, []);

  return {
    tempUserId,
    error,
  };
}
