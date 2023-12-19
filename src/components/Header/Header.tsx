import { FC } from "react";
import DefaultDesktopComponent from "./Desktop/DefaultDesktopComponent";
import CustomMobileComponent from "./Mobile/CustomMobileComponent";
import useResponsiveViewports from "../useResponsiveViewports";
import "./Header.scss";

const Header: FC = () => {
  const { isMobileView } = useResponsiveViewports();

  return (
    <div>
      {isMobileView ? <CustomMobileComponent /> : <DefaultDesktopComponent />}
    </div>
  );
};

export default Header;


