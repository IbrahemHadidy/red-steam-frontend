import { FC } from "react";
import { gamesData } from "../gameData";

export const GameOwned: FC<{ game: gamesData }> = ({ game }) => {
  return (
    <>
      <div className="game-owned">
        <div className="owned-flag">IN LIBRARY &nbsp;&nbsp;</div>
        <div className="already-in-library">
          {game.name} is already in your Steam library
        </div>
      </div>
      <div className="already-owned">
        <div className="already-owned-actions">
          <div className="owned-actions-button">
            <a href="">
              <span> Install Steam </span>
            </a>
          </div>
          <div className="owned-actions-button">
            <a href="">
              <span> Play now </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
