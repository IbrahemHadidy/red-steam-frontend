import { FC } from "react";
import { SteamVideo } from "../SteamVideo";
import { Screenshot } from "../Screenshot";
import { SlidesArea, SliderButtons } from "./SlidesArea";
import { MovieEntry, gamesData } from "../../gameData";
import { useTransition, animated } from 'react-spring';

interface LeftGameSummaryProps {
  selectedItem: string | null;
  selectedEntry: MovieEntry | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isAutoplay: boolean;
  setAutoplay: React.Dispatch<React.SetStateAction<boolean>>;
  isMouseOverScreenshot: boolean;
  setIsMouseOverScreenshot: React.Dispatch<React.SetStateAction<boolean>>;
  game: gamesData;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  handleSliderClick: (direction: "left" | "right") => void;
}

export const LeftGameSummary: FC<LeftGameSummaryProps> = ({
  selectedItem,
  selectedEntry,
  videoRef,
  isAutoplay,
  setAutoplay,
  isMouseOverScreenshot,
  setIsMouseOverScreenshot,
  game,
  setSelectedItem,
  handleSliderClick,
}) => {

  const transitions = useTransition(selectedEntry, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  
  return (
    <div className="left-game-summary">
      <div className="game-highlights">
      {transitions((style, selectedEntry) =>
        selectedEntry ? (
          selectedEntry.type === 'video' ? (
            <animated.div style={style}>
              <SteamVideo
                key={selectedEntry.link}
                videoRef={videoRef}
                videoSrc={selectedEntry.link}
                poster={selectedEntry.posterLink}
                isAutoplay={isAutoplay}
                setAutoplay={setAutoplay}
              />
              </animated.div>
            ) : (
              <animated.div style={style}>
              <Screenshot
                key={selectedEntry.link}
                imgSrc={selectedEntry.link}
                isMouseOverScreenshot={isMouseOverScreenshot}
                onEnter={() => setIsMouseOverScreenshot(true)}
                onLeave={() => setIsMouseOverScreenshot(false)}
                />
                </animated.div>
              )
            ) : null
            )}

        <SlidesArea
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          game={game}
        />
      </div>
      {game.moviesAndImages.length >= 6 && (
        <SliderButtons handleSliderClick={handleSliderClick} />
      )}
    </div>
  );
};
