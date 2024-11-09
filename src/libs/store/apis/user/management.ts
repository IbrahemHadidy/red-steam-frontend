// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Utils
import { getFileFromLocalStorage } from '@utils/filesStorageUtils';

// Types
import type FileMetadata from '@custom-types/file-metadata';

const userManagementApi = createApi({
  reducerPath: 'api/user/management',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/management`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    checkEmailExists: builder.query<{ exists: boolean }, string>({
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

    changeUsername: builder.mutation<
      { message: string },
      { newUsername: string; currentPassword: string }
    >({
      query: ({ newUsername, currentPassword }) => ({
        url: '/username',
        method: 'PATCH',
        body: { newUsername, currentPassword },
      }),
      invalidatesTags: ['User'],
    }),

    changeEmail: builder.mutation<
      { message: string },
      { currentEmail: string; currentPassword: string; newEmail: string }
    >({
      query: ({ currentEmail, currentPassword, newEmail }) => ({
        url: '/change-email',
        method: 'PATCH',
        body: { currentEmail, currentPassword, newEmail },
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

    uploadAvatar: builder.mutation<{ message: string }, FileMetadata>({
      query: (avatarFile) => {
        const formData = new FormData();
        formData.append('avatar', getFileFromLocalStorage(avatarFile.id) as File);
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
      { currentPassword: string; newPassword: string }
    >({
      query: ({ currentPassword, newPassword }) => ({
        url: '/password/change',
        method: 'POST',
        body: { currentPassword, newPassword },
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
  useChangeUsernameMutation,
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
