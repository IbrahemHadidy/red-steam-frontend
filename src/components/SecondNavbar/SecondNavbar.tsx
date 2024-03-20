import { FC, Suspense, lazy } from "react";
import useResponsiveViewport from "hooks/useResponsiveViewport";
const DesktopSecondNav = lazy(() => import("./Desktop/DesktopSecondNav"));
const MobileSecondNav = lazy(() => import("./Mobile/MobileSecondNav"));

const SecondNavbar: FC = () => {
    const isViewport960 = useResponsiveViewport(960);

    return (
        <Suspense>
            {isViewport960 ? <MobileSecondNav /> : <DesktopSecondNav />}
        </Suspense>
    );
};

export default SecondNavbar;
