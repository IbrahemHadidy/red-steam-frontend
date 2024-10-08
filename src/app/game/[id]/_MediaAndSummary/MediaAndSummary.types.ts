import type { Game, ImageEntry, VideoEntry } from '@entities/game.entity';
import type {
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  VideoHTMLAttributes,
} from 'react';
type GameData = Omit<Game, 'languages' | 'totalSales'>;

export interface MediaAndSummaryProps {
  game: Game;
}

export interface GameOwnedProps {
  game: GameData;
}

export interface GameTitleAreaProps {
  game: Game;
}

export interface QueueAreaProps {
  game: GameData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface RightGameSummaryProps {
  game: GameData;
  isViewport630: boolean;
  isViewport960: boolean;
}

export interface LeftGameSummaryProps {
  videoRef: RefObject<HTMLVideoElement>;
  selectedItem: string | null;
  selectedEntry: VideoEntry | ImageEntry | undefined;
  isAutoplay: boolean;
  setAutoplay: Dispatch<SetStateAction<boolean>>;
  isMouseOverScreenshot: boolean;
  setIsMouseOverScreenshot: Dispatch<SetStateAction<boolean>>;
  orderedMedia: (VideoEntry | ImageEntry)[];
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  handleSliderClick: (direction: 'left' | 'right') => void;
  openModal: MouseEventHandler<HTMLAnchorElement>;
  autoplayInitialized: boolean;
  setAutoplayInitialized: Dispatch<SetStateAction<boolean>>;
  slideAreaRef: RefObject<HTMLDivElement>;
}

export interface SlidesProps {
  selectedItem: string | null;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
  orderedMedia: (VideoEntry | ImageEntry)[];
  slideAreaRef: RefObject<HTMLDivElement>;
}

export interface SlideItemProps {
  entry: VideoEntry | ImageEntry;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
}

export interface SliderButtonsProps {
  handleSliderClick: (direction: 'left' | 'right') => void;
}

export interface ScreenshotModalProps {
  imgSrc: string;
  onClose: () => void;
  currentScreenshotIndex: number;
  game: GameData;
  selectedItem: string | null;
  selectedEntry: VideoEntry | ImageEntry | undefined;
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
}

export type VideoSettings = Pick<
  VideoHTMLAttributes<HTMLVideoElement>,
  'poster' | 'src' | 'controls' | 'playsInline' | 'disablePictureInPicture' | 'autoPlay'
>;

export interface TagsModalProps {
  onClose: () => void;
  tags: string[];
}
