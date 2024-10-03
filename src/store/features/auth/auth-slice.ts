import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type
import type { User } from '@entities/user.entity';
interface initialState {
  value: {
    showVerifyModal: boolean;
    isLoggedIn: boolean;
    userData: User | null;
    isReady: boolean;
  };
}

const initialState: initialState = {
  value: {
    showVerifyModal: false,
    isLoggedIn: false,
    userData: null,
    isReady: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setShowVerifyModal: (state, action: PayloadAction<boolean>) => {
      state.value.showVerifyModal = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.value.isLoggedIn = action.payload;
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.value.userData = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.value.isReady = action.payload;
    },
  },
});

export const { setShowVerifyModal, setIsLoggedIn, setUserData, setIsReady } = authSlice.actions;
export default authSlice.reducer;
