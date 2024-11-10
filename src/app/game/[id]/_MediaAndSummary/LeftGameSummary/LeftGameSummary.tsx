'use client';

// React
import { useRef } from 'react';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import { Screenshot } from './Screenshot/Screenshot';
import { SliderButtons, SlidesArea } from './SlidesArea';
import SteamVideo from './Video/SteamVideo';

// Utils
import { isImageEntry, isVideoEntry } from '@utils/checkMediaEntry';

// Components
import FadingContainer from '@components/FadingContainer';

// Custom Hooks
import usePageVisibility from './hooks/usePageVisibility';

export default function LeftGameSummary() {
  //--------------------------- State Selectors ---------------------------//
  const { currentMediaLink, orderedMediaEntries } = useAppSelector((state) => state.game);

  //------------------------------- Refs ----------------------------------//
  const slideAreaRef = useRef<HTMLDivElement>(null);

  //------------------------------- Hooks ---------------------------------//
  usePageVisibility();

  return (
    <div className="left-game-summary">
      <div className="game-highlights">
        {orderedMediaEntries.map((entry) => (
          <FadingContainer key={entry.order} isVisible={currentMediaLink === entry.link}>
            {isVideoEntry(entry) ? (
              <SteamVideo
                slideAreaRef={slideAreaRef}
                videoSrc={entry.link}
                poster={entry.posterLink}
              />
            ) : (
              isImageEntry(entry) && <Screenshot slideAreaRef={slideAreaRef} src={entry.link} />
            )}
          </FadingContainer>
        ))}

        <SlidesArea slideAreaRef={slideAreaRef} />
      </div>

      {orderedMediaEntries.length >= 6 && <SliderButtons slideAreaRef={slideAreaRef} />}
    </div>
  );
}
