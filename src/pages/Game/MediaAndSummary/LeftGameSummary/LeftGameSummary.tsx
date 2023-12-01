import { FC } from "react";
import { SteamVideo } from "../SteamVideo";
import { Screenshot } from "../Screenshot";
import { SlidesArea, SliderButtons } from "./SlidesArea";
import { MovieEntry, gamesData } from "../../gameData";

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
  return (
    <div className="left-game-summary">
      <div className="game-highlights">
        {selectedItem && selectedEntry && (
          <>
            {selectedEntry.type === "video" ? (
              <SteamVideo
                key={selectedEntry.link}
                videoRef={videoRef}
                videoSrc={selectedEntry.link}
                poster={selectedEntry.posterLink}
                isAutoplay={isAutoplay}
                setAutoplay={setAutoplay}
              />
            ) : (
              <Screenshot
                key={selectedEntry.link}
                imgSrc={selectedEntry.link}
                isMouseOverScreenshot={isMouseOverScreenshot}
                onEnter={() => setIsMouseOverScreenshot(true)}
                onLeave={() => setIsMouseOverScreenshot(false)}
              />
            )}
          </>
        )}

        <SlidesArea
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          game={game}
        />
      </div>

      <SliderButtons handleSliderClick={handleSliderClick} />
    </div>
  );
};
