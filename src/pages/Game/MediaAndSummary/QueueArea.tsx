import { FC } from "react";
import { gamesData } from "../gameData";

interface QueueAreaProps {
    game: gamesData;
  }

export const QueueArea: FC<QueueAreaProps> = (game) => {
    return (
      <div className="queue-area">
        <div className="queue-actions">
          <a className="view-queue-button" href="">
            <span>
              View Your Queue&nbsp;&nbsp;&nbsp;
              <i className="arrow-next" />
            </span>
          </a>
          <div
            id="add-wishlist"
            className="queue-button-container"
            style={{ display: "inline-block" }}
          >
            <a className="queue-button" href="">
              <span>Add to your wishlist</span>
            </a>
          </div>
          <div
            id="added-wishlist"
            className="queue-button-container"
            style={{ display: "none" }}
          >
            <a className="queue-button" href="">
              <span>
                <img src="/images/ico_selected.png" alt="" /> On Wishlist
              </span>
            </a>
            <div className="wishlist-added"> Item added to your wishlist! </div>
          </div>
          <div id="follow" className="queue-button-container">
            <div className="queue-button" style={{ display: "inline-block" }}>
              <span>Follow</span>
            </div>
            <div className="queue-button" style={{ display: "none" }}>
              <span>
                <img src="/images/ico_selected.png" alt="" /> Following
              </span>
            </div>
          </div>
          <div
            id="ignore"
            className="queue-button-container"
            style={{ display: "inline-block" }}
          >
            <div className="queue-button">
              <span>Ignore</span>
            </div>
          </div>
          <div
            id="ignored"
            className="queue-button-container"
            style={{ display: "none" }}
          >
            <div className="queue-button">
              <span>
                <img src="/images/ico_selected.png" alt="" /> Ignored
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };