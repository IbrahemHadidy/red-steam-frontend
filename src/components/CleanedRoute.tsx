import { FC } from "react";
import { Route } from "react-router-dom";

interface CleanedRouteProps {
    path: string;
    element: React.ReactNode;
  }

const handleMultipleSlashes = (link: string) => {
  return link.replace(/\/{2,}/g, "/");
};

// Custom Route component that handles link cleaning
const CleanedRoute: FC<CleanedRouteProps> = ({ path, element }) => {
  // Clean up the path using the handleMultipleSlashes function
  const cleanedPath = handleMultipleSlashes(path);

  return <Route path={cleanedPath} element={element} />;
};

export default CleanedRoute;
