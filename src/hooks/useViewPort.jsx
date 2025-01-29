import { useEffect } from "react";
import { useState } from "react";

const useViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowsResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowsResize);
    return () => window.removeEventListener("resize", handleWindowsResize);
  }, []);
  return { width };
};

export default useViewPort;
