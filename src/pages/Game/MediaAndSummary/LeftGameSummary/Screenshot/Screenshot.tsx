'use client';

// Next.js
import Image from 'next/image';

// Images
import highlightSpacer from 'images/game_highlight_image_spacer.gif';
import externalLinkIcon from 'images/ico_external_link.gif';

// Types
import type { FC } from 'react';
import type { ImageEntry, MediaEntry } from 'services/gameData/gameData';
import type { ScreenshotModalProps, ScreenshotProps } from '../../MediaAndSummary.types';

export const ScreenshotModal: FC<ScreenshotModalProps> = ({
  imgSrc,
  onClose,
  currentScreenshotIndex,
  game,
  selectedItem,
  setSelectedItem,
}) => {
  const handleModalClick = (direction: 'left' | 'right') => {
    const isImageEntry = (entry: MediaEntry): entry is ImageEntry => {
      return entry.type === 'image';
    };

    const filteredEntries = game.moviesAndImages.filter(isImageEntry);
    const currentIndex = filteredEntries.findIndex((entry) => entry.link === selectedItem);

    let newIndex;
    do {
      newIndex =
        direction === 'left'
          ? (currentIndex - 1 + filteredEntries.length) % filteredEntries.length
          : (currentIndex + 1) % filteredEntries.length;
    } while (!filteredEntries[newIndex]);

    const newEntry = filteredEntries[newIndex];

    setSelectedItem(newEntry.link);
  };
  const isImageEntry = (entry: MediaEntry): entry is ImageEntry => {
    return entry.type === 'image';
  };

  const totalScreenshots = game.moviesAndImages.filter(isImageEntry).length;

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
};

export const Screenshot: FC<ScreenshotProps> = ({ imgSrc, onEnter, onLeave, openModal }) => {
  return (
    <div className="player-area">
      <Image className="area-spacer" src={highlightSpacer} alt="" />
      <div className="player-item">
        <div className="screenshot-holder" onPointerMove={onEnter} onPointerLeave={onLeave}>
          <a className="screenshot-link" onClick={openModal}>
            <img src={imgSrc} alt="Screenshot" />
          </a>
        </div>
      </div>
    </div>
  );
};