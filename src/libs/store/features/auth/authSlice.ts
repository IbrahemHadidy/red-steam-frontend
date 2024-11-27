// Redux
import { createAction, createSlice } from '@reduxjs/toolkit';

// Thunks
import { checkNameAndPassword } from '../user/signup/signupThunks';
import { autoLoginOnLoad, fetchUserData, login, logout } from './authThunks';

// Types
import type { User } from '@interfaces/user';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  readonly authOnLoadIntialized: boolean;
  readonly isVerificationEmailSent: boolean;
  readonly isVerifyModalVisible: boolean;
  readonly isUserLoggedIn: boolean;
  readonly currentUserData: User | null;
  readonly isAuthInitialized: boolean;
}

// Initial state
const authState: AuthState = {
  authOnLoadIntialized: false,
  isVerificationEmailSent: false,
  isVerifyModalVisible: false,
  isUserLoggedIn: false,
  currentUserData: null,
  isAuthInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,

  reducers: {
    setOnLoadInitialized: (state, action: PayloadAction<boolean>) => {
      state.authOnLoadIntialized = action.payload;
    },
    setIsVerificationEmailSent: (state, action: PayloadAction<boolean>) => {
      state.isVerificationEmailSent = action.payload;
    },
    setIsVerifyModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isVerifyModalVisible = action.payload;
    },
    setIsUserLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isUserLoggedIn = action.payload;
    },
    setCurrentUserData: (state, action: PayloadAction<User | null>) => {
      state.currentUserData = action.payload;
    },
    setAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAuthInitialized = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isAuthInitialized = true;
      })
      .addCase(login.rejected, (state) => {
        state.currentUserData = null;
        state.isUserLoggedIn = false;
        state.isAuthInitialized = true;
      })

      .addCase(checkNameAndPassword.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isAuthInitialized = true;
      })

      .addCase(
        autoLoginOnLoad.fulfilled,
        (
          state,
          action: PayloadAction<{ isUserLoggedIn: boolean; currentUserData: User | null }>
        ) => {
          const { isUserLoggedIn, currentUserData } = action.payload;

          state.currentUserData = currentUserData;
          state.isUserLoggedIn = isUserLoggedIn;
          state.isAuthInitialized = true;
        }
      )
      .addCase(autoLoginOnLoad.rejected, (state) => {
        state.currentUserData = null;
        state.isUserLoggedIn = false;
        state.isAuthInitialized = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.currentUserData = null;
        state.isUserLoggedIn = false;
        state.isAuthInitialized = true;
      })
      .addCase(logout.rejected, (state) => {
        state.currentUserData = null;
        state.isUserLoggedIn = false;
        state.isAuthInitialized = true;
      })

      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isAuthInitialized = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.currentUserData = null;
        state.isUserLoggedIn = false;
        state.isAuthInitialized = true;
      });
  },
});

// Listener actions
export const onLoadIntialization = createAction<void>('auth/onLoadIntialization');

export const {
  setOnLoadInitialized,
  setIsVerificationEmailSent,
  setIsVerifyModalVisible,
  setIsUserLoggedIn,
  setCurrentUserData,
  setAuthInitialized,
} = authSlice.actions;
export default authSlice;
