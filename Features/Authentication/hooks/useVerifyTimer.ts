import { useCallback, useEffect, useState } from 'react';

export const useVerifyTimer = (initialSeconds: number = 30) => {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    let interval: any; 
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const restartTimer = useCallback(() => {
    setTimer(initialSeconds);
  }, [initialSeconds]);

  return { timer, restartTimer };
};