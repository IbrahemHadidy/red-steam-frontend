// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Thunks
import { autoLoginOnLoad, fetchUserData, login, logout } from './authThunks';

// Types
import type { User } from '@entities/user.entity';

export interface AuthState {
  showVerifyModal: boolean;
  isLoggedIn: boolean;
  userData: User | null;
  isReady: boolean;
}

// Initial state
const authState: AuthState = {
  showVerifyModal: false,
  isLoggedIn: false,
  userData: null,
  isReady: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setShowVerifyModal: (state, action: PayloadAction<boolean>) => {
      state.showVerifyModal = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    setIsReady: (state, action: PayloadAction<boolean>) => {
      state.isReady = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.isReady = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.isReady = true;
      })
      .addCase(autoLoginOnLoad.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.userData = action.payload.userData;
        state.isReady = true;
      })
      .addCase(autoLoginOnLoad.rejected, (state) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.isReady = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.isReady = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.isReady = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
        state.isReady = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoggedIn = false;
        state.userData = null;
        state.isReady = true;
      });
  },
});

export const { setShowVerifyModal, setIsLoggedIn, setUserData, setIsReady } = authSlice.actions;
export default authSlice.reducer;
