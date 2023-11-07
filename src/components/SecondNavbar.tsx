import React, { useState, useEffect } from "react";
import DesktopSecondNav from "./SecondNavbar/Desktop/DesktopSecondNav";
import MobileSecondNav from "./SecondNavbar/Mobile/MobileSecondNav";
import "./SecondNavbar/SecondNavbar.css";

const SecondNavbar: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobileView ? <MobileSecondNav /> : <DesktopSecondNav />}
    </div>
  );
};



export default SecondNavbar;
