import { useState, useEffect } from "react";

// Custom hook functions MORAJU pocinjati sa "use"
const useCounter = function (forwards = true) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  // Mora biti return da bi: const counter = useCounter();
  return counter;
};

export default useCounter;
