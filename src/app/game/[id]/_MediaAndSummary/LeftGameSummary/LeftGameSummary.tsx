'use client';

// React Spring
import { animated, useTransition } from 'react-spring';

// Components
import { Screenshot } from './Screenshot/Screenshot';
import { SliderButtons, SlidesArea } from './SlidesArea';
import { SteamVideo } from './Video/SteamVideo';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// Types
import type { FC, JSX } from 'react';
import type { LeftGameSummaryProps } from '../MediaAndSummary.types';

export const LeftGameSummary: FC<LeftGameSummaryProps> = ({
  videoRef,
  selectedItem,
  selectedEntry,
  isAutoplay,
  setAutoplay,
  isMouseOverScreenshot,
  setIsMouseOverScreenshot,
  orderedMedia,
  setSelectedItem,
  handleSliderClick,
  openModal,
  autoplayInitialized,
  setAutoplayInitialized,
  slideAreaRef,
}): JSX.Element => {
  const transitions = useTransition(selectedEntry, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className="left-game-summary">
      <div className="game-highlights">
        {selectedEntry && isVideoEntry(selectedEntry) && (
          <SteamVideo
            key={selectedEntry.link}
            videoRef={videoRef}
            videoSrc={selectedEntry.link}
            poster={selectedEntry.posterLink}
            isAutoplay={isAutoplay}
            setAutoplay={setAutoplay}
            autoplayInitialized={autoplayInitialized}
            setAutoplayInitialized={setAutoplayInitialized}
          />
        )}

        {selectedEntry &&
          !isVideoEntry(selectedEntry) &&
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
        <SlidesArea
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          orderedMedia={orderedMedia}
          slideAreaRef={slideAreaRef}
        />
      </div>
      {orderedMedia.length >= 6 && <SliderButtons handleSliderClick={handleSliderClick} />}
    </div>
  );
};
