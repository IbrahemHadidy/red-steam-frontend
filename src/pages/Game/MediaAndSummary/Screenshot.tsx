import { FC, MouseEventHandler, Dispatch, SetStateAction } from "react";
import { ImageEntry, MovieEntry, gamesData } from "../gameData";

interface ScreenshotModalProps {
	imgSrc: string;
	onClose: () => void;
	currentScreenshotIndex: number;
	game: gamesData;
	selectedItem: string | null;
	selectedEntry: MovieEntry | null;
	setSelectedItem: Dispatch<SetStateAction<string | null>>;
}

export const ScreenshotModal: FC<ScreenshotModalProps> = ({
	imgSrc,
	onClose,
	currentScreenshotIndex,
	game,
	selectedItem,
	setSelectedItem,
}) => {

	const handleModalClick = (direction: "left" | "right") => {
		const isImageEntry = (entry: MovieEntry): entry is ImageEntry => {
			return entry.type === "image";
		};

		const filteredEntries = game.moviesAndImages.filter(isImageEntry);
		const currentIndex = filteredEntries.findIndex((entry) => entry.link === selectedItem);
		
		let newIndex;
		do {
			newIndex =
				direction === "left"
					? (currentIndex - 1 + filteredEntries.length) % filteredEntries.length
					: (currentIndex + 1) % filteredEntries.length;
		} while (!filteredEntries[newIndex]); 

		const newEntry = filteredEntries[newIndex];

		setSelectedItem(newEntry.link);
	};
	const isImageEntry = (entry: MovieEntry): entry is ImageEntry => {
		return entry.type === "image";
	};

	const totalScreenshots = game.moviesAndImages.filter(isImageEntry).length;

	return (
		<>
			<div className="modal-overlay" onClick={onClose}></div>
			<div className="popup-modal">
				<div className="modal--content">
					<div className="screenshot-title">
						<a href={imgSrc} target="_blank">
							Open image in new tab&nbsp;
							<img src="/images/ico_external_link.gif" alt="Screenshot" />
						</a>
					</div>
					<div className="screenshot-img">
						<img src={imgSrc} alt="Screenshot" />
					</div>
					<div className="modal--footer">
						<div className="count">
							{currentScreenshotIndex + 1} of {totalScreenshots} screenshots
						</div>
						{currentScreenshotIndex > 0 && (
							<div
								className="prev-next-btn previous"
								onClick={() => handleModalClick("left")}
							>
								<span>Previous</span>
							</div>
						)}
						{currentScreenshotIndex < totalScreenshots - 1 && (
							<div
								className="prev-next-btn next"
								onClick={() => handleModalClick("right")}
							>
								<span>Next</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export const Screenshot: FC<{
	imgSrc: string;
	isMouseOverScreenshot: boolean;
	onEnter: () => void;
	onLeave: () => void;
	openModal: MouseEventHandler<HTMLAnchorElement>;
}> = ({ imgSrc, onEnter, onLeave, openModal }) => {
	return (
		<div className="player-area">
			<img
				className="area-spacer"
				src="/images/game_highlight_image_spacer.gif"
				alt=""
			/>
			<div className="player-item">
				<div
					className="screenshot-holder"
					onMouseEnter={onEnter}
					onMouseLeave={onLeave}
				>
					<a className="screenshot-link" onClick={openModal}>
						<img src={imgSrc} alt="Screenshot" />
					</a>
				</div>
			</div>
		</div>
	);
};
