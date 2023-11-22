import { FC, useState, useEffect } from "react";
import DefaultDesktopComponent from "./Desktop/DefaultDesktopComponent";
import CustomMobileComponent from "./Mobile/CustomMobileComponent";
import "./Header.scss";

const Header: FC = () => {
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


