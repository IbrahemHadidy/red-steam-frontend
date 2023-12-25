import { FC, RefObject, useEffect, useRef, useState, Dispatch, SetStateAction, EventHandler, SyntheticEvent, ChangeEvent } from "react";

interface SteamVideoProps {
	videoRef: RefObject<HTMLVideoElement | null>;
	videoSrc: string;
	poster: string;
	isAutoplay: boolean;
	setAutoplay: Dispatch<SetStateAction<boolean>>;
	autoplayInitialized: boolean;
	setAutoplayInitialized: Dispatch<SetStateAction<boolean>>;
	wasPausedBeforeSwap: boolean;
	setWasPausedBeforeSwap: Dispatch<SetStateAction<boolean>>;
}

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
}) => {
	const videoSettings = {
		poster: poster,
		src: videoSrc,
		controls: false,
		playsInline: true,
		disablePictureInPicture: true,
		autoPlay: true,
	};

	const [overlayBottom, setOverlayBottom] = useState("-37px");
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setPlaying] = useState(false);
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
			setOverlayBottom("-37px");
		}, 1000);
	};

	// time update function
	const handleTimeUpdate: EventHandler<
		SyntheticEvent<HTMLVideoElement>
	> = () => {
		const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;
		setCurrentTime(video.currentTime);

		// Calculate the playback progress percentage
		const progressPercentage = (video.currentTime / video.duration) * 100;

		// Update the video playback progress bar
		if (videoProgressBarRef.current) {
			videoProgressBarRef.current.value = progressPercentage.toString();
		}
	};

	// seeking time function
	const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
		const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;

		if (video) {
			const seekTime = (event.target.valueAsNumber / 100) * video.duration;
			video.currentTime = seekTime;
		}
	};

	// handle visibility play/pause
	useEffect(() => {
		const video = document.querySelector(".highlight-movie video") as HTMLVideoElement;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				// Save the current playback state before swapping
				setWasPausedBeforeSwap(video.paused);
				video.pause();
			} else {
				// Resume playback only if the video was not paused before the swap
				if (!wasPausedBeforeSwap) {
					video.play();
				}
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [setWasPausedBeforeSwap, wasPausedBeforeSwap]);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
	};

	// progess bar function
	const handleDurationChange = () => {
		const video = document.querySelector(".highlight-movie video") as HTMLVideoElement;
		setDuration(video.duration);
	};

	// // functionality to handle time update after swaping to another video (react-spring bug fix)
	// useEffect(() => {
	//   const video = document.querySelector(".highlight-movie video") as HTMLVideoElement;
	
	//   const handleLoadedData = () => {
	//     setDuration(video?.duration || 0); 
	//     bufferProgressBarRef!.current!.value = 0;
	//   };
	
	//   if (video) {
	//     video.addEventListener("loadeddata", handleLoadedData);
	
	//     return () => {
	//       video.removeEventListener("loadeddata", handleLoadedData);
	//     };
	//   }
	// }, [videoRef]);
	// useEffect(() => {
	//   setCurrentTime(0);
	// }, []);

	// autoplay button function
	const handleAutoplayToggle = () => {
		const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;

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
	}, [setAutoplay, setAutoplayInitialized]);

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
				video.play().catch((error) => console.error("Play error:", error));
			} else {
				video.pause();
			}
		}
	}, [isPlaying]);
	

	// this is used to fix the wrong play/pause button at the begining
	useEffect(() => {
		const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;
	
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
	const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
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
					setOverlayBottom("-37px");
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
				const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;

				if (video) {
					video.play().catch((error) => {
						console.error("Autoplay was prevented:", error);
					});
				}
			}
		};

		const video = document.querySelector(
			".highlight-movie video"
		) as HTMLVideoElement;

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
					onPlay={() => setPlaying(true)}
					onPause={() => setPlaying(false)}
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
