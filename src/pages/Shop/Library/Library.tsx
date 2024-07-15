'use client';

// React
import { useContext, useEffect, useMemo, useState } from 'react';

// Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Services
import gameData from 'services/gameData/gameData';

// Styles
import './Library.scss';

// Types
import type { ChangeEvent, FC } from 'react';
import type { gamesData } from 'services/gameData/gameData';

const Library: FC = () => {
  // Initializations
  const router = useRouter();
  const isViewport1000 = useResponsiveViewport(1000);

  // Contexts
  const { userData } = useContext(AuthContext);

  // States
  const [cardSize, setCardSize] = useState<number>(250);
  const [selectedGame, setSelectedGame] = useState<gamesData | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useDynamicMetaTags({
    title: 'Your library',
    background:
      "radial-gradient(rgba(24, 26, 33, 0.9) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21",
    description: 'Your library. All your favorite games. All in one place.',
  });

  useEffect(() => {
    if (isViewport1000) {
      setCardSize(320);
    }
  }, [isViewport1000]);

  const userLibrary = useMemo(() => {
    return userData?.library
      ?.map((item) => {
        return gameData.find((game) => game.id === item.id);
      })
      .filter((game): game is gamesData => game !== undefined);
  }, [userData?.library]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCardSize(Number(event.target.value));
  };

  const handleCardClick = (game: gamesData) => {
    setSelectedGame(game);
    setIsShowModal((pervState) => !pervState);
  };

  const handleCloseClick = () => {
    setIsShowModal(false);
  };

  // find a game video if doesn't exist use game photo
  const gameMediaItem = (game: gamesData) => {
    const videoEntry = game.moviesAndImages.find((entry) => entry.type === 'video');
    if (videoEntry) {
      return videoEntry;
    }

    const imageEntry = game.moviesAndImages.find((entry) => entry.type === 'image');
    if (imageEntry) {
      return imageEntry;
    }
  };

  return (
    <>
      <Header />
      <div className="Library">
        {userLibrary?.length === 0 && (
          <div className="no-games">
            <div className="no-game">You have no games in your library</div>
            <Link className="back-button" href="/">
              <span>Go to store</span>
            </Link>
          </div>
        )}
        <div className="game-list">
          {userLibrary?.map((game) => (
            <div
              className="game-card"
              key={game.id}
              style={{
                backgroundImage: `url(${game.horizontalHeaderImage})`,
                width: `${cardSize}px`,
                height: `calc(${cardSize}px * 215 / 460)`,
              }}
              onClick={() => handleCardClick(game)}
            >
              <div className="overlay">
                <h1 style={{ fontSize: `${Math.max(10, cardSize / 20)}px` }}>{game.name}</h1>
              </div>
            </div>
          ))}
        </div>
        {!isViewport1000 && userLibrary?.length !== 0 && (
          <div className="sizing">
            <h1>Card size:&nbsp;&nbsp;</h1>
            <input
              type="range"
              min="200"
              max="500"
              value={cardSize}
              onChange={handleSliderChange}
              step="10"
            />
          </div>
        )}
      </div>
      <div className={`before-play-info ${isShowModal ? 'shown' : ''}`}>
        {selectedGame && (
          <>
            <div className="image-video">
              {gameMediaItem(selectedGame)?.type === 'video' ? (
                <video
                  src={gameMediaItem(selectedGame)?.link}
                  autoPlay
                  muted
                  loop
                  controlsList="nodownload"
                />
              ) : (
                <img src={gameMediaItem(selectedGame)?.link || ''} alt="Game" />
              )}
            </div>
            <div className="close-btn" onClick={handleCloseClick}>
              X
            </div>
            <div className="content-container">
              <div className="description">
                <div>
                  <h1 onClick={() => router.push(`/game/${selectedGame.id}/`)}>
                    {selectedGame.name}
                  </h1>
                  <p>{selectedGame.description}</p>
                </div>
                <div style={{ float: 'right' }}>
                  <a className="blue-btn">
                    <span className="medium-btn">Play Game</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {isShowModal && <div className="library-overlay" onClick={handleCloseClick}></div>}
      <Footer />
    </>
  );
};

export default Library;
