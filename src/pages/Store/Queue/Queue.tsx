import { FC, useState, useEffect } from "react";
import queueGames from "./queueGames";
import "./Queue.css";

interface queueGame {
  imageNumber: string;
  imageLink: string;
}

const Queue: FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
        YOUR DISCOVERY QUEUE
          <span className="right-btn">
            <a className="view-more" href="">
              {/* Render different button on mobile */}
              {isMobileView ? <></> : <span>Learn More</span>}
            </a>
          </span>
        </h2>
        <div className="static-queue">
          <a className="static-queue-link" href="">
            {isMobileView ? (
              <div className="begin-explore-mobile">
                <div className="begin-explore-mobile-btn">
                  Explore Your Queue
                </div>
              </div>
            ) : (
              <div className="begin-explore">
                Click here to begin exploring your queue
              </div>
            )}
          </a>
          <div className="queue-items">
            {queueGames.map((queueItem: queueGame, index: number) => (
              <div className={`queue-item queue-item-${queueItem.imageNumber}`}  key={index}>
                <div className="queue-item-overlay"></div>
                <img
                  className="queue-item-img"
                  src={queueItem.imageLink}
                ></img>
              </div>
            ))}
            <div className="queue-item queue-item-1">
              <div className="queue-item-overlay"></div>
              <img
                className="queue-item-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/header.jpg?t=1699526840"
              ></img>
            </div>
          </div>
        </div>
        {isMobileView && (
          <span className="right-btn-queue-mobile">
            <a
              className="btn-queue-mobile"
              href="https://store.steampowered.com/explore/?snr=1_4_4_"
            >
              <span>Learn More</span>
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Queue;
