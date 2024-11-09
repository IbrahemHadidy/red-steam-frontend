'use client';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { updateCurrentMediaLink } from '@store/features/game/gameSlice';

// Custom Hooks
import useMediaSwapHandlers from './hooks/useMediaSwapHandlers';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// Types
import type { ImageEntry, VideoEntry } from '@interfaces/game';
import type { RefObject } from 'react';

interface SlidesProps {
  slideAreaRef: RefObject<HTMLDivElement | null>;
}

interface SlideItemProps {
  entry: VideoEntry | ImageEntry;
}

export function SlidesArea({ slideAreaRef }: SlidesProps) {
  const { currentMediaLink, orderedMediaEntries } = useAppSelector((state) => state.game);

  return (
    <div
      className="slide-area"
      style={orderedMediaEntries.length < 6 ? { height: '80px' } : {}}
      ref={slideAreaRef}
    >
      <div
        className="slide-area-scroll"
        style={{
          width: `${orderedMediaEntries.length * 120}px`,
          left: '0px',
        }}
      >
        <div
          className="highlight-selector"
          style={{
            left: `${orderedMediaEntries.findIndex((entry) => entry.link === currentMediaLink) * 120}px`,
          }}
        />

        {orderedMediaEntries.map((entry) => (
          <SlideItem key={entry.link} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function SlideItem({ entry }: SlideItemProps) {
  const dispatch = useAppDispatch();

  const handleSlideClick = (link: string): void => {
    dispatch(updateCurrentMediaLink(link));
  };

  return (
    <div
      className={`higlight-slide-item ${
        isVideoEntry(entry) ? 'higlight-slide-movie' : 'highlight-slide-screenshot'
      }`}
      id={entry.link}
      onClick={() => handleSlideClick(entry.link)}
    >
      {isVideoEntry(entry) ? (
        <>
          <img src={entry.posterLink} alt="Movie Thumbnail" className="movie-thumb" />
          <div className="movie-marker"></div>
        </>
      ) : (
        <img className="mini-img" src={entry.link} alt="Screenshot" />
      )}
    </div>
  );
}

export function SliderButtons({ slideAreaRef }: SlidesProps) {
  const { handleSwap } = useMediaSwapHandlers({ slideAreaRef });

  return (
    <div className="slides-slider">
      <div className="slider-left" onClick={() => handleSwap('left')}>
        <span />
      </div>

      <div className="slider-right" onClick={() => handleSwap('right')}>
        <span />
      </div>
    </div>
  );
}
