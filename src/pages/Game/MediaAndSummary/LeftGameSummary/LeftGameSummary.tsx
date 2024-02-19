import { FC, MouseEventHandler, Dispatch, SetStateAction, RefObject } from "react";
import { useTransition, animated } from 'react-spring'; 
import { SteamVideo } from "../SteamVideo";
import { Screenshot } from "../Screenshot";
import { SlidesArea, SliderButtons } from "./SlidesArea";
import { MovieEntry, gamesData } from "../../gameData";

interface LeftGameSummaryProps {
  videoRef: RefObject<HTMLVideoElement | null>;
	selectedItem: string | null;
	selectedEntry: MovieEntry | null;
	isAutoplay: boolean;
	setAutoplay: Dispatch<SetStateAction<boolean>>;
	isMouseOverScreenshot: boolean;
	setIsMouseOverScreenshot: Dispatch<SetStateAction<boolean>>;
	game: gamesData;
	setSelectedItem: Dispatch<SetStateAction<string | null>>;
	handleSliderClick: (direction: "left" | "right") => void;
	openModal: MouseEventHandler<HTMLAnchorElement>,
	autoplayInitialized: boolean;
	setAutoplayInitialized: Dispatch<SetStateAction<boolean>>;
	wasPausedBeforeSwap: boolean;
	setWasPausedBeforeSwap: Dispatch<SetStateAction<boolean>>;
}

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