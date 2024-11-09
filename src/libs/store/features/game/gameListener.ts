// Redux
import { createListenerMiddleware } from '@reduxjs/toolkit';

// Handlers
import {
  disableButtons,
  initializeGame,
  initializeGamePreview,
  initializeReviews,
  reset,
  setAutoPlayVideo,
  setContent,
  setCurrentGame,
  setHasReviewed,
  setIsGameFetching,
  setIsGameInCart,
  setIsGameInLibrary,
  setIsGameInWishlist,
  setOrderedMediaEntries,
  setPositive,
  setReviewId,
  setVideoMuted,
  setVideoVolume,
  updateCurrentMediaLink,
} from './gameSlice';

// Utils
import isVideoEntry from '@utils/checkMediaEntry';

// APIs
import gameDataApi from '@store/apis/game/data';
import userInteractionApi from '@store/apis/user/interaction';

// Types
import type RecentGames from '@custom-types/recent-games';
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store/store';
import { getReviews } from './gameThunks';

// Create listener middleware
const gameListener = createListenerMiddleware();
const listen = gameListener.startListening.withTypes<RootState, AppDispatch>();

// Listen for game initialization
listen({
  actionCreator: initializeGame,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    const { dispatch } = listenerApi;

    //------------------------------ Get game data ------------------------------//
    dispatch(reset());
    const gameId = Number(action.payload);
    const recentGames: RecentGames = JSON.parse(localStorage.getItem('recentGames') || '[]');

    const fetchedGame = !isNaN(gameId)
      ? await dispatch(gameDataApi.endpoints.getById.initiate(gameId)).unwrap()
      : undefined;

    // Sort media entries
    const orderedMedia = [
      ...(fetchedGame?.imageEntries ?? []),
      ...(fetchedGame?.videoEntries ?? []),
    ].sort((a, b) => a.order - b.order);

    if (fetchedGame) {
      dispatch(setCurrentGame(fetchedGame));
      dispatch(setOrderedMediaEntries(orderedMedia));
      dispatch(setIsGameFetching(false));

      if (!recentGames.some((item) => item.id === fetchedGame.id)) {
        recentGames.push({ id: fetchedGame.id, name: fetchedGame.name, timestamp: Date.now() });
        localStorage.setItem('recentGames', JSON.stringify(recentGames));
      }
    }

    //------------------------- Get Video Player Settings -----------------------//
    // Get autoplay setting
    const storedAutoplay = localStorage.getItem('autoPlayVideo');
    if (storedAutoplay !== null) {
      dispatch(setAutoPlayVideo(JSON.parse(storedAutoplay)));
    }

    // Get volume settings
    const storedVolume = localStorage.getItem('volume');
    if (storedVolume !== null) {
      dispatch(setVideoVolume(parseFloat(storedVolume)));
    }

    // Get muted settings
    const storedMuted = localStorage.getItem('isMuted');
    if (storedMuted !== null) {
      dispatch(setVideoMuted(JSON.parse(storedMuted)));
    }

    //-------------------------- Get initial media link --------------------------//
    if (storedAutoplay === null || !JSON.parse(storedAutoplay)) {
      // When autoplay is not enabled, find the first non-video entry or fallback to the first entry
      dispatch(
        updateCurrentMediaLink(
          orderedMedia.find((entry) => !isVideoEntry(entry))?.link ?? orderedMedia[0]?.link ?? null
        )
      );
    } else {
      // Autoplay is enabled, prioritize showing the first media entry if it exists
      dispatch(updateCurrentMediaLink(orderedMedia[0]?.link ?? null));
    }
  },
});

// Listen for game preview initialization (Game admin)
listen({
  actionCreator: initializeGamePreview,
  effect: (action: PayloadAction<Game>, listenerApi) => {
    const { dispatch } = listenerApi;
    const game = action.payload;

    const orderedMedia = [...(game.imageEntries ?? []), ...(game.videoEntries ?? [])].sort(
      (a, b) => a.order - b.order
    );

    dispatch(reset());
    dispatch(setCurrentGame(game));
    dispatch(setOrderedMediaEntries(orderedMedia));
    dispatch(setIsGameFetching(false));
    dispatch(disableButtons());
    dispatch(updateCurrentMediaLink(orderedMedia[0]?.link ?? null));
  },
});

// Listen for autoplay changes and update the local storage
listen({
  predicate: (_action, currentState, previousState) => {
    return currentState.game.autoPlayVideo !== previousState.game.autoPlayVideo;
  },
  effect: (_action, listenerApi) => {
    const { getState } = listenerApi;
    const { autoPlayVideo } = getState().game;

    localStorage.setItem('autoPlayVideo', JSON.stringify(autoPlayVideo));
  },
});

// Listen for volume changes and update the local storage
listen({
  predicate: (_action, currentState, previousState) => {
    return currentState.game.videoVolume !== previousState.game.videoVolume;
  },
  effect: (_action, listenerApi) => {
    const { getState } = listenerApi;
    const { videoVolume } = getState().game;

    localStorage.setItem('volume', videoVolume.toString());
  },
});

// Listen for muted changes and update the local storage
listen({
  predicate: (_action, currentState, previousState) => {
    return currentState.game.videoMuted !== previousState.game.videoMuted;
  },
  effect: (_action, listenerApi) => {
    const { getState } = listenerApi;
    const { videoMuted } = getState().game;

    localStorage.setItem('isMuted', JSON.stringify(videoMuted));
  },
});

// Listen for review changes and update review state
listen({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.auth.currentUserData !== previousState.auth.currentUserData ||
      currentState.game.currentGame !== previousState.game.currentGame
    );
  },
  effect: async (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { currentUserData } = listenerApi.getState().auth;
    const { currentGame } = listenerApi.getState().game;

    if (currentUserData && currentGame) {
      const hasReviewed = await dispatch(
        userInteractionApi.endpoints.hasReviewedGame.initiate(currentGame.id)
      ).unwrap();
      if (hasReviewed.reviewed) {
        dispatch(setHasReviewed(true));
        dispatch(setPositive(hasReviewed.review.positive));
        dispatch(setContent(hasReviewed.review.content));
        dispatch(setReviewId(hasReviewed.review.id));
      } else {
        dispatch(setHasReviewed(false));
      }
    }
  },
});

// Listen for shop changes and update shop state
listen({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.auth.currentUserData !== previousState.auth.currentUserData ||
      currentState.game.currentGame !== previousState.game.currentGame
    );
  },
  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    const { currentUserData } = listenerApi.getState().auth;
    const { currentGame } = listenerApi.getState().game;

    const isInCart = !!currentUserData?.library?.some((item) => item.id === currentGame?.id);
    const isInWishlist = !!currentUserData?.wishlist?.some((item) => item.id === currentGame?.id);
    const isInLibrary = !!currentUserData?.library?.some((item) => item.id === currentGame?.id);

    dispatch(setIsGameInCart(isInCart));
    dispatch(setIsGameInWishlist(isInWishlist));
    dispatch(setIsGameInLibrary(isInLibrary));
  },
});

// Listen for reviews initialization
listen({
  actionCreator: initializeReviews,
  effect: (_action, listenerApi) => {
    const { dispatch } = listenerApi;
    dispatch(getReviews());
  },
});

// Export the listener
export default gameListener;
