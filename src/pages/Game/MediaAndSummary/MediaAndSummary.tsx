import { FC, useState, useRef, useEffect } from "react";
import "./MediaAndSummary.css";
import "./steamVideo.css";

const SteamVideo: React.FC<unknown> = () => {
  const videoSettings = {
    poster:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/256969851/movie.293x165.jpg",
    src: "videos/4_5828148300003414123.mp4",
    controls: false,
    playsInline: true,
  };

  const [overlayBottom, setOverlayBottom] = useState("-35px");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAutoplay, setAutoplay] = useState(true);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeSliderValue, setVolumeSliderValue] = useState(100);
  const [isMuted, setMuted] = useState(false);
  const downloadProgressBarRef = useRef<HTMLProgressElement | null>(null);
  const videoProgressBarRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setOverlayBottom("0");
  };

  const handleMouseLeave = () => {
    setOverlayBottom("-35px");
  };

  const handleTimeUpdate: React.EventHandler<
    React.SyntheticEvent<HTMLVideoElement>
  > = (event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setCurrentTime(video.currentTime);

    // Calculate the playback progress percentage
    const progressPercentage = (video.currentTime / video.duration) * 100;

    // Update the video playback progress bar
    if (videoProgressBarRef.current) {
      videoProgressBarRef.current.value = progressPercentage.toString();
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;
    if (video) {
      const seekTime = (event.target.valueAsNumber / 100) * video.duration;
      video.currentTime = seekTime;
    }
  };

  const handleDurationChange = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setDuration(video.duration);
  };

  const handleAutoplayToggle = () => {
    setAutoplay(!isAutoplay);
  };

  const handlePlayPause = () => {
    setPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10) / 100;
    setVolumeSliderValue(parseInt(event.target.value, 10));
    setVolume(newVolume);
  };

  const handleFullscreen = () => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const video = videoRef.current;

      if (video) {
        const bufferedEnd = video.buffered.end(0); // Get the end time of the buffered range
        const totalDuration = video.duration;

        const bufferedPercentage = (bufferedEnd / totalDuration) * 100;

        // Check if a certain percentage of the video is buffered (e.g., 50%)
        if (bufferedPercentage >= 80) {
          // Do something, like moving to the next part
          console.log('At least 50% of the video has been buffered. Proceed to the next part.');
        } else {
          // Continue buffering
          console.log(`Buffered: ${bufferedPercentage.toFixed(2)}%`);
        }
      }
    };

    const video = videoRef.current;

    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

  useEffect(() => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    const handleTimeUpdate = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement;
      setCurrentTime(video.currentTime);

      // Calculate the playback progress percentage
      const progressPercentage = (video.currentTime / video.duration) * 100;

      // Update the video playback progress bar
      if (videoProgressBarRef.current) {
        videoProgressBarRef.current.value = progressPercentage.toString();
      }
    };

    const handleDownloadProgress = () => {
      const video = document.querySelector(
        ".highlight-movie video"
      ) as HTMLVideoElement;

      if (video && downloadProgressBarRef.current) {
        const loaded = video.buffered.end(0);
        const total = video.duration;

        const progressPercentage = (loaded / total) * 100;
        downloadProgressBarRef.current.value = progressPercentage;
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
      video.addEventListener("progress", handleDownloadProgress);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        video.removeEventListener("progress", handleDownloadProgress);
      };
    }
  }, [currentTime, duration]);

  useEffect(() => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    if (video) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    if (video) {
      video.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      className="player-area"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="area-spacer"
        src="/images/game_highlight_image_spacer.gif"
        alt=""
      />
      <div className="highlight-movie">
        <video
          className="highlight-movie"
          {...videoSettings}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
        />
        <div
          className="video-overlay"
          style={{ bottom: overlayBottom, transition: "all 0.5s" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`play-btn ${isPlaying ? "pause" : "play"}`}
            onClick={handlePlayPause}
          ></div>
          <div className="control-container">
            <div className={`fullscreen-btn`} onClick={handleFullscreen}></div>
            <div className="video-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div
              className={`volume-icon ${isMuted ? "muted" : null}`}
              onClick={handleMuteToggle}
            >
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
              className={`autoplay-checkbox ${isAutoplay ? "checked" : ""}`}
              onClick={handleAutoplayToggle}
            ></div>
            <div className="autoplay-label">Autoplay videos</div>
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar-container">
              <div>
                <progress
                  max="100"
                  ref={downloadProgressBarRef}
                  className="progress-bar-download"
                />
              </div>
              <div className="progress-bar-progress">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={(e) => handleSeek(e)}
                  ref={videoProgressBarRef}
                  className="range-input"
                />
                <div
                  className="filled-track"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MediaAndSummary: FC = () => {
  useEffect(() => {
    document.body.style.background =
      'url("https://cdn.cloudflare.steamstatic.com/steam/apps/2344520/page_bg_generated_v6b.jpg?t=1699897087") center top no-repeat #1b2838';

    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <>
      <div className="game-title-area">
        <div className="genre-block">
          <a href="/search/">
            <span className="genre-item">All Games</span>
          </a>{" "}
          &gt;{" "}
          <a href="/genre/RPG/">
            <span className="genre-item">gameCategory</span>
          </a>{" "}
          &gt;{" "}
          <a href="/game/gameName/">
            <span className="genre-item">Hamas</span>
          </a>
        </div>
        <div className="game-header-content">
          <div className="game-community">
            <a className="community-btn" href="">
              <span>Community Hub</span>
            </a>
          </div>
          <div className="main-game-name">Hamas</div>
        </div>
      </div>
      <div className="game-background">
        <div className="game-page-content">
          <div className="media-summary-block">
            <div className="right-game-summary">
              <div className="game-image">
                <img className="image-full" src="images/hamas.png" alt="" />
              </div>
              <div className="game-discription">
                {" "}
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                at eum natus, soluta recusandae ex quasi optio officia omnis
                perspiciatis debitis odit ab accusantium culpa libero dolorem
                incidunt, quaerat nihil!
              </div>
              <div className="game-glance-first">
                <div className="user-reviews">
                  <div className="user-reviews-summary">
                    <div className="summary-subtitle">All Reviews:</div>
                    <div className="summary-column">
                      <span className="game-review-summary mixed">Mixed</span>
                      <span className="game-review-count"> (number) </span>
                    </div>
                  </div>
                </div>
                <div className="release-date">
                  <div className="summary-subtitle">Release Date:</div>
                  <div className="date">DD MMM, YYYY</div>
                </div>
                <div className="dev-publish">
                  <div className="summary-subtitle">Developer:</div>
                  <div className="summary-column">
                    <a href="">developer name</a>
                  </div>
                </div>
                <div className="dev-publish">
                  <div className="summary-subtitle">Publisher:</div>
                  <div className="summary-column">
                    <a href="">publisher name</a>
                  </div>
                </div>
                <div className="user-defined-tags">
                  <div className="glance-tags-label">
                    Popular user-defined tags for this product:
                  </div>
                  <div className="glance-tags">
                    <a className="game-tag" href="">
                      tag1
                    </a>
                    <a className="game-tag" href="">
                      tag2
                    </a>
                    <a className="game-tag" href="">
                      tag3
                    </a>
                    <a className="game-tag" href="">
                      tag4
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="left-game-summary">
              <div className="game-highlights">
                <SteamVideo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaAndSummary;
