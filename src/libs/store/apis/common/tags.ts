// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Tag } from '@interfaces/tag';

const tagApi = createApi({
  reducerPath: 'api/tag',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tag`,
  }),
  tagTypes: ['Tag', 'AllTags', 'TagsPage'],
  endpoints: (builder) => ({
    createTag: builder.mutation<{ message: string }, { name: string }>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      invalidatesTags: ['AllTags', 'TagsPage'],
    }),

    getTag: builder.query<Tag, number>({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Tag', id }],
    }),

    getTags: builder.query<Tag[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
      providesTags: (_, __, ids) => ids.map((id) => ({ type: 'Tag', id })),
    }),

    getAllTags: builder.query<Tag[], void>({
      query: () => '',
      providesTags: ['AllTags'],
    }),

    getTagsPaginated: builder.query<
      {
        items: Tag[];
        total: number;
        totalPages: number;
      },
      {
        page: number;
        limit: number;
        orderBy: 'id' | 'name';
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
        return `/paginated${queryString}`;
      },
      providesTags: (_, __, arg) => [{ type: 'TagsPage', id: JSON.stringify(arg) }],
    }),

    updateTag: builder.mutation<{ message: string }, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { name },
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Tag', id },
        { type: 'TagsPage' },
        { type: 'AllTags' },
      ],
    }),

    deleteTag: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Tag', id },
        { type: 'TagsPage' },
        { type: 'AllTags' },
      ],
    }),
  }),
});

export const {
  useCreateTagMutation,
  useGetTagQuery,
  useGetTagsQuery,
  useGetAllTagsQuery,
  useGetTagsPaginatedQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;

export default tagApi;
