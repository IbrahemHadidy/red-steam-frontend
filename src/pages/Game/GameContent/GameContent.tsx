import { FC } from "react";
import { gamesData } from "../gameData";

const GameContent: FC<{ game: gamesData }> = ({ game }) => {
  return (
    <div className="game-content">
      <div className="game-content-right"></div>
      <div className="game-content-left"></div>
    </div>
  );
};

export default GameContent;
