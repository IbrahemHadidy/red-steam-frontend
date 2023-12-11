import { FC, useEffect, useState } from "react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { gamesData } from "../gameData";
import "./GameContent.scss";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {
  const [isMobileView630, setIsMobileView630] = useState(
    window.innerWidth <= 630
  );
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView630(window.innerWidth <= 630);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
