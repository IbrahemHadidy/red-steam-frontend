import { useAppSelector } from '@store/hooks';
import { isImageEntry } from '@utils/checkMediaEntry';
import { useEffect } from 'react';
import useMediaSwapHandlers from '../../hooks/useMediaSwapHandlers';

import type { RefObject } from 'react';

/**
 * Handles the auto screenshot swap
 */
export default function useAutoScreenshotSwap(
  isPageVisible: boolean,
  slideAreaRef: RefObject<HTMLDivElement | null>
) {
  const { currentMediaLink, orderedMediaEntries, isScreenshotModalOpen, isMouseOverScreenshot } =
    useAppSelector((state) => state.game);

  const { handleRightSwap } = useMediaSwapHandlers({ slideAreaRef });

  useEffect(() => {
    const screenshotIntervalId = setInterval(() => {
      const isCurrentMediaScreenshot =
        currentMediaLink &&
        isImageEntry(orderedMediaEntries.find((entry) => entry.link === currentMediaLink));

      if (
        isCurrentMediaScreenshot &&
        !isScreenshotModalOpen &&
        !isMouseOverScreenshot &&
        isPageVisible
      ) {
        handleRightSwap();
      }
    }, 5000);

    return () => {
      clearInterval(screenshotIntervalId);
    };
  }, [
    currentMediaLink,
    handleRightSwap,
    isMouseOverScreenshot,
    isPageVisible,
    isScreenshotModalOpen,
    orderedMediaEntries,
  ]);
}
