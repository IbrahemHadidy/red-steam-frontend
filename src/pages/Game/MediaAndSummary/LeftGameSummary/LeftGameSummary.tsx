'use client';

// React Spring
import { animated, useTransition } from 'react-spring';

// Components
import { Screenshot } from './Screenshot/Screenshot';
import { SliderButtons, SlidesArea } from './SlidesArea';
import { SteamVideo } from './Video/SteamVideo';

// Types
import type { FC } from 'react';
import type { LeftGameSummaryProps } from '../MediaAndSummary.types';

export const LeftGameSummary: FC<LeftGameSummaryProps> = ({
  videoRef,
  selectedItem,
  selectedEntry,
  isAutoplay,
  setAutoplay,
  isMouseOverScreenshot,
  setIsMouseOverScreenshot,
  game,
  setSelectedItem,
  handleSliderClick,
  openModal,
  autoplayInitialized,
  setAutoplayInitialized,
  wasPausedBeforeSwap,
  setWasPausedBeforeSwap,
}) => {
  const transitions = useTransition(selectedEntry, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className="left-game-summary">
      <div className="game-highlights">
        {selectedEntry && selectedEntry.type === 'video' && (
          <SteamVideo
            key={selectedEntry.link}
            videoRef={videoRef}
            videoSrc={selectedEntry.link}
            poster={selectedEntry.posterLink}
            isAutoplay={isAutoplay}
            setAutoplay={setAutoplay}
            autoplayInitialized={autoplayInitialized}
            setAutoplayInitialized={setAutoplayInitialized}
            wasPausedBeforeSwap={wasPausedBeforeSwap}
            setWasPausedBeforeSwap={setWasPausedBeforeSwap}
          />
        )}

        {selectedEntry &&
          selectedEntry.type !== 'video' &&
          transitions((style, selectedEntry) => (
            <animated.div style={style}>
              {selectedEntry?.link && (
                <Screenshot
                  key={selectedEntry.link}
                  imgSrc={selectedEntry.link}
                  isMouseOverScreenshot={isMouseOverScreenshot}
                  onEnter={() => setIsMouseOverScreenshot(true)}
                  onLeave={() => setIsMouseOverScreenshot(false)}
                  openModal={openModal}
                />
              )}
            </animated.div>
          ))}
        <SlidesArea selectedItem={selectedItem} setSelectedItem={setSelectedItem} game={game} />
      </div>
      {game.moviesAndImages.length >= 6 && <SliderButtons handleSliderClick={handleSliderClick} />}
    </div>
  );
};
