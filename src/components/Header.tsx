import React, { useState, useEffect } from "react";
import DefaultDesktopComponent from "./Header/DefaultDesktopComponent";
import CustomMobileComponent from "./Header/CustomMobileComponent";
import "./Header/Header.css";

const Header: React.FC = () => {
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
      {isMobileView ? <CustomMobileComponent /> : <DefaultDesktopComponent />}
    </div>
  );
};

export default Header;


