'use client';

// React
import { useRef } from 'react';

// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setAutoPlayVideo,
  setOverlayVisible,
  setVideoMuted,
  setVideoVolume,
} from '@store/features/game/gameSlice';

// Custom Hooks
import useAutoVideoSwap from './hooks/useAutoVideoSwap';
import useVideoAutoplay from './hooks/useVideoAutoplay';
import useVideoFullscreen from './hooks/useVideoFullscreen';
import useVideoPlaybackOnVisibility from './hooks/useVideoPlaybackOnVisibility';
import useVideoPlayState from './hooks/useVideoPlayState';
import useVideoProgress from './hooks/useVideoProgress';
import useVideoVisibility from './hooks/useVideoVisibility';
import useVideoVolume from './hooks/useVideoVolume';

// Utils
import {
  formatTime,
  fullscreenVideo,
  updateDisplayTime,
  updateVideoCurrentTime,
} from './video-utils';

// Images
import highlightSpacer from '@images/game_highlight_image_spacer.gif';

// Styles
import '@styles/game/SteamVideo.scss';

// Types
import type {
  ChangeEvent,
  EventHandler,
  RefObject,
  SyntheticEvent,
  VideoHTMLAttributes,
} from 'react';

interface SteamVideoProps {
  slideAreaRef: RefObject<HTMLDivElement | null>;
  videoSrc: string | undefined;
  poster: string | undefined;
}

export default function SteamVideo({ slideAreaRef, videoSrc, poster }: SteamVideoProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //-------------------------------- Refs ---------------------------------//
  const playerAreaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement | null>(null);
  const bufferProgressBarRef = useRef<HTMLProgressElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  //---------------------------- State Selectors ---------------------------//
  const { isPageVisible, overlayVisible, autoPlayVideo, videoVolume, videoMuted } = useAppSelector(
    (state) => state.game
  );

  //----------------------------- State Hooks -----------------------------//
  const { isVideoPlaying, play, pause } = useVideoPlayState(videoRef);
  const { videoCurrentTime, videoDuration } = useVideoProgress(
    videoRef,
    progressBarRef,
    bufferProgressBarRef
  );

  //-------------------------------- Hooks --------------------------------//
  useVideoVisibility(videoRef);
  useVideoPlaybackOnVisibility(videoRef);
  useVideoVolume(videoRef);
  useVideoAutoplay(videoRef);
  useVideoFullscreen(videoOverlayRef);
  useAutoVideoSwap(isPageVisible, videoRef, slideAreaRef);

  //---------------------------- Event Handlers ---------------------------//
  const handleTimeUpdate: EventHandler<SyntheticEvent<HTMLVideoElement>> = (): void => {
    updateDisplayTime(videoRef.current, progressBarRef.current);
  };

  const handleProgressBarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.valueAsNumber;
    updateVideoCurrentTime(videoRef.current, value);
  };

  const handlePlayPauseClick = (): void => {
    if (isVideoPlaying) pause();
    else play();
  };

  const handleMouseEnter = (): void => {
    clearTimeout(timeoutRef.current);
    dispatch(setOverlayVisible(true));
  };

  const handleMouseLeave = (): void => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(setOverlayVisible(false));
    }, 1000);
  };

  const handleVideoPlay = (): void => {
    play();
  };

  const handleVideoPause = (): void => {
    pause();
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseInt(e.target.value, 10) / 100;
    dispatch(setVideoVolume(newVolume));
  };

  const handleMuteToggle = (): void => {
    dispatch(setVideoMuted(!videoMuted));
  };

  const handleAutoplayToggle = (): void => {
    dispatch(setAutoPlayVideo(!autoPlayVideo));
  };

  const handleFullscreenClick = (): void => {
    fullscreenVideo(playerAreaRef.current, dispatch);
  };

  //---------------------------- Video Settings ---------------------------//
  const videoSettings: VideoHTMLAttributes<HTMLVideoElement> = {
    poster,
    src: videoSrc,
    controls: false,
    playsInline: true,
    disablePictureInPicture: true,
    preload: 'metadata',
  };

  //-------------------------------- Render -------------------------------//  
  return (
    <div
      className="player-area"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={playerAreaRef}
    >
      <Image className="area-spacer" src={highlightSpacer} alt="area-spacer" />
      <div className="highlight-movie">
        <video
          className="highlight-movie"
          {...videoSettings}
          disablePictureInPicture={false}
          ref={videoRef}
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayPauseClick}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />

        <div
          className="video-overlay"
          style={{ bottom: overlayVisible ? '0' : '-37px', transition: 'all 0.5s' }}
          ref={videoOverlayRef}
        >
          <div
            className={`play-btn ${isVideoPlaying ? 'pause' : 'play'}`}
            onClick={handlePlayPauseClick}
          />

          <div className="control-container">
            <div className={`fullscreen-btn`} onClick={handleFullscreenClick}></div>

            <div className="video-time">
              {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
            </div>

            <div className={`volume-icon ${videoMuted && 'muted'}`} onClick={handleMuteToggle}>
              {videoMuted ? <div className="muted" /> : null}
            </div>
            <div className="volume-slider">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={videoVolume * 100}
                onChange={handleVolumeChange}
              />
            </div>

            <div
              className={`autoplay-checkbox ${autoPlayVideo ? 'checked' : ''}`}
              onClick={handleAutoplayToggle}
            />
            <div className="autoplay-label">Autoplay videos</div>
          </div>

          <div className="progress-bar-wrapper">
            <div className="progress-bar-container">
              <div>
                <progress max="100" ref={bufferProgressBarRef} className="progress-bar-buffer" />
              </div>

              <div className="progress-bar-progress">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={(videoCurrentTime / videoDuration) * 100 || 0}
                  onChange={handleProgressBarChange}
                  ref={progressBarRef}
                  className="range-input"
                />

                <div
                  className="filled-track"
                  style={{
                    width: `${(videoCurrentTime / videoDuration) * 100 || 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
