import { FC } from "react";

export const Screenshot: FC<{
    imgSrc: string;
    isMouseOverScreenshot: boolean;
    onEnter: () => void;
    onLeave: () => void;
  }> = ({ imgSrc, onEnter, onLeave }) => {
    return (
      <div className="player-area">
        <img
          className="area-spacer"
          src="/images/game_highlight_image_spacer.gif"
          alt=""
        />
        <div className="player-item">
          <div
            className="screenshot-holder"
            onMouseEnter={() => {
              onEnter(); // Call the onEnter handler from props
            }}
            onMouseLeave={() => {
              onLeave(); // Call the onLeave handler from props
            }}
          >
            <a className="screenshot-link" href="">
              <img src={imgSrc} alt="Screenshot" />
            </a>
          </div>
        </div>
      </div>
    );
  };