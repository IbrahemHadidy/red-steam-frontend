import React from 'react';

interface SlidesProps {
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  game: {
    moviesAndImages: Array<{ link: string; type: string; posterLink?: string }>;
  };
}

export const SlidesArea: React.FC<SlidesProps> = ({
  selectedItem,
  setSelectedItem,
  game,
}) => (
  <div className="slide-area">
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
          left: `${game.moviesAndImages.findIndex(
            (entry) => entry.link === selectedItem
          ) * 120}px`,
        }}
      ></div>
      {game.moviesAndImages.map((entry) => (
        <SlideItem
          key={entry.link}
          entry={entry}
          setSelectedItem={setSelectedItem}
        />
      ))}
    </div>
  </div>
);

interface SlideItemProps {
  entry: { link: string; type: string; posterLink?: string };
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const SlideItem: React.FC<SlideItemProps> = ({ entry, setSelectedItem }) => (
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

interface SliderButtonsProps {
  handleSliderClick: (direction: 'left' | 'right') => void;
}

export const SliderButtons: React.FC<SliderButtonsProps> = ({ handleSliderClick }) => (
  <div className="slides-slider">
    <div className="slider-left" onClick={() => handleSliderClick('left')}>
      <span />
    </div>

    <div className="slider-right" onClick={() => handleSliderClick('right')}>
      <span />
    </div>
  </div>
);