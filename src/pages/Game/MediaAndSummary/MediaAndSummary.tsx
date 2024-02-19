/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, useEffect, useCallback, MouseEventHandler } from "react";
import $ from "../../../components/$selector"
import { GameTitleArea } from "./GameTitleArea";
import { RightGameSummary } from "./RightGameSummary";
import { LeftGameSummary } from "./LeftGameSummary/LeftGameSummary";
import { QueueArea } from "./QueueArea";
import { GameOwned } from "./GameOwned";
import { ScreenshotModal } from "./Screenshot";
import gameData, { gamesData, MovieEntry } from "../gameData";
import useResponsiveViewports from "../../../components/UseResponsiveViewports";
import "./MediaAndSummary.scss";
import "./steamVideo.scss";

const MediaAndSummary: FC<{ game: gamesData }> = ({ game }) => {
	const isViewport630 = useResponsiveViewports(630);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	const [isAutoplay, setAutoplay] = useState<boolean>(true);
	const [autoplayInitialized, setAutoplayInitialized] = useState(false);
	const [initialRender, setInitialRender] = useState(true);
	const [isMouseOverScreenshot, setIsMouseOverScreenshot] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<number>(0);
	const [wasPausedBeforeSwap, setWasPausedBeforeSwap] = useState(false);

	// filter screenshots only number from the media
	const selectedEntryIndex = game.moviesAndImages
	.filter((entry) => entry.type === "image")
	.findIndex((entry) => entry.link === selectedItem);

	const openModal: MouseEventHandler<HTMLAnchorElement> = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		setIsModalOpen(true);
	};
	
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		// this is responsible for the page background
		document.body.style.background = `url(${game.backgroundImage}) center top no-repeat #1b2838`;

		// this is responsible for the tab title
		document.title = `${
			!game.discount && game.discountPercentage
				? `Save ${game.discountPercentage.replace(/^-(\d+)/, '$1')} on` : ""
		} ${game.name} on Steam`;

		// this is responsible for skipping the first videos after the page loads if autoplay is off 
		// and handle the loading of the first image if video doesnt exist
		const videoExist = game.moviesAndImages.find((entry) => entry.type === "video");
		if (!isAutoplay || !videoExist) {
			setSelectedItem(
				game.moviesAndImages.find((entry) => entry.type === "image")?.link || null
			);
		} else {
			setSelectedItem(
				game.moviesAndImages.find((entry) => entry.type === "video")?.link || null
			);
		}

		return () => {
			document.body.style.background = "";
		};
	}, []);

	// function to swap photos and videos and photos with autoplay or the right swap button
	const handleSwap = useCallback(() => {
		const currentIndex = game.moviesAndImages.findIndex(
			(entry) => entry.link === selectedItem
		);
		const totalScreenshots = game.moviesAndImages.filter((entry) => entry.type === "image").length;
		const nextIndex = (currentScreenshotIndex + 1) % totalScreenshots;
		setCurrentScreenshotIndex(nextIndex);

		if (isAutoplay) {
			const nextIndex = (currentIndex + 1) % game.moviesAndImages.length;
			setSelectedItem(game.moviesAndImages[nextIndex].link);
		} else {
			const nextPhotoIndex = game.moviesAndImages.findIndex(
				(entry, index) => index > currentIndex && entry.type !== "video"
			);
	
			if (nextPhotoIndex !== -1) {
				setSelectedItem(game.moviesAndImages[nextPhotoIndex].link);
			} else {
				setSelectedItem(
					game.moviesAndImages.find((entry) => entry.type !== "video")?.link ||
						null
				);
			}
		}
	
		// Check if the selected item is outside the visible area
		const indicatorPosition =
			game.moviesAndImages.findIndex((entry) => entry.link === selectedItem) * 120;
	
		const slideArea = $('.slide-area');
		if (slideArea) {
			// Calculate visible width dynamically
			const visibleWidth = slideArea.clientWidth;
			const scrollLeft = slideArea.scrollLeft;
	
			if (currentIndex === game.moviesAndImages.length - 1) {
				// If the index is 0, scroll to the start
				slideArea.scroll({
					left: 0,
					behavior: "smooth",
				});
			} else if (indicatorPosition + 140 < scrollLeft) {
				// Scroll to the left to bring the selected item into view
				slideArea.scrollBy({
					left: indicatorPosition + 120 - scrollLeft,
					behavior: "smooth",
				});
			} else if (indicatorPosition + 240 > scrollLeft + visibleWidth) {
				// Scroll to the right to bring the selected item into view
				slideArea.scrollBy({
					left: indicatorPosition + visibleWidth + 120 - (scrollLeft + visibleWidth),
					behavior: "smooth",
				});
			}
		}
	}, [game, isAutoplay, selectedItem, currentScreenshotIndex]);  

	//730 - 612 = 118

	// function to swap photos and videos and photos with left swap button
	const handleLeftSwap = useCallback(
		(currentIndex: number) => {
			const totalScreenshots = game.moviesAndImages.filter((entry) => entry.type === "image").length;
			const nextIndex = (currentScreenshotIndex - 1 + totalScreenshots) % totalScreenshots;
			setCurrentScreenshotIndex(nextIndex)

			const slideArea = $('.slide-area');
			if (slideArea) {
				const indicatorPosition = currentIndex * 120;

				// Calculate the distance from the left edge to the indicator
				const distanceToLeftEdge =
					indicatorPosition - 120 - slideArea.scrollLeft;

				// Check if the indicator is going out of the left edge
				const isOutOfLeftEdge = distanceToLeftEdge < 0;

				// If the index is not the first, move to the previous item
				if (currentIndex > 0) {
					const nextIndex = currentIndex - 1;
					setSelectedItem(game.moviesAndImages[nextIndex].link);

					// If the indicator is out of the left edge, scroll to the left
					if (isOutOfLeftEdge) {
						slideArea.scrollBy({
							left: distanceToLeftEdge,
							behavior: "smooth",
						});
					}
				} else {
					// If the index is the first, scroll to the end only if it's not already at the last item
					if (
						slideArea.scrollLeft !==
						(game.moviesAndImages.length - 1) * 120
					) {
						slideArea.scroll({
							left: (game.moviesAndImages.length - 1) * 120,
							behavior: "smooth",
						});
					}
				}
			}
		},
		[game, setSelectedItem, currentScreenshotIndex]
	);

	// function controlling the behavior of the previous and next buttons in the screenshots modal
	const handleSliderClick = (direction: "left" | "right") => {
		const currentIndex = game.moviesAndImages.findIndex(
			(entry) => entry.link === selectedItem
		);

		let nextIndex = currentIndex;

		if (direction === "right") {
			// Find the next video or screenshot index
			nextIndex = (currentIndex + 1) % game.moviesAndImages.length;
			handleSwap();
		} else {
			// Find the previous video or screenshot index
			nextIndex =
				(currentIndex - 1 + game.moviesAndImages.length) %
				game.moviesAndImages.length;
			handleLeftSwap(currentIndex);
		}

		// Set the selectedItem based on the nextIndex
		setSelectedItem(game.moviesAndImages[nextIndex].link);

		const totalScreenshots = game.moviesAndImages.filter((entry) => entry.type === "image").length;
		if (direction === "right") {
			// Increment the index when clicking right
			setCurrentScreenshotIndex((prevIndex) => (prevIndex + 1) % totalScreenshots);
		} else if (direction === "left") {
			// Decrement the index when clicking left
			setCurrentScreenshotIndex((prevIndex) => (prevIndex - 1 + totalScreenshots) % totalScreenshots);
		}
	};
	
	// check if the tab is visible
	const isPageVisible = useRef(true);
	useEffect(() => {
		// Set up event listeners for visibility changes
		const handleVisibilityChange = () => {
			isPageVisible.current = !document.hidden;
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Clean up event listeners
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	// auto swap for screenshots function
	useEffect(() => {
		const screenshotIntervalId = setInterval(() => {
			if (
				selectedItem &&
				game.moviesAndImages.find((entry) => entry.link === selectedItem)
					?.type !== "video" &&
				!isModalOpen &&	isPageVisible.current
			) {
				handleSwap();
			}
		}, 5000);

		return () => {
			clearInterval(screenshotIntervalId);
		};
	}, [selectedItem, game, isModalOpen]);

	// auto swap for videos function
	useEffect(() => {
		const video = videoRef.current;

		// Check if the page is visible before swapping
		const handleVideoEnded = () => {
			if (isPageVisible.current) {
				handleSwap();
			}
		};

		if (video) {
			video.addEventListener("ended", handleVideoEnded);

			return () => {
				video.removeEventListener("ended", handleVideoEnded);
			};
		}
	}, [selectedItem]);
	
	// auto swap for the first video if autoplay is off
	useEffect(() => {
		if (initialRender) {
			const firstVideo = game.moviesAndImages.find(
				(entry) => entry.type === "video"
			);

			if (!isAutoplay && firstVideo && selectedItem === firstVideo.link) {
				const videoSwapTimeout = setTimeout(() => {
					handleSwap();
					setInitialRender(false);
				}, 0);

				return () => {
					clearTimeout(videoSwapTimeout);
				};
			}
		}
	}, [initialRender, isAutoplay, selectedItem]);

	// variable that represents the currently selected item
	const selectedEntry = gameData.reduce<MovieEntry | null>(
		(selected, game) =>
			selected ||
			(game.moviesAndImages.find(
				(entry) => entry.link === selectedItem
			) as MovieEntry | null),
		null
	);

	return (
    <div className="MeidaAndSummary" key={game.id}>
      <GameTitleArea category={game.category} name={game.name} />
      <div className="game-background">
        <div className="game-page-content">
          <div className="media-summary-block">
            <RightGameSummary game={game} isViewport630={isViewport630} />
            <LeftGameSummary
              selectedItem={selectedItem}
              selectedEntry={selectedEntry}
              isAutoplay={isAutoplay}
              setAutoplay={setAutoplay}
              autoplayInitialized={autoplayInitialized}
              setAutoplayInitialized={setAutoplayInitialized}
              isMouseOverScreenshot={isMouseOverScreenshot}
              setIsMouseOverScreenshot={setIsMouseOverScreenshot}
              game={game}
              setSelectedItem={setSelectedItem}
              handleSliderClick={handleSliderClick}
              openModal={openModal}
              wasPausedBeforeSwap={wasPausedBeforeSwap}
              setWasPausedBeforeSwap={setWasPausedBeforeSwap}
              videoRef={videoRef}
            />
          </div>
        </div>
      </div>
      <QueueArea game={game} />

      {/* TODO: isInLibrary backend logic */}
      {/* <GameOwned game={game} /> */}

      {isModalOpen && (
        <ScreenshotModal
          imgSrc={selectedEntry?.link || ''}
          onClose={closeModal}
          currentScreenshotIndex={selectedEntryIndex}
          game={game}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedEntry={selectedEntry}
        />
      )}
    </div>
  );
};

export default MediaAndSummary;
