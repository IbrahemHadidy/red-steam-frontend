// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

const userManagementApi = createApi({
  reducerPath: 'api/user/management',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/management`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    checkEmailExists: builder.mutation<{ exists: boolean }, string>({
      query: (email) => ({
        url: `/email/${email}`,
        method: ApiMethod.GET,
        credentials: 'include',
      }),
    }),

    checkUsernameExists: builder.mutation<{ exists: boolean }, string>({
      query: (username) => ({
        url: `/username/${username}`,
        method: ApiMethod.GET,
        credentials: 'include',
      }),
    }),

    changeUsername: builder.mutation<
      { message: string },
      { newUsername: string; currentPassword: string }
    >({
      query: ({ newUsername, currentPassword }) => ({
        url: '/username',
        method: ApiMethod.PATCH,
        body: { newUsername, currentPassword },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    changeEmail: builder.mutation<
      { message: string },
      { currentEmail: string; currentPassword: string; newEmail: string }
    >({
      query: ({ currentEmail, currentPassword, newEmail }) => ({
        url: '/email',
        method: ApiMethod.PATCH,
        body: { currentEmail, currentPassword, newEmail },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    changeCountry: builder.mutation<{ message: string }, { newCountry: string }>({
      query: ({ newCountry }) => ({
        url: '/country',
        method: ApiMethod.PATCH,
        body: { newCountry },
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation<{ message: string }, File>({
      query: (avatarFile) => {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        return {
          url: '/avatar',
          method: ApiMethod.PATCH,
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: ['User'],
    }),

    deleteAvatar: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/avatar',
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),

    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: ({ currentPassword, newPassword }) => ({
        url: '/password/change',
        method: ApiMethod.PATCH,
        body: { currentPassword, newPassword },
        credentials: 'include',
      }),
    }),

    forgotPassword: builder.mutation<
      { message: string },
      { email: string; recaptchaToken: string }
    >({
      query: ({ email, recaptchaToken }) => ({
        url: '/password/forgot',
        method: ApiMethod.POST,
        body: { email, recaptchaToken },
        credentials: 'include',
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, { token: string; newPassword: string }>({
      query: ({ token, newPassword }) => ({
        url: '/password/reset',
        method: ApiMethod.PATCH,
        body: { token, newPassword },
        credentials: 'include',
      }),
    }),

    deleteAccount: builder.mutation<{ message: string }, string>({
      query: (currentPassword) => ({
        url: '/account',
        method: ApiMethod.DELETE,
        body: { currentPassword },
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCheckEmailExistsMutation,
  useCheckUsernameExistsMutation,
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

export const {
  checkEmailExists: checkEmailExistsService,
  checkUsernameExists: checkUsernameExistsService,
  changeUsername: changeUsernameService,
  changeEmail: changeEmailService,
  changeCountry: changeCountryService,
  uploadAvatar: uploadAvatarService,
  deleteAvatar: deleteAvatarService,
  changePassword: changePasswordService,
  forgotPassword: forgotPasswordService,
  resetPassword: resetPasswordService,
  deleteAccount: deleteAccountService,
} = userManagementApi.endpoints;

export default userManagementApi;
