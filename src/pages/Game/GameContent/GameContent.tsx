import { FC } from "react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { gamesData } from "../gameData";
import useResponsiveViewports from "../../../components/useResponsiveViewports";
import "./GameContent.scss";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {
  const { isMobileView630 } = useResponsiveViewports();

  return (
    <div className="page-content">
      <RightContent 
      game={game}
      isMobileView630={isMobileView630}
      />
      <LeftContent 
      game={game}
      isMobileView630={isMobileView630} 
      />
    </div>
  );
};

export default GameContent;
