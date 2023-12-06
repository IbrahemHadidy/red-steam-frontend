import { FC } from "react";
import { gamesData } from "../gameData";
import { RightContent } from "./RightContent";
import { LeftContent } from "./LeftContent";
import "./GameContent.scss";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {

  return (
    <div className="game-content">
      <RightContent game={game} />
      <LeftContent game={game} />
    </div>
  );
};

export default GameContent;
