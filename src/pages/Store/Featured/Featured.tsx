import { FC } from "react";
import useResponsiveViewports from "../../../components/useResponsiveViewports";
import FeaturedDesktop from "./Desktop/FeaturedDesktop";
import FeaturedMobile from "./Mobile/FeaturedMobile";
import "./Featured.scss";

const Featured: FC = () => {
  const { isMobileView } = useResponsiveViewports();

  return (
    <div>
      {isMobileView ? <FeaturedMobile /> : <FeaturedDesktop />}
    </div>
  );
}

export default Featured;