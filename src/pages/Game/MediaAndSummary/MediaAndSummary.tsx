/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useRef, RefObject, useEffect, useCallback } from "react";
import gameData, { gamesData, MovieEntry } from "../gameData";
import "./MediaAndSummary.scss";
import "./steamVideo.scss";

interface SteamVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  poster: string;
  isAutoplay: boolean;
  setAutoplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const SteamVideo: FC<SteamVideoProps> = ({
  videoRef,
  videoSrc,
  poster,
  isAutoplay,
  setAutoplay,
}) => {
  const videoSettings = {
    poster: poster,
    src: videoSrc,
    controls: false,
    playsInline: true,
    disablePictureInPicture: true,
  };

  const [overlayBottom, setOverlayBottom] = useState("-35px");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setPlaying] = useState(false);
  const [autoplayInitialized, setAutoplayInitialized] = useState(false);

  const [volume, setVolume] = useState(() => {
    const storedVolume = localStorage.getItem("volume");
    return storedVolume ? parseFloat(storedVolume) : 1;
  });
  const [volumeSliderValue, setVolumeSliderValue] = useState(
    () => volume * 100
  );

  const [isMuted, setMuted] = useState(() => {
    const storedMuted = localStorage.getItem("isMuted");
    return storedMuted ? JSON.parse(storedMuted) : false;
  });

  const bufferProgressBarRef = useRef<HTMLProgressElement | null>(null);
  const videoProgressBarRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // hovering over the video functions
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOverlayBottom("0");
  };
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOverlayBottom("-35px");
    }, 1000);
  };

  // time update function
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

  // seeking time function
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    if (video) {
      const seekTime = (event.target.valueAsNumber / 100) * video.duration;
      video.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // progess bar function
  const handleDurationChange = (event: Event) => {
    const video = event.currentTarget as HTMLVideoElement;
    setDuration(video.duration);
  };

  // autoplay button function
  const handleAutoplayToggle = () => {
    const video = videoRef.current;

    if (video) {
      if (!isAutoplay) {
        video.play().catch((error) => {
          console.error("Autoplay was prevented:", error);
        });
      }

      setAutoplay(!isAutoplay);
    }
  };

  // Save autoplay setting to localStorage
  useEffect(() => {
    if (autoplayInitialized) {
      localStorage.setItem("isAutoplay", JSON.stringify(isAutoplay));
    }
  }, [isAutoplay, autoplayInitialized]);
  useEffect(() => {
    const storedAutoplay = localStorage.getItem("isAutoplay");
    if (storedAutoplay !== null) {
      setAutoplay(JSON.parse(storedAutoplay));
    }
    setAutoplayInitialized(true);
  }, [setAutoplay]);

  // play/pause button function
  const handlePlayPause = () => {
    setPlaying(!isPlaying);
  };

  // play/pause by pressing on screen function
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

  // this is used to fix the wrong play/pause button at the begining
  useEffect(() => {
    const video = videoRef.current;

    const handlePlayStateChange = () => {
      setPlaying(!video?.paused);
    };

    if (video) {
      setPlaying(!video.paused);

      video.addEventListener("play", handlePlayStateChange);
      video.addEventListener("pause", handlePlayStateChange);

      return () => {
        video.removeEventListener("play", handlePlayStateChange);
        video.removeEventListener("pause", handlePlayStateChange);
      };
    }
  }, [videoRef]);

  // audio mute button function
  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

  // Save mute setting to localStorage
  useEffect(() => {
    localStorage.setItem("isMuted", JSON.stringify(isMuted));
  }, [isMuted]);

  // volume bar function
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10) / 100;
    setVolumeSliderValue(parseInt(event.target.value, 10));
    setVolume(newVolume);
  };

  // Save volume to localStorage
  useEffect(() => {
    localStorage.setItem("volume", volume.toString());
  }, [volume]);

  useEffect(() => {
    const video = document.querySelector(
      ".highlight-movie video"
    ) as HTMLVideoElement;

    if (video) {
      video.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // fullscreen function
  const handleFullscreen = () => {
    const playerArea = document.querySelector(".player-area") as HTMLElement;

    if (playerArea) {
      if (!document.fullscreenElement) {
        playerArea.requestFullscreen().then(() => {
          setOverlayBottom("-35px");
        });
      } else {
        document.exitFullscreen().then(() => {
          setOverlayBottom("0");
        });
      }
    }
  };

  // this is used to make the custom player controls work on the fullscreen too
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      const videoOverlay = document.querySelector(
        ".video-overlay"
      ) as HTMLElement | null;

      if (videoOverlay) {
        if (isFullscreen) {
          setOverlayBottom("0");
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // this is used to make the autoplay work after loading metadata
  useEffect(() => {
    const handleLoadedData = () => {
      // Video metadata is loaded, autoplay can be attempted
      if (isAutoplay) {
        const video = videoRef.current;

        if (video) {
          video.play().catch((error) => {
            console.error("Autoplay was prevented:", error);
          });
        }
      }
    };

    const video = videoRef.current;

    if (video) {
      video.addEventListener("loadeddata", handleLoadedData);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [isAutoplay, videoRef]);

  // buffer progress fucntion
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

    const handleBufferProgress = () => {
      const video = document.querySelector(
        ".highlight-movie video"
      ) as HTMLVideoElement;

      if (video && bufferProgressBarRef.current && video.buffered.length > 0) {
        const loaded = video.buffered.end(0);
        const total = video.duration;

        const progressPercentage = (loaded / total) * 100;
        bufferProgressBarRef.current.value = progressPercentage;
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("durationchange", handleDurationChange);
      video.addEventListener("progress", handleBufferProgress);

      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("durationchange", handleDurationChange);
        video.removeEventListener("progress", handleBufferProgress);
      };
    }
  }, [currentTime, duration]);

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
          ref={videoRef as RefObject<HTMLVideoElement>}
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayPause}
        />
        <div
          className="video-overlay"
          style={{ bottom: overlayBottom, transition: "all 0.5s" }}
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
              className={`volume-icon ${isMuted && "muted"}`}
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
                  ref={bufferProgressBarRef}
                  className="progress-bar-buffer"
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

const Screenshot: FC<{
  imgSrc: string;
  isMouseOverScreenshot: boolean;
  onEnter: () => void;
  onLeave: () => void;
}> = ({ imgSrc, onEnter, onLeave }) => {
  return (
    <div className="player-area">
      <img
        className="area-spacer"
        src="/images/game_highlight_image_spacer.gif"
        alt=""
      />
      <div className="player-item">
        <div
          className="screenshot-holder"
          onMouseEnter={() => {
            onEnter(); // Call the onEnter handler from props
          }}
          onMouseLeave={() => {
            onLeave(); // Call the onLeave handler from props
          }}
        >
          <a className="screenshot-link" href="">
            <img src={imgSrc} alt="Screenshot" />
          </a>
        </div>
      </div>
    </div>
  );
};

const MediaAndSummary: FC<{ game: gamesData }> = ({ game }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isAutoplay, setAutoplay] = useState<boolean>(true);
  const [initialRender, setInitialRender] = useState(true);
  const [isMouseOverScreenshot, setIsMouseOverScreenshot] =
    useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // this is responsible for the page background
    document.body.style.background = `url(${game.backgroundImage}) center top no-repeat #1b2838`;

    // this is responsible for the tab title
    document.title = `${game.name} on Steam`;

    // this is responsible for skipping the first videos after the page loads if autoplay is off
    if (!isAutoplay) {
      const firstNonVideoItem = game.moviesAndImages.find(
        (entry) => entry.type !== "video"
      );
      setSelectedItem(firstNonVideoItem?.link || null);
    } else {
      setSelectedItem(
        game.moviesAndImages.find((entry) => entry.type === "video")?.link ||
          null
      );
    }

    return () => {
      document.body.style.background = "";
    };
  }, []);

  // function to swap photos and videos and photos with autoplay or the right swap button
  const handleSwap = useCallback(() => {
    const currentIndex = game.moviesAndImages.findIndex(
      (entry) => entry.link === selectedItem
    );

    if (isAutoplay) {
      const nextIndex = (currentIndex + 1) % game.moviesAndImages.length;
      setSelectedItem(game.moviesAndImages[nextIndex].link);
    } else {
      const nextPhotoIndex = game.moviesAndImages.findIndex(
        (entry, index) => index > currentIndex && entry.type !== "video"
      );

      if (nextPhotoIndex !== -1) {
        setSelectedItem(game.moviesAndImages[nextPhotoIndex].link);
      } else {
        setSelectedItem(
          game.moviesAndImages.find((entry) => entry.type !== "video")?.link ||
            null
        );
      }
    }

    // Check if the selected item is outside the visible area
    const indicatorPosition =
      game.moviesAndImages.findIndex((entry) => entry.link === selectedItem) *
      120;

    const slideArea = document.querySelector(".slide-area");
    if (slideArea) {
      const visibleWidth = slideArea.clientWidth;
      const scrollLeft = slideArea.scrollLeft;

      if (currentIndex === game.moviesAndImages.length - 1) {
        // If the index is 0, scroll to the start
        slideArea.scroll({
          left: 0,
          behavior: "smooth",
        });
      } else if (indicatorPosition + 140 < scrollLeft) {
        // Scroll to the left to bring the selected item into view
        slideArea.scrollBy({
          left: indicatorPosition + 120 - scrollLeft,
          behavior: "smooth",
        });
      } else if (indicatorPosition + 140 > scrollLeft + visibleWidth) {
        // Scroll to the right to bring the selected item into view
        slideArea.scrollBy({
          left: indicatorPosition + 730 - (scrollLeft + visibleWidth),
          behavior: "smooth",
        });
      }
    }
  }, [game, isAutoplay, selectedItem]);

  //730 - 612 = 118

  // function to swap photos and videos and photos with left swap button
  const handleLeftSwap = useCallback(
    (currentIndex: number) => {
      const slideArea = document.querySelector(".slide-area");
      if (slideArea) {
        const indicatorPosition = currentIndex * 120;

        // Calculate the distance from the left edge to the indicator
        const distanceToLeftEdge =
          indicatorPosition - 120 - slideArea.scrollLeft;

        // Check if the indicator is going out of the left edge
        const isOutOfLeftEdge = distanceToLeftEdge < 0;

        // If the index is not the first, move to the previous item
        if (currentIndex > 0) {
          const nextIndex = currentIndex - 1;
          setSelectedItem(game.moviesAndImages[nextIndex].link);

          // If the indicator is out of the left edge, scroll to the left
          if (isOutOfLeftEdge) {
            slideArea.scrollBy({
              left: distanceToLeftEdge,
              behavior: "smooth",
            });
          }
        } else {
          // If the index is the first, scroll to the end only if it's not already at the last item
          if (
            slideArea.scrollLeft !==
            (game.moviesAndImages.length - 1) * 120
          ) {
            slideArea.scroll({
              left: (game.moviesAndImages.length - 1) * 120,
              behavior: "smooth",
            });
          }
        }
      }
    },
    [game, setSelectedItem]
  );

  // function controlling the behavior of the right and left buttons under the slides area
  const handleSliderClick = (direction: "left" | "right") => {
    const currentIndex = game.moviesAndImages.findIndex(
      (entry) => entry.link === selectedItem
    );

    let nextIndex = currentIndex;

    if (direction === "right") {
      // Find the next video or screenshot index
      nextIndex = (currentIndex + 1) % game.moviesAndImages.length;
      handleSwap();
    } else {
      // Find the previous video or screenshot index
      nextIndex =
        (currentIndex - 1 + game.moviesAndImages.length) %
        game.moviesAndImages.length;
      handleLeftSwap(currentIndex);
    }

    // Set the selectedItem based on the nextIndex
    setSelectedItem(game.moviesAndImages[nextIndex].link);
  };

  // auto swap for screenshots function
  useEffect(() => {
    const screenshotIntervalId = setInterval(() => {
      if (
        selectedItem &&
        typeof selectedItem === "string" &&
        game.moviesAndImages.find((entry) => entry.link === selectedItem)
          ?.type !== "video"
      ) {
        handleSwap();
      }
    }, 5000);

    return () => {
      clearInterval(screenshotIntervalId);
    };
  });

  // auto swap for videos function
  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnded = () => {
      console.log("Video ended. Swapping...");
      handleSwap();
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnded);
      return () => {
        video.removeEventListener("ended", handleVideoEnded);
      };
    }
  }, [selectedItem]);

  // auto swap for the first video if autoplay is off
  useEffect(() => {
    if (initialRender) {
      const firstVideo = game.moviesAndImages.find(
        (entry) => entry.type === "video"
      );

      if (!isAutoplay && firstVideo && selectedItem === firstVideo.link) {
        const videoSwapTimeout = setTimeout(() => {
          handleSwap();
          setInitialRender(false); // Update the state to indicate that the initial render has occurred
        }, 0); // Adjust the duration as needed

        return () => {
          clearTimeout(videoSwapTimeout);
        };
      }
    }
  }, [initialRender, isAutoplay, selectedItem]);

  // variable that represents the currently selected item
  const selectedEntry = gameData.reduce<MovieEntry | null>(
    (selected, game) =>
      selected ||
      (game.moviesAndImages.find(
        (entry) => entry.link === selectedItem
      ) as MovieEntry | null),
    null
  );

  let positivePercentage: number = 0;
  function getReviewSummary(
    positiveCount: number,
    _negativeCount: number,
    totalReviews: number
  ) {
    positivePercentage = (positiveCount / totalReviews) * 100;
  
    if (positivePercentage >= 90) return "Overwhelmingly Positive";
    if (positivePercentage >= 80) return "Very Positive";
    if (positivePercentage >= 75) return "Mostly Positive";
    if (positivePercentage > 40 && positivePercentage < 75) return "Mixed";
    if (positivePercentage <= 10)  return "Overwhelmingly Negative";
    if (positivePercentage <= 20) return "Very Negative";
    if (positivePercentage <= 40) return "Mostly Negative";
  }
  
  function getHoverInfo(positiveCount: number, totalReviews: number) {
    const positivePercentage = (positiveCount / totalReviews) * 100;
  
    return `${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
  }
  
  const totalReviews = game.reviews.positive + game.reviews.negative;
  const summary = getReviewSummary(
    game.reviews.positive,
    game.reviews.negative,
    totalReviews
  );
  

  return (
    <div className="MeidaAndSummary" key={game.id}>
      <div className="game-title-area">
        <div className="genre-block">
          <a href="/search/">
            <span className="genre-item">All Games</span>
          </a>{" "}
          &gt;{" "}
          <a href="/genre/RPG/">
            <span className="genre-item">{game.category}</span>
          </a>{" "}
          &gt;{" "}
          <a href="/game/gameName/">
            <span className="genre-item">{game.name}</span>
          </a>
        </div>
        <div className="game-header-content">
          <div className="game-community">
            <a className="community-btn" href="">
              <span>Community Hub</span>
            </a>
          </div>
          <div className="main-game-name">{game.name}</div>
        </div>
      </div>
      <div className="game-background">
        <div className="game-page-content">
          <div className="media-summary-block">
            <div className="right-game-summary">
              <div className="game-image">
                <img className="image-full" src={game.headerImage} alt="" />
              </div>
              <div className="game-discription">{game.description}</div>
              <div className="game-glance-first">
                <div className="user-reviews">
                  <div className="user-reviews-summary">
                    <div className="summary-subtitle">All Reviews:</div>
                    <div className="summary-column">
                      <span
                        className={`game-review-summary ${
                          (positivePercentage < 75 && positivePercentage > 40) ? 'mixed'
                            : positivePercentage >= 75 ? 'positive'
                            : positivePercentage >= 40 ? 'negative' : ''
                        }`}
                      >
                        {summary}
                      </span>
                      <span className="game-review-count">
                        {" "}
                        ({game.reviews.positive + game.reviews.negative})
                      </span>
                      <span className="review-tooltip">
                      {getHoverInfo(game.reviews.positive, game.reviews.positive + game.reviews.negative)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="release-date">
                  <div className="summary-subtitle">Release Date:</div>
                  <div className="date">{game.releaseDate}</div>
                </div>
                <div className="dev-publish">
                  <div className="summary-subtitle">Developer:</div>
                  <div className="summary-column">
                    <a href={game.developer.link}>{game.developer.name}</a>
                  </div>
                </div>
                <div className="dev-publish">
                  <div className="summary-subtitle">Publisher:</div>
                  <div className="summary-column">
                    <a href={game.developer.link}>{game.developer.name}</a>
                  </div>
                </div>
              </div>
              <div className="user-defined-tags">
                <div className="glance-tags-label">
                  Popular user-defined tags for this product:
                </div>
                <div className="glance-tags">
                  <a className="game-tag" href="">
                    {game.tags[0]}
                  </a>
                  <a className="game-tag" href="">
                    {game.tags[1]}
                  </a>
                  <a className="game-tag" href="">
                    {game.tags[2]}
                  </a>
                  <a className="game-tag" href="">
                    {game.tags[3]}
                  </a>
                </div>
              </div>
            </div>
            <div className="left-game-summary">
              <div className="game-highlights">
                {selectedItem && selectedEntry && (
                  <>
                    {selectedEntry.type === "video" ? (
                      <SteamVideo
                        key={selectedEntry.link}
                        videoRef={videoRef}
                        videoSrc={selectedEntry.link}
                        poster={selectedEntry.posterLink}
                        isAutoplay={isAutoplay}
                        setAutoplay={setAutoplay}
                      />
                    ) : (
                      <Screenshot
                        key={selectedEntry.link}
                        imgSrc={selectedEntry.link}
                        isMouseOverScreenshot={isMouseOverScreenshot}
                        onEnter={() => setIsMouseOverScreenshot(true)}
                        onLeave={() => setIsMouseOverScreenshot(false)}
                      />
                    )}
                  </>
                )}

                <div className="slide-area">
                  <div
                    className="slide-area-scroll"
                    style={{
                      width: `${game.moviesAndImages.length * 120}px`,
                      left: "0px",
                    }}
                  >
                    <div
                      className="highlight-selector"
                      style={{
                        left: `${
                          game.moviesAndImages.findIndex(
                            (entry) => entry.link === selectedItem
                          ) * 120
                        }px`,
                      }}
                    ></div>
                    {game.moviesAndImages.map((entry) => (
                      <div
                        key={entry.link}
                        className={`higlight-slide-item ${
                          entry.type === "video"
                            ? "higlight-slide-movie"
                            : "highlight-slide-screenshot"
                        }`}
                        id={entry.link}
                        onClick={() => setSelectedItem(entry.link)}
                      >
                        {entry.type === "video" ? (
                          <>
                            <img
                              src={entry.posterLink}
                              alt="Movie Thumbnail"
                              className="movie-thumb"
                            />
                            <div className="movie-marker"></div>
                          </>
                        ) : (
                          <img
                            className="mini-img"
                            src={entry.link}
                            alt="Screenshot"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="slides-slider">
                <div
                  className="slider-left"
                  onClick={() => handleSliderClick("left")}
                >
                  <span />
                </div>

                <div
                  className="slider-right"
                  onClick={() => handleSliderClick("right")}
                >
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="queue-area">
        <div className="queue-actions">
          <a className="view-queue-button" href="">
            <span>
              View Your Queue&nbsp;&nbsp;&nbsp;
              <i className="arrow-next" />
            </span>
          </a>
          <div
            id="add-wishlist"
            className="queue-button-container"
            style={{ display: "inline-block" }}
          >
            <a className="queue-button" href="">
              <span>Add to your wishlist</span>
            </a>
          </div>
          <div
            id="added-wishlist"
            className="queue-button-container"
            style={{ display: "none" }}
          >
            <a className="queue-button" href="">
              <span>
                <img src="/images/ico_selected.png" alt="" /> On Wishlist
              </span>
            </a>
            <div className="wishlist-added"> Item added to your wishlist! </div>
          </div>
          <div id="follow" className="queue-button-container">
            <div className="queue-button" style={{ display: "inline-block" }}>
              <span>Follow</span>
            </div>
            <div className="queue-button" style={{ display: "none" }}>
              <span>
                <img src="/images/ico_selected.png" alt="" /> Following
              </span>
            </div>
          </div>
          <div
            id="ignore"
            className="queue-button-container"
            style={{ display: "inline-block" }}
          >
            <div className="queue-button">
              <span>Ignore</span>
            </div>
          </div>
          <div
            id="ignored"
            className="queue-button-container"
            style={{ display: "none" }}
          >
            <div className="queue-button">
              <span>
                <img src="/images/ico_selected.png" alt="" /> Ignored
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAndSummary;
