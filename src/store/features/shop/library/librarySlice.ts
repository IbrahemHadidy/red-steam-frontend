// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Types
import type { Game } from '@entities/game.entity';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LibraryState {
  readonly cardSize: number;
  readonly selectedGame: Game | null;
  readonly userLibrary: Game[];
  readonly isGameModalOpen: boolean;
  readonly isCompleteModalOpen: boolean;
}

// Initial state
const libraryState: LibraryState = {
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

  extraReducers: (builder) => {
    builder;
  },
});

// Listeners actions
export const initializeLibrary = createAction('shop/library/initializeWislist');

export const {
  setCardSize,
  setSelectedGame,
  updateLibrary,
  setIsGameModalOpen,
  setIsCompleteModalOpen,
} = librarySlice.actions;
export default librarySlice;
