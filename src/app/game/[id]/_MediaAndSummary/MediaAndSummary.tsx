'use client';

// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import GameOwned from './GameOwned/GameOwned';
import GameTitleArea from './GameTitleArea/GameTitleArea';
import LeftGameSummary from './LeftGameSummary/LeftGameSummary';
import { ScreenshotModal } from './LeftGameSummary/Screenshot/Screenshot';
import QueueArea from './QueueArea/QueueArea';
import RightGameSummary from './RightGameSummary/RightGameSummary';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// Styles
import '@styles/game/MediaAndSummary.scss';

// Types
import type { ImageEntry, VideoEntry } from '@interfaces/game';
import type { FC, JSX, MouseEvent, MutableRefObject } from 'react';
import type { MediaAndSummaryProps } from './MediaAndSummary.types';

const MediaAndSummary: FC<MediaAndSummaryProps> = ({ game }): JSX.Element => {
  // Init
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAutoplay, setAutoplay] = useState<boolean>(true);
  const [autoplayInitialized, setAutoplayInitialized] = useState<boolean>(false);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const [isMouseOverScreenshot, setIsMouseOverScreenshot] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState<number>(0);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slideAreaRef = useRef<HTMLDivElement | null>(null);

  const isInLibrary: boolean | undefined = useMemo(
    () => currentUserData?.library?.some((item) => item.id === game.id),
    [currentUserData, game.id]
  );

  // filter screenshots only number from the media
  const selectedEntryIndex: number = game.imageEntries.findIndex(
    (entry) => entry.link === selectedItem
  );

  const openModal = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const orderedMedia: (ImageEntry | VideoEntry)[] | undefined = useMemo(() => {
    return [...game.imageEntries, ...game.videoEntries].sort((a, b) => {
      return a.order - b.order;
    });
  }, [game.imageEntries, game.videoEntries]);

  // this is responsible for skipping the first videos after the page loads if autoplay is off
  // and handle the loading of the first image if video doesnt exist
  useEffect(() => {
    const videoExist: VideoEntry | undefined = orderedMedia?.find(isVideoEntry);
    if (!isAutoplay || !videoExist) {
      setSelectedItem(
        orderedMedia.find((entry) => !isVideoEntry(entry))?.link || orderedMedia[0]?.link || null
      );
    } else {
      setSelectedItem(orderedMedia[0]?.link || null);
    }
  }, [orderedMedia, isAutoplay]);

  // function to swap photos and videos and photos with autoplay or the right swap button
  const handleSwap = useCallback((): void => {
    const currentIndex: number = orderedMedia.findIndex((entry) => entry.link === selectedItem);
    const totalScreenshots: number = orderedMedia.filter((entry) => !isVideoEntry(entry)).length;
    const nextIndex: number = (currentScreenshotIndex + 1) % totalScreenshots;
    setCurrentScreenshotIndex(nextIndex);

    if (isAutoplay) {
      const nextIndex: number = (currentIndex + 1) % orderedMedia.length;
      setSelectedItem(orderedMedia[nextIndex].link);
    } else {
      const nextPhotoIndex: number = orderedMedia.findIndex(
        (entry, idx) => idx > currentIndex && !isVideoEntry(entry)
      );

      if (nextPhotoIndex !== -1) {
        setSelectedItem(orderedMedia[nextPhotoIndex].link);
      } else {
        setSelectedItem(orderedMedia.find((entry) => !isVideoEntry(entry))?.link || null);
      }
    }

    // Check if the selected item is outside the visible area
    const indicatorPosition: number =
      orderedMedia.findIndex((entry) => entry.link === selectedItem) * 120;

    const slideArea: HTMLDivElement | null = slideAreaRef.current;
    if (slideArea) {
      // Calculate visible width dynamically
      const visibleWidth: number = slideArea.clientWidth;
      const scrollLeft: number = slideArea.scrollLeft;

      if (currentIndex === orderedMedia.length - 1) {
        // If the index is 0, scroll to the start
        slideArea.scroll({
          left: 0,
          behavior: 'smooth',
        });
      } else if (indicatorPosition + 140 < scrollLeft) {
        // Scroll to the left to bring the selected item into view
        slideArea.scrollBy({
          left: indicatorPosition + 120 - scrollLeft,
          behavior: 'smooth',
        });
      } else if (indicatorPosition + 240 > scrollLeft + visibleWidth) {
        // Scroll to the right to bring the selected item into view
        slideArea.scrollBy({
          left: indicatorPosition + visibleWidth + 120 - (scrollLeft + visibleWidth),
          behavior: 'smooth',
        });
      }
    }
  }, [orderedMedia, currentScreenshotIndex, isAutoplay, selectedItem]);

  // function to swap photos and videos and photos with left swap button
  const handleLeftSwap = useCallback(
    (currentIndex: number): void => {
      const totalScreenshots: number = orderedMedia.filter((entry) => !isVideoEntry(entry)).length;
      const nextIndex: number = (currentScreenshotIndex - 1 + totalScreenshots) % totalScreenshots;
      setCurrentScreenshotIndex(nextIndex);

      const slideArea: HTMLDivElement | null = slideAreaRef.current;
      if (slideArea) {
        const indicatorPosition: number = currentIndex * 120;

        // Calculate the distance from the left edge to the indicator
        const distanceToLeftEdge: number = indicatorPosition - 120 - slideArea.scrollLeft;

        // Check if the indicator is going out of the left edge
        const isOutOfLeftEdge: boolean = distanceToLeftEdge < 0;

        // If the index is not the first, move to the previous item
        if (currentIndex > 0) {
          const nextIndex: number = currentIndex - 1;
          setSelectedItem(orderedMedia[nextIndex].link);

          // If the indicator is out of the left edge, scroll to the left
          if (isOutOfLeftEdge) {
            slideArea.scrollBy({
              left: distanceToLeftEdge,
              behavior: 'smooth',
            });
          }
        } else {
          // If the index is the first, scroll to the end only if it's not already at the last item
          if (slideArea.scrollLeft !== (orderedMedia.length - 1) * 120) {
            slideArea.scroll({
              left: (orderedMedia.length - 1) * 120,
              behavior: 'smooth',
            });
          }
        }
      }
    },
    [orderedMedia, currentScreenshotIndex]
  );

  // function controlling the behavior of the previous and next buttons in the screenshots modal
  const handleSliderClick = (direction: 'left' | 'right'): void => {
    const currentIndex: number = orderedMedia.findIndex((entry) => entry.link === selectedItem);

    let nextIndex: number = currentIndex;

    if (direction === 'right') {
      // Find the next video or screenshot index
      nextIndex = (currentIndex + 1) % orderedMedia.length;
      handleSwap();
    } else {
      // Find the previous video or screenshot index
      nextIndex = (currentIndex - 1 + orderedMedia.length) % orderedMedia.length;
      handleLeftSwap(currentIndex);
    }

    // Set the selectedItem based on the nextIndex
    setSelectedItem(orderedMedia[nextIndex].link);

    const totalScreenshots: number = orderedMedia.filter((entry) => !isVideoEntry(entry)).length;
    if (direction === 'right') {
      // Increment the index when clicking right
      setCurrentScreenshotIndex((prevIndex) => (prevIndex + 1) % totalScreenshots);
    } else if (direction === 'left') {
      // Decrement the index when clicking left
      setCurrentScreenshotIndex(
        (prevIndex) => (prevIndex - 1 + totalScreenshots) % totalScreenshots
      );
    }
  };

  // check if the tab is visible
  const isPageVisible: MutableRefObject<boolean> = useRef<boolean>(true);
  useEffect(() => {
    // Set up event listeners for visibility changes
    const handleVisibilityChange = (): void => {
      isPageVisible.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up event listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // auto swap for screenshots function
  useEffect(() => {
    const screenshotIntervalId: NodeJS.Timeout = setInterval(() => {
      if (
        selectedItem &&
        !isVideoEntry(orderedMedia.find((entry) => entry.link === selectedItem)) &&
        !isModalOpen &&
        isPageVisible.current
      ) {
        handleSwap();
      }
    }, 5000);

    return () => {
      clearInterval(screenshotIntervalId);
    };
  }, [selectedItem, isModalOpen, handleSwap, orderedMedia]);

  // auto swap for videos function
  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    // Check if the page is visible before swapping
    const handleVideoEnded = (): void => {
      if (isPageVisible.current) {
        handleSwap();
      }
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnded);

      return () => {
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, [handleSwap, selectedItem]);

  // auto swap for the first video if autoplay is off
  useEffect(() => {
    if (initialRender) {
      const firstVideo: VideoEntry | undefined = orderedMedia.find((entry) => isVideoEntry(entry));

      if (!isAutoplay && firstVideo && selectedItem === firstVideo.link) {
        const videoSwapTimeout: NodeJS.Timeout = setTimeout(() => {
          handleSwap();
          setInitialRender(false);
        }, 0);

        return () => {
          clearTimeout(videoSwapTimeout);
        };
      }
    }
  }, [orderedMedia, handleSwap, initialRender, isAutoplay, selectedItem]);

  // variable that represents the currently selected item
  const selectedEntry: ImageEntry | VideoEntry | undefined = orderedMedia?.find(
    (entry) => entry.link === selectedItem
  );

  return (
    <div className="MediaAndSummary" key={game.id}>
      <GameTitleArea game={game} />
      <div className="game-background">
        <div className="game-page-content">
          <div className="media-summary-block">
            <RightGameSummary
              game={game}
              isViewport630={isViewport630}
              isViewport960={isViewport960}
            />
            <LeftGameSummary
              selectedItem={selectedItem}
              selectedEntry={selectedEntry}
              isAutoplay={isAutoplay}
              setAutoplay={setAutoplay}
              autoplayInitialized={autoplayInitialized}
              setAutoplayInitialized={setAutoplayInitialized}
              isMouseOverScreenshot={isMouseOverScreenshot}
              setIsMouseOverScreenshot={setIsMouseOverScreenshot}
              orderedMedia={orderedMedia}
              setSelectedItem={setSelectedItem}
              handleSliderClick={handleSliderClick}
              openModal={openModal}
              videoRef={videoRef}
              slideAreaRef={slideAreaRef}
            />
          </div>
        </div>
      </div>
      <QueueArea game={game} isViewport630={isViewport630} isViewport960={isViewport960} />

      {isInLibrary && <GameOwned game={game} />}

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
