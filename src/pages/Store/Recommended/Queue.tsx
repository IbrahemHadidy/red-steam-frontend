'use client';

// Hooks
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import queueGames from 'services/gameData/queueGames';

// Styles
import './Queue.scss';

// Types
import type { FC, MouseEvent as ReactMouseEvent } from 'react';
import type { queueGame } from '../Store.types';

const Queue: FC = () => {
  // Initializations
  const isViewport960 = useResponsiveViewport(960);

  const handleQueueLinkClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast.info('Coming Soon!');
  };

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">YOUR DISCOVERY QUEUE</h2>
        <div className="static-queue">
          <a className="static-queue-link" onClick={handleQueueLinkClick}>
            {isViewport960 ? (
              <div className="begin-explore-mobile">
                <div className="begin-explore-mobile-btn">Explore Your Queue</div>
              </div>
            ) : (
              <div className="begin-explore">Click here to begin exploring your queue</div>
            )}
          </a>
          <div className="queue-items">
            {queueGames.map((queueItem: queueGame, index: number) => (
              <div className={`queue-item queue-item-${queueItem.imageNumber}`} key={index}>
                <div className="queue-item-overlay" />
                <img className="queue-item-img" src={queueItem.imageLink} alt="Queue Item" />
              </div>
            ))}
            <div className="queue-item queue-item-1">
              <div className="queue-item-overlay" />
              <img
                className="queue-item-img"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/header.jpg"
                alt="Queue Item"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
