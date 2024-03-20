import { FC } from "react";
import DefaultDesktopComponent from "./Desktop/DefaultDesktopComponent";
import CustomMobileComponent from "./Mobile/CustomMobileComponent";
import useResponsiveViewport from "hooks/useResponsiveViewport";

const Header: FC = () => {
	const isViewport960  = useResponsiveViewport(960);

	return (
		<div>
			{isViewport960 ? <CustomMobileComponent /> : <DefaultDesktopComponent />}
		</div>
	);
};

export default Header;


