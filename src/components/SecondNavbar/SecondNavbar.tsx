import { FC, Suspense, lazy } from "react";
import useResponsiveViewports from "../UseResponsiveViewports";
const DesktopSecondNav = lazy(() => import("./Desktop/DesktopSecondNav"));
const MobileSecondNav = lazy(() => import("./Mobile/MobileSecondNav"));

const SecondNavbar: FC = () => {
    const isViewport960 = useResponsiveViewports(960);

    return (
        <Suspense>
            {isViewport960 ? <MobileSecondNav /> : <DesktopSecondNav />}
        </Suspense>
    );
};

export default SecondNavbar;
