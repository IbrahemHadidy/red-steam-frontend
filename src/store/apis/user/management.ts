// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userManagementApi = createApi({
  reducerPath: 'api/user/management',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/management`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    checkEmailExists: builder.query<boolean, string>({
      query: (email) => ({
        url: `/email/${email}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    checkUsernameExists: builder.query<boolean, string>({
      query: (username) => ({
        url: `/username/${username}`,
        method: 'GET',
        credentials: 'include',
      }),
    }),

    changeUserName: builder.mutation<
      { message: string },
      { newUsername: string; password: string }
    >({
      query: ({ newUsername, password }) => ({
        url: '/username',
        method: 'PATCH',
        body: { newUsername, password },
      }),
      invalidatesTags: ['User'],
    }),

    changeEmail: builder.mutation<
      { message: string },
      { currentEmail: string; password: string; newEmail: string }
    >({
      query: ({ currentEmail, password, newEmail }) => ({
        url: '/change-email',
        method: 'PATCH',
        body: { currentEmail, password, newEmail },
      }),
      invalidatesTags: ['User'],
    }),

    changeCountry: builder.mutation<{ message: string }, { newCountry: string }>({
      query: ({ newCountry }) => ({
        url: '/country',
        method: 'PATCH',
        body: { newCountry },
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation<{ message: string }, File>({
      query: (avatarFile) => {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        return {
          url: '/avatar',
          method: 'PATCH',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
      invalidatesTags: ['User'],
    }),

    deleteAvatar: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: ({ oldPassword, newPassword }) => ({
        url: '/password/change',
        method: 'POST',
        body: { oldPassword, newPassword },
      }),
    }),

    forgotPassword: builder.mutation<number, { email: string; recaptchaToken: string }>({
      query: ({ email, recaptchaToken }) => ({
        url: '/password/forgot',
        method: 'POST',
        body: { email, recaptchaToken },
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, { token: string; newPassword: string }>({
      query: ({ token, newPassword }) => ({
        url: '/password/reset',
        method: 'POST',
        body: { token, newPassword },
      }),
    }),

    deleteAccount: builder.mutation<{ message: string }, string>({
      query: (password) => ({
        url: '/account',
        method: 'DELETE',
        body: { password },
      }),
    }),
  }),
});

export const {
  useCheckEmailExistsQuery,
  useCheckUsernameExistsQuery,
  useChangeUserNameMutation,
  useChangeEmailMutation,
  useChangeCountryMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
} = userManagementApi;

export default userManagementApi;
