import { FC } from "react";
import DefaultDesktopComponent from "./Desktop/DefaultDesktopComponent";
import CustomMobileComponent from "./Mobile/CustomMobileComponent";
import useResponsiveViewports from "../useResponsiveViewports";

const Header: FC = () => {
	const isViewport960  = useResponsiveViewports(960);

	return (
		<div>
			{isViewport960 ? <CustomMobileComponent /> : <DefaultDesktopComponent />}
		</div>
	);
};

export default Header;


