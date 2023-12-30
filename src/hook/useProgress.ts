import { useState, useEffect } from "react";

const useProgressBar = (duration: number, stepTime: number) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + (100 * stepTime) / duration;
        if (nextProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return nextProgress;
      });
    }, stepTime);
    return () => clearInterval(interval);
  }, [duration, stepTime]);

  return progress;
};

export default useProgressBar;
