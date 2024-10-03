'use client';

// NextJS
import Image from 'next/image';

// Images
import highlightSpacer from '@images/game_highlight_image_spacer.gif';
import externalLinkIcon from '@images/ico_external_link.gif';

// Types
import type { ImageEntry } from '@entities/game.entity';
import type { JSX } from 'react';
import type { ScreenshotModalProps, ScreenshotProps } from '../../MediaAndSummary.types';

export function ScreenshotModal({
  imgSrc,
  onClose,
  currentScreenshotIndex,
  game,
  selectedItem,
  setSelectedItem,
}: ScreenshotModalProps): JSX.Element {
  const handleModalClick = (direction: 'left' | 'right'): void => {
    const currentIndex: number = game.imageEntries.findIndex(
      (entry) => entry.link === selectedItem
    );

    let newIndex: number = currentIndex;
    do {
      newIndex =
        direction === 'left'
          ? (currentIndex - 1 + game.imageEntries.length) % game.imageEntries.length
          : (currentIndex + 1) % game.imageEntries.length;
    } while (!game.imageEntries[newIndex]);

    const newEntry: ImageEntry = game.imageEntries[newIndex];

    setSelectedItem(newEntry.link);
  };

  const totalScreenshots: number = game.imageEntries.length;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="popup-modal">
        <div className="modal--content">
          <div className="screenshot-title">
            <a href={imgSrc} target="_blank" rel="noreferrer noopenner">
              Open image in new tab&nbsp;
              <Image src={externalLinkIcon} alt="Screenshot" />
            </a>
          </div>
          <div className="screenshot-img">
            <img src={imgSrc} alt="Screenshot" onClick={() => handleModalClick('right')} />
          </div>
          <div className="modal--footer">
            <div className="count">
              {currentScreenshotIndex + 1} of {totalScreenshots} screenshots
            </div>
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

export function Screenshot({ imgSrc, onEnter, onLeave, openModal }: ScreenshotProps): JSX.Element {
  return (
    <div className="player-area">
      <Image className="area-spacer" src={highlightSpacer} alt="" />
      <div className="player-item">
        <div className="screenshot-holder" onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <a className="screenshot-link" onClick={openModal}>
            <img src={imgSrc} alt="Screenshot" />
          </a>
        </div>
      </div>
    </div>
  );
}
