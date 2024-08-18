'use client';

// React
import { useCallback, useEffect, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';

// Images
import highlightSpacer from 'images/game_highlight_image_spacer.gif';

// Styles
import 'styles/game/SteamVideo.scss';

// Types
import type { ChangeEvent, EventHandler, FC, JSX, SyntheticEvent } from 'react';
import type { SteamVideoProps, VideoSettings } from '../../MediaAndSummary.types';

export const SteamVideo: FC<SteamVideoProps> = ({
  videoRef,
  videoSrc,
  poster,
  isAutoplay,
  setAutoplay,
  autoplayInitialized,
  setAutoplayInitialized,
  wasPausedBeforeSwap,
  setWasPausedBeforeSwap,
}): JSX.Element => {
  // States
  const [overlayBottom, setOverlayBottom] = useState<string>('-37px');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(parseFloat(localStorage.getItem('volume') || '1'));
  const [volumeSliderValue, setVolumeSliderValue] = useState<number>(() => volume * 100);
  const [isMuted, setMuted] = useState<boolean>(
    JSON.parse(localStorage.getItem('isMuted') || 'false')
  );

  // Refs
  const playerAreaRef = useRef<HTMLDivElement | null>(null);
  const videoOverlayRef = useRef<HTMLDivElement | null>(null);
  const bufferProgressBarRef = useRef<HTMLProgressElement | null>(null);
  const videoProgressBarRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Video settings
  const videoSettings: VideoSettings = {
    poster,
    src: videoSrc,
    controls: false,
    playsInline: true,
    disablePictureInPicture: true,
    autoPlay: true,
  };

  const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // time update function
  const handleTimeUpdate: EventHandler<SyntheticEvent<HTMLVideoElement>> = (): void => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      setCurrentTime(video.currentTime);

      // Calculate the playback progress percentage
      const progressPercentage: number = (video.currentTime / video.duration) * 100;

      // Update the video playback progress bar
      if (videoProgressBarRef.current) {
        videoProgressBarRef.current.value = progressPercentage.toString();
      }
    }
  };

  // seeking time function
  const handleSeek = (event: ChangeEvent<HTMLInputElement>): void => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      const seekTime: number = (event.target.valueAsNumber / 100) * video.duration;
      video.currentTime = seekTime;
    }
  };

  // play/pause button function
  const handlePlayPause = (): void => {
    setPlaying(!isPlaying);
  };

  // hovering over the video functions
  const handleMouseEnter = (): void => {
    clearTimeout(timeoutRef.current);
    setOverlayBottom('0');
  };

  const handleMouseLeave = (): void => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOverlayBottom('-37px');
    }, 1000);
  };

  const handleVideoPlay = (): void => {
    setPlaying(true);
  };

  const handleVideoPause = (): void => {
    setPlaying(false);
  };

  const handleProgressBarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSeek(e);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseInt(e.target.value, 10) / 100;
    setVolumeSliderValue(parseInt(e.target.value, 10));
    setVolume(newVolume);
  };

  const handleMuteToggle = (): void => {
    setMuted(!isMuted);
  };

  const handleAutoplayToggle = (): void => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      setAutoplay(!isAutoplay);
    }
  };

  const handleFullscreenClick = (): void => {
    const playerArea: HTMLDivElement | null = playerAreaRef.current;

    if (playerArea) {
      if (!document.fullscreenElement) {
        playerArea.requestFullscreen().then(() => {
          setOverlayBottom('-37px');
        });
      } else {
        document.exitFullscreen().then(() => {
          setOverlayBottom('0');
        });
      }
    }
  };

  const handleDurationChange = useCallback((): void => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      setDuration(video.duration);
    }
  }, [videoRef]);

  // handle visibility play/pause
  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    const handleVisibilityChange = (): void => {
      if (video && document.hidden) {
        // Save the current playback state before swapping
        setWasPausedBeforeSwap(video.paused);
        video.pause();
      } else {
        // Resume playback only if the video was not paused before the swap
        if (video && !wasPausedBeforeSwap) {
          video.play();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setWasPausedBeforeSwap, videoRef, wasPausedBeforeSwap]);

  // Save autoplay setting to localStorage
  useEffect(() => {
    if (autoplayInitialized) {
      localStorage.setItem('isAutoplay', JSON.stringify(isAutoplay));
    }
  }, [isAutoplay, autoplayInitialized]);

  useEffect(() => {
    const storedAutoplay: string | null = localStorage.getItem('isAutoplay');
    if (storedAutoplay !== null) {
      setAutoplay(JSON.parse(storedAutoplay));
    }
    setAutoplayInitialized(true);
  }, [setAutoplay, setAutoplayInitialized]);

  // play/pause by pressing on screen function
  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.play().catch((error) => console.error('Play error:', error));
      } else {
        video.pause();
      }
    }
  }, [isPlaying, videoRef]);

  // this is used to fix the wrong play/pause button at the begining
  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    const handlePlayStateChange = (): void => {
      setPlaying(!video?.paused);
    };

    if (video) {
      setPlaying(!video.paused);

      video.addEventListener('play', handlePlayStateChange);
      video.addEventListener('pause', handlePlayStateChange);

      return () => {
        video.removeEventListener('play', handlePlayStateChange);
        video.removeEventListener('pause', handlePlayStateChange);
      };
    }
  }, [videoRef]);

  // Save mute setting to localStorage
  useEffect(() => {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      video.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, videoRef]);

  // this is used to make the custom player controls work on the fullscreen too
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      const isFullscreen: boolean = !!document.fullscreenElement;
      const videoOverlay: HTMLDivElement | null = videoOverlayRef.current;

      if (videoOverlay) {
        if (isFullscreen) {
          setOverlayBottom('0');
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // this is used to make the autoplay work after loading metadata
  useEffect(() => {
    const handleLoadedData = (): void => {
      // Video metadata is loaded, autoplay can be attempted
      if (isAutoplay) {
        const video: HTMLVideoElement | null = videoRef.current;

        if (video) {
          video.play().catch((error) => {
            console.error('Autoplay was prevented:', error);
          });
        }
      }
    };

    const video: HTMLVideoElement | null = videoRef.current;

    if (video) {
      video.addEventListener('loadeddata', handleLoadedData);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [isAutoplay, videoRef]);

  // buffer progress fucntion
  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;

    const handleTimeUpdate = (): void => {
      if (video) {
        setCurrentTime(video.currentTime);

        // Calculate the playback progress percentage
        const progressPercentage: number = (video.currentTime / video.duration) * 100;

        // Update the video playback progress bar
        if (videoProgressBarRef.current) {
          videoProgressBarRef.current.value = progressPercentage.toString();
        }
      }
    };

    const handleBufferProgress = (): void => {
      const video: HTMLVideoElement | null = videoRef.current;

      if (video && bufferProgressBarRef.current && video.buffered.length > 0) {
        const loaded: number = video.buffered.end(0);
        const total: number = video.duration;

        const progressPercentage: number = (loaded / total) * 100;
        bufferProgressBarRef.current.value = progressPercentage;
      }
    };

    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('progress', handleBufferProgress);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('durationchange', handleDurationChange);
        video.removeEventListener('progress', handleBufferProgress);
      };
    }
  }, [currentTime, duration, handleDurationChange, videoRef]);

  return (
    <div
      className="player-area"
      onPointerMove={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
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
          onClick={handlePlayPause}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />
        <div
          className="video-overlay"
          style={{ bottom: overlayBottom, transition: 'all 0.5s' }}
          ref={videoOverlayRef}
        >
          <div
            className={`play-btn ${isPlaying ? 'pause' : 'play'}`}
            onClick={handlePlayPause}
          ></div>
          <div className="control-container">
            <div className={`fullscreen-btn`} onClick={handleFullscreenClick}></div>
            <div className="video-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className={`volume-icon ${isMuted && 'muted'}`} onClick={handleMuteToggle}>
              {isMuted ? <div className="muted"></div> : null}
            </div>
            <div className="volume-slider">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={volumeSliderValue}
                onChange={handleVolumeChange}
              />
            </div>
            <div
              className={`autoplay-checkbox ${isAutoplay ? 'checked' : ''}`}
              onClick={handleAutoplayToggle}
            ></div>
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
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleProgressBarChange}
                  ref={videoProgressBarRef}
                  className="range-input"
                />
                <div
                  className="filled-track"
                  style={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
