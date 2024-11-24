// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Toast notifications
import { toast } from 'react-toastify';

// Types
import type { JSX, MouseEvent } from 'react';

interface queueGame {
  imageNumber: string;
  imageLink: string;
}

export default function Queue(): JSX.Element {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //----------------------------- Queue Config ----------------------------//
  const queueGames: queueGame[] = [
    {
      imageNumber: '1',
      imageLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2375550/header.jpg',
    },
    {
      imageNumber: '2',
      imageLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
    },
    {
      imageNumber: '3',
      imageLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2103140/header.jpg',
    },
    {
      imageNumber: '4',
      imageLink: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/header.jpg',
    },
  ];

  //--------------------------- Event Handlers ----------------------------//
  const handleQueueLinkClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    toast.info('Coming Soon!');
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">YOUR DISCOVERY QUEUE</h2>

        <div className="static-queue">
          <a className="static-queue-link" onClick={handleQueueLinkClick}>
            {isViewport960OrLess ? (
              <div className="begin-explore-mobile">
                <div className="begin-explore-mobile-btn">Explore Your Queue</div>
              </div>
            ) : (
              <div className="begin-explore">Click here to begin exploring your queue</div>
            )}
          </a>

          <div className="queue-items">
            {queueGames.map((queueItem, idx) => (
              <div className={`queue-item queue-item-${queueItem.imageNumber}`} key={idx}>
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
}
