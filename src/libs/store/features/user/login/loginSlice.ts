// Redux
import { createSlice } from '@reduxjs/toolkit';

// Thunks
import { login } from '@store/features/auth/authThunks';

// Enums
import { LoginFormType } from '@enums/login-form';

// Types
import type { PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  // UI states
  readonly type: LoginFormType;
  readonly isLoginLoading: boolean;
  readonly isLoginFormVisible: boolean;
  readonly isForgotPasswordVisible: boolean;

  // User credentials
  readonly accountName: string;
  readonly loginPassword: string;
  readonly rememberMePreference: boolean;

  // Error handling
  readonly loginErrorMessage: string;
}

// Initial state
const loginState: LoginState = {
  type: LoginFormType.LOGIN,
  isLoginLoading: false,
  isLoginFormVisible: true,
  isForgotPasswordVisible: false,
  accountName: '',
  loginPassword: '',
  rememberMePreference: false,
  loginErrorMessage: '',
};

const loginSlice = createSlice({
  name: 'user/login',
  initialState: loginState,

  reducers: {
    setType: (state, action: PayloadAction<LoginFormType>) => {
      state.type = action.payload;
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoginLoading = action.payload;
    },
    setLoginFormVisibility: (state, action: PayloadAction<boolean>) => {
      state.isLoginFormVisible = action.payload;
    },
    toggleForgotPasswordForm: (state) => {
      state.isForgotPasswordVisible = !state.isForgotPasswordVisible;
    },
    updateAccountName: (state, action: PayloadAction<string>) => {
      state.accountName = action.payload;
    },
    updateLoginPassword: (state, action: PayloadAction<string>) => {
      state.loginPassword = action.payload;
    },
    toggleRememberMePreference: (state) => {
      state.rememberMePreference = !state.rememberMePreference;
    },
    updateLoginErrorMessage: (state, action: PayloadAction<string>) => {
      state.loginErrorMessage = action.payload;
    },
    reset: () => loginState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoginLoading = true;
        state.loginErrorMessage = '';
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoginLoading = false;
        state.loginErrorMessage = '';
        state.accountName = '';
        state.loginPassword = '';
        state.rememberMePreference = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginErrorMessage = action.payload ?? 'Something went wrong. Please try again.';
      });
  },
});

export const {
  setType,
  setLoginLoading,
  setLoginFormVisibility,
  toggleForgotPasswordForm,
  updateAccountName,
  updateLoginPassword,
  toggleRememberMePreference,
  updateLoginErrorMessage,
  reset,
} = loginSlice.actions;
export default loginSlice;
