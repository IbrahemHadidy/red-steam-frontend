// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

// Types
import type { User } from '@interfaces/user';

const userAuthApi = createApi({
  reducerPath: 'api/user/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/auth`,
  }),
  tagTypes: ['CurrentUser', 'Users', 'WaitingTime'],
  endpoints: (builder) => ({
    signup: builder.mutation<
      { message: string },
      { username: string; email: string; password: string; country: string; recaptchaToken: string }
    >({
      query: (data) => ({
        url: '/signup',
        method: ApiMethod.POST,
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    login: builder.mutation<
      { userData: User; isSessionLoggedIn: boolean; message: string },
      { identifier: string; password: string; rememberMe: boolean }
    >({
      query: (data) => ({
        url: '/login',
        method: ApiMethod.POST,
        body: data,
        credentials: 'include',
      }),
    }),

    autoLogin: builder.query<{ userData: User | null; message: string } | null, void>({
      query: () => ({
        url: '/auto-login',
        method: ApiMethod.POST,
        credentials: 'include',
      }),
      providesTags: [{ type: 'CurrentUser' }],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout',
        method: ApiMethod.POST,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'CurrentUser' }],
    }),

    refreshToken: builder.mutation<User, void>({
      query: () => ({
        url: '/refresh-token',
        method: ApiMethod.POST,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'CurrentUser' }],
    }),

    updateUserData: builder.mutation<{ userData: User; message: string }, void>({
      query: () => ({
        url: '/user-data',
        method: ApiMethod.GET,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'CurrentUser' }],
    }),

    resendVerificationToken: builder.mutation<string, void>({
      query: () => ({
        url: '/resend-verification-token',
        method: ApiMethod.POST,
        credentials: 'include',
      }),
    }),

    verificationStatus: builder.mutation<{ verified: boolean }, void>({
      query: () => ({
        url: '/verification-status',
        method: ApiMethod.GET,
        credentials: 'include',
      }),
    }),

    verifyEmail: builder.mutation<{ message: string }, { token: string; username: string }>({
      query: (data) => ({
        url: '/verify-email',
        method: ApiMethod.POST,
        body: data,
        credentials: 'include',
      }),
    }),

    updateTokens: builder.mutation<User, string>({
      query: (userId) => ({
        url: '/update-tokens',
        method: ApiMethod.POST,
        body: { userId },
        credentials: 'include',
      }),
    }),

    getWaitingTime: builder.query<{ waitingTime: number }, void>({
      query: () => '/waiting-time',
      providesTags: ['WaitingTime'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useAutoLoginQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
  useUpdateUserDataMutation,
  useResendVerificationTokenMutation,
  useVerificationStatusMutation,
  useVerifyEmailMutation,
  useUpdateTokensMutation,
  useGetWaitingTimeQuery,
} = userAuthApi;

export const {
  signup: signupService,
  login: loginService,
  autoLogin: autoLoginService,
  logout: logoutService,
  refreshToken: refreshTokenService,
  updateUserData: updateUserDataService,
  resendVerificationToken: resendVerificationTokenService,
  verificationStatus: verificationStatusService,
  verifyEmail: verifyEmailService,
  updateTokens: updateTokensService,
  getWaitingTime: getWaitingTimeService,
} = userAuthApi.endpoints;

export default userAuthApi;
