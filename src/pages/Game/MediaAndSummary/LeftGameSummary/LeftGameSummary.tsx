import { FC, MouseEventHandler, RefObject, Dispatch, SetStateAction } from "react";
import { SteamVideo } from "../SteamVideo";
import { Screenshot } from "../Screenshot";
import { SlidesArea, SliderButtons } from "./SlidesArea";
import { MovieEntry, gamesData } from "../../gameData";

interface LeftGameSummaryProps {
	selectedItem: string | null;
	selectedEntry: MovieEntry | null;
	videoRef: RefObject<HTMLVideoElement | null>;
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
	openModal,
	autoplayInitialized,
	setAutoplayInitialized,
	wasPausedBeforeSwap,
	setWasPausedBeforeSwap,
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
								autoplayInitialized={autoplayInitialized}
								setAutoplayInitialized={setAutoplayInitialized}
								wasPausedBeforeSwap={wasPausedBeforeSwap}
								setWasPausedBeforeSwap={setWasPausedBeforeSwap}
							/>
						) : (
							<Screenshot
								key={selectedEntry.link}
								imgSrc={selectedEntry.link}
								isMouseOverScreenshot={isMouseOverScreenshot}
								onEnter={() => setIsMouseOverScreenshot(true)}
								onLeave={() => setIsMouseOverScreenshot(false)}
								openModal={openModal}
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
			{game.moviesAndImages.length >= 6 && (
				<SliderButtons handleSliderClick={handleSliderClick} />
			)}
		</div>
	);
};