import { useCallback, useEffect, useState } from 'react';

import { setCurrentMediaIndex, updateCurrentMediaLink } from '@store/features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import isVideoEntry from '@utils/checkMediaEntry';

import type { RefObject } from 'react';

interface UseMediaSwapHandlersProps {
  slideAreaRef: RefObject<HTMLDivElement | null>;
}

interface MediaSwapHandlers {
  handleRightSwap: (ignoreAutoPlay?: boolean) => void;
  handleLeftSwap: (currentIndex: number, ignoreAutoPlay?: boolean) => void;
  handleSwap: (direction: 'left' | 'right') => void;
}

const useMediaSwapHandlers = ({ slideAreaRef }: UseMediaSwapHandlersProps): MediaSwapHandlers => {
  const dispatch = useAppDispatch();

  const { orderedMediaEntries, currentMediaLink, currentMediaIndex, autoPlayVideo } =
    useAppSelector((state) => state.game);

  const SCROLL_BUFFER = 20; // Buffer space in pixels to ensure smooth visibility of media items during scrolling

  const [slideWidth, setSlideWidth] = useState<number>(120);

  // Utility function to calculate total width including margins
  const calculateTotalWidth = (element: HTMLElement) => {
    const width = element.offsetWidth;
    const computedStyle = getComputedStyle(element);
    const marginLeft = parseFloat(computedStyle.marginLeft);
    const marginRight = parseFloat(computedStyle.marginRight);
    return width + marginLeft + marginRight;
  };

  useEffect(() => {
    const slideItemElement = document.querySelector('.highlight-slide-item');
    if (slideItemElement instanceof HTMLElement) {
      const totalWidth = calculateTotalWidth(slideItemElement);
      setSlideWidth(totalWidth);
    }
  }, []);

  /**
   * Handles the behavior of the next button in the media modal.
   * @param ignoreAutoPlay - Whether to ignore autoplay logic for this action.
   */
  const handleRightSwap = useCallback(
    (ignoreAutoPlay = false) => {
      const currentIndex = orderedMediaEntries.findIndex(
        (entry) => entry.link === currentMediaLink
      );

      // Calculate the total number of media entries
      const totalEntries = orderedMediaEntries.length;

      let nextIndex: number;

      if (ignoreAutoPlay) {
        // When ignoring autoplay, simply move to the next item, looping back to the start if necessary
        nextIndex = (currentIndex + 1) % totalEntries;
        dispatch(setCurrentMediaIndex(nextIndex));
        dispatch(updateCurrentMediaLink(orderedMediaEntries[nextIndex].link));
      } else {
        // If autoplay is active, use different logic based on whether the next item is a video
        if (autoPlayVideo) {
          nextIndex = (currentIndex + 1) % totalEntries;
        } else {
          // Find the next image, skipping videos if autoplay is disabled
          let nextPhotoIndex = orderedMediaEntries.findIndex(
            (entry, idx) => idx > currentIndex && !isVideoEntry(entry)
          );

          // If no subsequent image found, wrap back to the first image
          if (nextPhotoIndex === -1) {
            nextPhotoIndex = orderedMediaEntries.findIndex((entry) => !isVideoEntry(entry));
          }

          nextIndex = nextPhotoIndex;
        }

        dispatch(setCurrentMediaIndex(nextIndex));
        dispatch(updateCurrentMediaLink(orderedMediaEntries[nextIndex].link));
      }

      // Scroll the slide area to make the selected media visible
      const slideArea = slideAreaRef.current;
      if (slideArea) {
        const visibleWidth = slideArea.clientWidth;
        const targetPosition = nextIndex * slideWidth;

        // Scroll to start if moving from end to beginning
        if (nextIndex < currentIndex) {
          slideArea.scroll({ left: targetPosition, behavior: 'smooth' });
        } else if (nextIndex >= currentIndex && nextIndex > 0) {
          // Adjust scroll position to ensure visibility of the current item
          const indicatorPosition = nextIndex * slideWidth;
          const scrollLeft = slideArea.scrollLeft;

          if (
            indicatorPosition + slideWidth + SCROLL_BUFFER < scrollLeft ||
            indicatorPosition + slideWidth * 2 > scrollLeft + visibleWidth
          ) {
            slideArea.scroll({ left: targetPosition, behavior: 'smooth' });
          }
        }
      }
    },
    [dispatch, orderedMediaEntries, slideAreaRef, currentMediaLink, autoPlayVideo, slideWidth]
  );

  /**
   * Handles the behavior of the previous button in the media modal.
   * @param currentIndex - The index of the current media entry.
   */
  const handleLeftSwap = useCallback(
    (currentIndex: number) => {
      const slideArea = slideAreaRef.current;
      const totalEntries = orderedMediaEntries.length;

      // Determine the previous index, looping back to the end if necessary
      const nextIndex = (currentIndex - 1 + totalEntries) % totalEntries;

      dispatch(setCurrentMediaIndex(nextIndex));
      dispatch(updateCurrentMediaLink(orderedMediaEntries[nextIndex].link));

      if (slideArea) {
        // Calculate the indicator position to ensure visibility of the selected item
        const indicatorPosition = nextIndex * slideWidth;
        const visibleWidth = slideArea.clientWidth;

        // Scroll back if the previous item is out of view
        if (
          indicatorPosition < slideArea.scrollLeft ||
          indicatorPosition > slideArea.scrollLeft + visibleWidth - slideWidth
        ) {
          slideArea.scrollTo({ left: indicatorPosition, behavior: 'smooth' });
        }
      }
    },
    [dispatch, orderedMediaEntries, slideAreaRef, slideWidth]
  );

  /**
   * Handles media swapping based on direction.
   * @param direction - The direction of the swap ('left' or 'right').
   */
  const handleSwap = useCallback(
    (direction: 'left' | 'right') => {
      const currentIndex = orderedMediaEntries.findIndex(
        (entry) => entry.link === currentMediaLink
      );
      const totalScreenshots = orderedMediaEntries.filter((entry) => !isVideoEntry(entry)).length;

      if (direction === 'right') {
        // Trigger right swap with autoplay ignored, increment index accordingly
        handleRightSwap(true);
        dispatch(setCurrentMediaIndex((currentMediaIndex + 1) % totalScreenshots));
      } else {
        // Trigger left swap and update index
        handleLeftSwap(currentIndex);
        dispatch(
          setCurrentMediaIndex((currentMediaIndex - 1 + totalScreenshots) % totalScreenshots)
        );
      }
    },
    [
      orderedMediaEntries,
      currentMediaLink,
      handleRightSwap,
      handleLeftSwap,
      dispatch,
      currentMediaIndex,
    ]
  );

  return { handleRightSwap, handleLeftSwap, handleSwap };
};

export default useMediaSwapHandlers;
