// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { User } from '@interfaces/user';

const userAdminApi = createApi({
  reducerPath: 'api/user/admin',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/admin`,
  }),
  tagTypes: ['Users', 'UsersPage'],
  endpoints: (builder) => ({
    getUsersPaginated: builder.query<
      { items: User[]; total: number; totalPages: number },
      {
        page: number;
        limit: number;
        orderBy: string;
        order: 'ASC' | 'DESC';
        searchQuery?: { [key: string]: string };
      }
    >({
      query: ({ page, limit, orderBy, order, searchQuery }) => {
        let queryString = `?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
        if (searchQuery) {
          const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
          queryString += `&searchQuery=${encodedSearchQuery}`;
        }

        return {
          url: `paginated${queryString}`,
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: (_, __, arg) => [{ type: 'UsersPage', id: JSON.stringify(arg) }],
    }),

    updateUser: builder.mutation<
      { message: string },
      { id: string; isVerified: boolean; isAdmin: boolean }
    >({
      query: ({ id, isVerified, isAdmin }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { isVerified, isAdmin },
        credentials: 'include',
      }),
      invalidatesTags: ['Users', 'UsersPage'],
    }),

    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Users', 'UsersPage'],
    }),
  }),
});

export const { useGetUsersPaginatedQuery, useUpdateUserMutation, useDeleteUserMutation } =
  userAdminApi;

export default userAdminApi;
