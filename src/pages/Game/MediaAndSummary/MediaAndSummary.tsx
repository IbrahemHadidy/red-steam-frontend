/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, useEffect, useCallback } from "react";
import { GameTitleArea } from "./GameTitleArea";
import { RightGameSummary } from "./RightGameSummary";
import { LeftGameSummary } from "./LeftGameSummary/LeftGameSummary";
import { QueueArea } from "./QueueArea";
import gameData, { gamesData, MovieEntry } from "../gameData";
import "./MediaAndSummary.scss";
import "./steamVideo.scss";

const MediaAndSummary: FC<{ game: gamesData }> = ({ game }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAutoplay, setAutoplay] = useState<boolean>(true);
  const [initialRender, setInitialRender] = useState(true);
  const [isMouseOverScreenshot, setIsMouseOverScreenshot] =
    useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // this is responsible for the page background
    document.body.style.background = `url(${game.backgroundImage}) center top no-repeat #1b2838`;

    // this is responsible for the tab title
    document.title = `${game.name} on Steam`;

    // this is responsible for skipping the first videos after the page loads if autoplay is off
    if (!isAutoplay) {
      const firstNonVideoItem = game.moviesAndImages.find(
        (entry) => entry.type !== "video"
      );
      setSelectedItem(firstNonVideoItem?.link || null);
    } else {
      setSelectedItem(
        game.moviesAndImages.find((entry) => entry.type === "video")?.link ||
          null
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
      game.moviesAndImages.findIndex((entry) => entry.link === selectedItem) *
      120;

    const slideArea = document.querySelector(".slide-area");
    if (slideArea) {
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
      } else if (indicatorPosition + 140 > scrollLeft + visibleWidth) {
        // Scroll to the right to bring the selected item into view
        slideArea.scrollBy({
          left: indicatorPosition + 730 - (scrollLeft + visibleWidth),
          behavior: "smooth",
        });
      }
    }
  }, [game, isAutoplay, selectedItem]);

  //730 - 612 = 118

  // function to swap photos and videos and photos with left swap button
  const handleLeftSwap = useCallback(
    (currentIndex: number) => {
      const slideArea = document.querySelector(".slide-area");
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
    [game, setSelectedItem]
  );

  // function controlling the behavior of the right and left buttons under the slides area
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
  };

  // auto swap for screenshots function
  useEffect(() => {
    const screenshotIntervalId = setInterval(() => {
      if (
        selectedItem &&
        typeof selectedItem === "string" &&
        game.moviesAndImages.find((entry) => entry.link === selectedItem)
          ?.type !== "video"
      ) {
        handleSwap();
      }
    }, 5000);

    return () => {
      clearInterval(screenshotIntervalId);
    };
  });

  // auto swap for videos function
  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnded = () => {
      console.log("Video ended. Swapping...");
      handleSwap();
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
          setInitialRender(false); // Update the state to indicate that the initial render has occurred
        }, 0); // Adjust the duration as needed

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
            <RightGameSummary game={game} />
            <LeftGameSummary
              selectedItem={selectedItem}
              selectedEntry={selectedEntry}
              videoRef={videoRef}
              isAutoplay={isAutoplay}
              setAutoplay={setAutoplay}
              isMouseOverScreenshot={isMouseOverScreenshot}
              setIsMouseOverScreenshot={setIsMouseOverScreenshot}
              game={game}
              setSelectedItem={setSelectedItem}
              handleSliderClick={handleSliderClick}
            />
          </div>
        </div>
      </div>
      <QueueArea game={game} />
    </div>
  );
};

export default MediaAndSummary;
