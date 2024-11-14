// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Types
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LibraryState {
  readonly isLibraryInitialized: boolean;
  readonly cardSize: number;
  readonly selectedGame: Game | null;
  readonly userLibrary: Game[];
  readonly isGameModalOpen: boolean;
  readonly isCompleteModalOpen: boolean;
}

// Initial state
const libraryState: LibraryState = {
  isLibraryInitialized: false,
  cardSize: 250,
  selectedGame: null,
  userLibrary: [],
  isGameModalOpen: false,
  isCompleteModalOpen: false,
};

const librarySlice = createSlice({
  name: 'shop/library',
  initialState: libraryState,

  reducers: {
    setIsLibraryInitialized: (state, action: PayloadAction<boolean>) => {
      state.isLibraryInitialized = action.payload;
    },
    setCardSize: (state, action: PayloadAction<number>) => {
      state.cardSize = action.payload;
    },
    setSelectedGame: (state, action: PayloadAction<Game | null>) => {
      state.selectedGame = action.payload;
    },
    updateLibrary: (state, action: PayloadAction<Game[]>) => {
      state.userLibrary = action.payload;
    },
    setIsGameModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isGameModalOpen = action.payload;
    },
    setIsCompleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCompleteModalOpen = action.payload;
    },
  },
});

// Listener actions
export const initializeLibrary = createAction('shop/library/initializeLibrary');

export const {
  setIsLibraryInitialized,
  setCardSize,
  setSelectedGame,
  updateLibrary,
  setIsGameModalOpen,
  setIsCompleteModalOpen,
} = librarySlice.actions;
export default librarySlice;
