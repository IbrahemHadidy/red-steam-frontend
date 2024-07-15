import type { Dispatch, MouseEventHandler, RefObject, SetStateAction } from 'react';
import type { gamesData, MediaEntry } from 'services/gameData/gameData';

export interface MediaAndSummaryProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface GameOwnedProps {
  game: gamesData;
}

export interface GameTitleAreaProps {
  category: string;
  name: string;
}

export interface QueueAreaProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface RightGameSummaryProps {
  game: gamesData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface LeftGameSummaryProps {
  videoRef: RefObject<HTMLVideoElement>;
  selectedItem: string | null;
  selectedEntry: MediaEntry | undefined;
  isAutoplay: boolean;
  setAutoplay: Dispatch<SetStateAction<boolean>>;
  isMouseOverScreenshot: boolean;
  setIsMouseOverScreenshot: Dispatch<SetStateAction<boolean>>;
  game: gamesData;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  handleSliderClick: (direction: 'left' | 'right') => void;
  openModal: MouseEventHandler<HTMLAnchorElement>;
  autoplayInitialized: boolean;
  setAutoplayInitialized: Dispatch<SetStateAction<boolean>>;
  wasPausedBeforeSwap: boolean;
  setWasPausedBeforeSwap: Dispatch<SetStateAction<boolean>>;
}

export interface SlidesProps {
  selectedItem: string | null;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  game: gamesData;
}

export interface SlideItemProps {
  entry: MediaEntry;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
}

export interface SliderButtonsProps {
  handleSliderClick: (direction: 'left' | 'right') => void;
}

export interface ScreenshotModalProps {
  imgSrc: string;
  onClose: () => void;
  currentScreenshotIndex: number;
  game: gamesData;
  selectedItem: string | null;
  selectedEntry: MediaEntry | undefined;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
}

export interface ScreenshotProps {
  imgSrc: string;
  isMouseOverScreenshot: boolean;
  onEnter: () => void;
  onLeave: () => void;
  openModal: MouseEventHandler<HTMLAnchorElement>;
}

export interface SteamVideoProps {
  videoRef: RefObject<HTMLVideoElement>;
  videoSrc: string;
  poster: string;
  isAutoplay: boolean;
  setAutoplay: Dispatch<SetStateAction<boolean>>;
  autoplayInitialized: boolean;
  setAutoplayInitialized: Dispatch<SetStateAction<boolean>>;
  wasPausedBeforeSwap: boolean;
  setWasPausedBeforeSwap: Dispatch<SetStateAction<boolean>>;
}

export interface TagsModalProps {
  onClose: () => void;
  tags: string[];
}
