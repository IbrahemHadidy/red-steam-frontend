'use client';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// Types
import type { JSX } from 'react';
import type { SlideItemProps, SliderButtonsProps, SlidesProps } from '../MediaAndSummary.types';

export function SlidesArea({
  selectedItem,
  setSelectedItem,
  orderedMedia,
  slideAreaRef,
}: SlidesProps): JSX.Element {
  return (
    <div
      className="slide-area"
      style={orderedMedia.length < 6 ? { height: '80px' } : {}}
      ref={slideAreaRef}
    >
      <div
        className="slide-area-scroll"
        style={{
          width: `${orderedMedia.length * 120}px`,
          left: '0px',
        }}
      >
        <div
          className="highlight-selector"
          style={{
            left: `${orderedMedia.findIndex((entry) => entry.link === selectedItem) * 120}px`,
          }}
        ></div>
        {orderedMedia.map((entry) => (
          <SlideItem key={entry.link} entry={entry} setSelectedItem={setSelectedItem} />
        ))}
      </div>
    </div>
  );
}

function SlideItem({ entry, setSelectedItem }: SlideItemProps): JSX.Element {
  return (
    <div
      className={`higlight-slide-item ${
        isVideoEntry(entry) ? 'higlight-slide-movie' : 'highlight-slide-screenshot'
      }`}
      id={entry.link}
      onClick={() => setSelectedItem(entry.link)}
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

export function SliderButtons({ handleSliderClick }: SliderButtonsProps): JSX.Element {
  return (
    <div className="slides-slider">
      <div className="slider-left" onClick={() => handleSliderClick('left')}>
        <span />
      </div>

      <div className="slider-right" onClick={() => handleSliderClick('right')}>
        <span />
      </div>
    </div>
  );
}
