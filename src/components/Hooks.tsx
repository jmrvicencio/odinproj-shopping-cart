import { useEffect, useState } from "react";

export function useScrollLock(lockStart = false) {
  const [lock, setLock] = useState(lockStart);

  useEffect(() => {
    if (lock) document.documentElement.style.overflow = "hidden";
    else document.documentElement.style.overflow = "visible";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [lock]);

  return (newLock: boolean) => {
    setLock(newLock);
  };
}
