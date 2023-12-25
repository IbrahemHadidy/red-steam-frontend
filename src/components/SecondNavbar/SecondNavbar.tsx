import { FC } from "react";
import DesktopSecondNav from "./Desktop/DesktopSecondNav";
import MobileSecondNav from "./Mobile/MobileSecondNav";
import useResponsiveViewports from "../useResponsiveViewports";
import "./SecondNavbar.scss";

const SecondNavbar: FC = () => {
	const isViewport960 = useResponsiveViewports(960);

	return (
		<div>
			{isViewport960 ? <MobileSecondNav /> : <DesktopSecondNav />}
		</div>
	);
};



export default SecondNavbar;
