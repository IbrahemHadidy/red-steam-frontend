import { FC } from "react";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import { gamesData } from "../gameData";
import "./GameContent.scss";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {

  return (
    <div className="page-content">
      <RightContent game={game} />
      <LeftContent game={game} />
    </div>
  );
};

export default GameContent;
