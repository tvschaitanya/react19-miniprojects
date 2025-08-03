import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Timer = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("time");
    return savedTime !== null ? Number(savedTime) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedStatus = localStorage.getItem("isRunning");
    return savedStatus !== null ? Number(savedStatus) : 0; // 0: stopped, 1: running, 2: paused
  });

  // Save time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("time", time);
  }, [time]);

  // Save isRunning to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("isRunning", isRunning);
  }, [isRunning]);

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const toggleTimer = () => {
    if (isRunning === 1) {
      // Pause timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsRunning(2);
    } else {
      // Start or Resume timer
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      }
      setIsRunning(1);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(0);
    setTime(0);
    localStorage.removeItem("time");
    localStorage.removeItem("isRunning");
  };

  return (
    <div>
      <TimerDisplay time={time} />
      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />
    </div>
  );
};

export default Timer;
