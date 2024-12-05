// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { User } from '@interfaces/user';

const userAuthApi = createApi({
  reducerPath: 'api/user/auth',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/auth`,
  }),
  tagTypes: ['User', 'WaitingTime'],
  endpoints: (builder) => ({
    signup: builder.mutation<
      { message: string },
      { username: string; email: string; password: string; country: string; recaptchaToken: string }
    >({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    login: builder.mutation<
      { userData: User; isSessionLoggedIn: boolean; message: string },
      { identifier: string; password: string; rememberMe: boolean }
    >({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    autoLogin: builder.query<{ userData: User | null; message: string } | null, void>({
      query: () => ({
        url: '/auto-login',
        method: 'POST',
        credentials: 'include',
      }),
      providesTags: [{ type: 'User', id: 'CURRENT' }],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),

    refreshToken: builder.mutation<User, void>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),

    updateUserData: builder.mutation<{ userData: User; message: string }, void>({
      query: () => ({
        url: '/user-data',
        method: 'GET',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'User', id: 'CURRENT' }],
    }),

    resendVerificationToken: builder.mutation<string, void>({
      query: () => ({
        url: '/resend-verification-token',
        method: 'POST',
        credentials: 'include',
      }),
    }),

    verificationStatus: builder.mutation<{ verified: boolean }, void>({
      query: () => ({
        url: '/verification-status',
        method: 'GET',
        credentials: 'include',
      }),
    }),

    verifyEmail: builder.mutation<{ message: string }, { token: string; username: string }>({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),

    updateTokens: builder.mutation<User, string>({
      query: (userId) => ({
        url: '/update-tokens',
        method: 'POST',
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

export default userAuthApi;
