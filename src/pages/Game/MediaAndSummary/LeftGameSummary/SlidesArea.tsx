'use client';

// Types
import type { FC } from 'react';
import type { SlideItemProps, SliderButtonsProps, SlidesProps } from '../MediaAndSummary.types';

export const SlidesArea: FC<SlidesProps> = ({ selectedItem, setSelectedItem, game }) => (
  <div className="slide-area" style={game.moviesAndImages.length < 6 ? { height: '80px' } : {}}>
    <div
      className="slide-area-scroll"
      style={{
        width: `${game.moviesAndImages.length * 120}px`,
        left: '0px',
      }}
    >
      <div
        className="highlight-selector"
        style={{
          left: `${game.moviesAndImages.findIndex((entry) => entry.link === selectedItem) * 120}px`,
        }}
      ></div>
      {game.moviesAndImages.map((entry) => (
        <SlideItem key={entry.link} entry={entry} setSelectedItem={setSelectedItem} />
      ))}
    </div>
  </div>
);

const SlideItem: FC<SlideItemProps> = ({ entry, setSelectedItem }) => (
  <div
    className={`higlight-slide-item ${
      entry.type === 'video' ? 'higlight-slide-movie' : 'highlight-slide-screenshot'
    }`}
    id={entry.link}
    onClick={() => setSelectedItem(entry.link)}
  >
    {entry.type === 'video' ? (
      <>
        <img src={entry.posterLink} alt="Movie Thumbnail" className="movie-thumb" />
        <div className="movie-marker"></div>
      </>
    ) : (
      <img className="mini-img" src={entry.link} alt="Screenshot" />
    )}
  </div>
);

export const SliderButtons: FC<SliderButtonsProps> = ({ handleSliderClick }) => (
  <div className="slides-slider">
    <div className="slider-left" onClick={() => handleSliderClick('left')}>
      <span />
    </div>

    <div className="slider-right" onClick={() => handleSliderClick('right')}>
      <span />
    </div>
  </div>
);
