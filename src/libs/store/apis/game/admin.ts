// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

const gameAdminApi = createApi({
  reducerPath: 'api/game/admin',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/game/admin`,
  }),
  tagTypes: ['Games'],
  endpoints: (builder) => ({
    createGame: builder.mutation<{ message: string; id: number }, { formData: FormData }>({
      query: ({ formData }) => {
        return {
          url: '',
          method: ApiMethod.POST,
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Games'],
    }),

    updateGame: builder.mutation<{ message: string }, { id?: number; formData: FormData }>({
      query: ({ id, formData }) => {
        if (!id) throw new Error('No game id provided');

        return {
          url: `/${id}`,
          method: ApiMethod.PATCH,
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: (_, __, { id }) => [{ type: 'Games', id }],
    }),

    deleteGame: builder.mutation<{ message: string }, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: ApiMethod.DELETE,
          credentials: 'include',
        };
      },
      invalidatesTags: (_, __, id) => [{ type: 'Games', id }],
    }),
  }),
});

export const { useCreateGameMutation, useUpdateGameMutation, useDeleteGameMutation } = gameAdminApi;

export const {
  createGame: createGameService,
  updateGame: updateGameService,
  deleteGame: deleteGameService,
} = gameAdminApi.endpoints;

export default gameAdminApi;
