import { FC } from "react";
import DesktopSecondNav from "./Desktop/DesktopSecondNav";
import MobileSecondNav from "./Mobile/MobileSecondNav";
import useResponsiveViewports from "../useResponsiveViewports";
import "./SecondNavbar.scss";

const SecondNavbar: FC = () => {
  const { isMobileView } = useResponsiveViewports();

  return (
    <div>
      {isMobileView ? <MobileSecondNav /> : <DesktopSecondNav />}
    </div>
  );
};



export default SecondNavbar;
