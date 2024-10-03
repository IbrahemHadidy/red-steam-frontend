'use client';

// React
import { useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Github button
import GitHubButton from 'react-github-btn';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Services
import { getByIds } from '@services/game/data';

// Images
import githubIcon from '@images/github.png';

// Types
import type { Game, ImageEntry, VideoEntry } from '@entities/game.entity';
import type { ChangeEvent, JSX } from 'react';

export default function LibraryPage(): JSX.Element {
  // Init
  const router = useRouter();
  const isViewport1000 = useResponsiveViewport(1000);
  useDynamicBackground(
    "radial-gradient(rgba(24, 26, 33, 0.9) 0%, #181A21 100%) fixed no-repeat, url('/images/new_login_bg_strong_mask.jpg') center top no-repeat, #181A21"
  );

  // Contexts
  const { userData } = useContext(AuthContext);

  // States
  const [cardSize, setCardSize] = useState<number>(250);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [userLibrary, setUserLibrary] = useState<Game[]>([]);
  const [completeModal, setCompleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (isViewport1000) {
      setCardSize(320);
    }
  }, [isViewport1000]);

  useEffect(() => {
    const fetchUserLibrary = async () => {
      if (userData) {
        const response = await getByIds(userData.library.map((item) => item.id));
        setUserLibrary(response);
      }
    };
    fetchUserLibrary();
  }, [userData]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCardSize(Number(event.target.value));
  };

  const handleCardClick = (game: Game): void => {
    setSelectedGame(game);
    setIsShowModal((pervState) => !pervState);
  };

  const handleCloseShowClick = (): void => {
    setIsShowModal(false);
  };

  const handleCloseCompleteClick = (): void => {
    setCompleteModal(false);
  };

  const handlePlayClick = (): void => {
    setCompleteModal(true);
  };

  // find a game video if doesn't exist use game photo
  const gameMediaItem = (game: Game): VideoEntry | ImageEntry | undefined => {
    const videoEntry = game.videoEntries.length > 0 && game.videoEntries[0];
    if (videoEntry) return videoEntry;

    const imageEntry = game.imageEntries.length > 0 && game.imageEntries[0];
    if (imageEntry) return imageEntry;
  };

  // Type guard function to check if an entry is of type VideoEntry
  const isVideoEntry = (entry: VideoEntry | ImageEntry | undefined): entry is VideoEntry => {
    return (entry as VideoEntry)?.posterLink !== undefined;
  };

  return (
    <>
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
                backgroundImage: `url(${game.thumbnailEntries.horizontalHeaderImage})`,
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
              {isVideoEntry(gameMediaItem(selectedGame)) ? (
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
            <div className="close-btn" onClick={handleCloseShowClick}>
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
                  <a className="blue-btn" onClick={handlePlayClick}>
                    <span className="medium-btn">Play Game</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {completeModal && (
        <div className="complete-modal">
          <div>
            <h2>Thank You for Completing Your Journey!</h2>
            <p>
              I'm thrilled to have had you on this journey with me. Your time and effort are greatly
              appreciated, and I hope you've enjoyed the experience.
            </p>
            <p>
              If you found my project helpful or inspiring, I would be honored if you could show
              your support by clicking the star button on my GitHub repository. It would mean the
              world to me!
            </p>

            <div className="message">
              <p>Your support will help me continue building and improving this project.</p>
              <p>Click the star button below to endorse the project on GitHub:</p>
            </div>

            <div className="button-group">
              <GitHubButton
                href="https://github.com/IbrahemHadidy/red-steam-frontend"
                data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star IbrahemHadidy/red-steam-frontend on GitHub"
              >
                Star Frontend Repo
              </GitHubButton>
              <GitHubButton
                href="https://github.com/IbrahemHadidy/red-steam-backend"
                data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star IbrahemHadidy/red-steam-backend on GitHub"
              >
                Star Backend Repo
              </GitHubButton>
            </div>

            <div className="visit-repos">
              <p>If you’d like to dive deeper, feel free to visit the full repositories:</p>
              <div className="repo-links">
                <a
                  href="https://github.com/IbrahemHadidy/red-steam-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon.src} alt="External Link" /> Visit Frontend Repo
                </a>
                <a
                  href="https://github.com/IbrahemHadidy/red-steam-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon.src} alt="External Link" /> Visit Backend Repo
                </a>
              </div>
            </div>

            <div className="close-btn" onClick={handleCloseCompleteClick}>
              Close
            </div>
          </div>
        </div>
      )}
      {isShowModal && <div className="show-overlay" onClick={handleCloseShowClick}></div>}
      {completeModal && <div className="complete-overlay" onClick={handleCloseCompleteClick}></div>}
    </>
  );
}
