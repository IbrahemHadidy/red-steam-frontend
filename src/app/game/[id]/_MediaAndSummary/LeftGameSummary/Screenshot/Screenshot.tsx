'use client';

// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  navigateImageEntry,
  setIsMouseOverScreenshot,
  setIsScreenshotModalOpen,
} from '@store/features/game/gameSlice';

// Custom Hooks
import useAutoScreenshotSwap from './hooks/useAutoScreenshotSwap';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// Images
import highlightSpacer from '@images/game_highlight_image_spacer.gif';
import externalLinkIcon from '@images/ico_external_link.gif';

// Types
import type { MouseEvent, RefObject } from 'react';

export function ScreenshotModal() {
  const dispatch = useAppDispatch();

  //-------------------------- State Selectors --------------------------//
  const { currentGame, currentMediaLink, orderedMediaEntries } = useAppSelector(
    (state) => state.game
  );

  //--------------------------- Event Handlers --------------------------//
  const handleModalClick = (direction: 'left' | 'right'): void => {
    dispatch(navigateImageEntry(direction));
  };

  const closeModal = (): void => {
    dispatch(setIsScreenshotModalOpen(false));
  };

  //------------------------------ Render -------------------------------//
  const totalScreenshots = currentGame?.imageEntries.length ?? 0;
  const currentScreenshotIndex = orderedMediaEntries
    .filter((entry) => !isVideoEntry(entry))
    .findIndex((entry) => entry.link === currentMediaLink);

  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />

      <div className="popup-modal">
        <div className="ss-modal-content">
          <div className="screenshot-title">
            <a href={currentMediaLink ?? ''} target="_blank" rel="noreferrer noopenner">
              Open image in new tab&nbsp;
              <Image src={externalLinkIcon} alt="Screenshot" />
            </a>
          </div>

          <div className="screenshot-img">
            <img
              src={currentMediaLink ?? ''}
              alt="Screenshot"
              onClick={() => handleModalClick('right')}
            />
          </div>

          <div className="ss-modal-footer">
            <span className="count">
              {currentScreenshotIndex + 1} of {totalScreenshots} screenshots
            </span>

            {currentScreenshotIndex > 0 && (
              <div className="prev-next-btn previous" onClick={() => handleModalClick('left')}>
                <span>Previous</span>
              </div>
            )}

            {currentScreenshotIndex < totalScreenshots - 1 && (
              <div className="prev-next-btn next" onClick={() => handleModalClick('right')}>
                <span>Next</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

interface ScreenshotProps {
  slideAreaRef: RefObject<HTMLDivElement | null>;
  src: string;
}
export function Screenshot({ slideAreaRef, src }: ScreenshotProps) {
  const dispatch = useAppDispatch();

  //-------------------------- State Selectors --------------------------//
  const { isPageVisible } = useAppSelector((state) => state.game);

  //------------------------------- Hooks -------------------------------//
  useAutoScreenshotSwap(isPageVisible, slideAreaRef);

  //--------------------------- Event Handlers ---------------------------//
  const handleMouseEnter = (): void => {
    dispatch(setIsMouseOverScreenshot(true));
  };

  const handleMouseLeave = (): void => {
    dispatch(setIsMouseOverScreenshot(false));
  };

  const openModal = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(setIsScreenshotModalOpen(true));
  };

  //------------------------------- Render -------------------------------//
  return (
    <div className="player-area">
      <Image className="area-spacer" src={highlightSpacer} alt="Highlight Spacer" />

      <div className="player-item">
        <div
          className="screenshot-holder"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a className="screenshot-link" onClick={openModal}>
            <img src={src} alt="Screenshot" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
  );
}
