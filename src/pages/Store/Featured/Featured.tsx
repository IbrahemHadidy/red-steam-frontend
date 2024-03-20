import { FC } from "react";
import useResponsiveViewport from "hooks/useResponsiveViewport";
import FeaturedDesktop from "./Desktop/FeaturedDesktop";
import FeaturedMobile from "./Mobile/FeaturedMobile";
import "./Featured.scss";

const Featured: FC = () => {
	const isViewport960 = useResponsiveViewport(960);

	return (
		<div>
			{isViewport960 ? <FeaturedMobile /> : <FeaturedDesktop />}
		</div>
	);
}

export default Featured;