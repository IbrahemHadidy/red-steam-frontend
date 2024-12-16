// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Company } from '@interfaces/company';

const publisherApi = createApi({
  reducerPath: 'api/publisher',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/publisher`,
  }),
  tagTypes: ['Publisher', 'AllPublishers', 'PublishersPage'],
  endpoints: (builder) => ({
    createPublisher: builder.mutation<{ message: string }, { name: string; website: string }>({
      query: (newPublisher) => ({
        url: '',
        method: 'POST',
        body: newPublisher,
        credentials: 'include',
      }),
      invalidatesTags: ['AllPublishers', 'PublishersPage'],
    }),

    getPublisher: builder.query<Company, number>({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Publisher', id }],
    }),

    getPublishers: builder.query<Company[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
      providesTags: (_, __, ids) => ids.map((id) => ({ type: 'Publisher', id })),
    }),

    getAllPublishers: builder.query<Company[], void>({
      query: () => '',
      providesTags: ['AllPublishers'],
    }),

    getPublishersPaginated: builder.query<
      {
        items: Company[];
        total: number;
        totalPages: number;
      },
      {
        page: number;
        limit: number;
        orderBy: 'id' | 'name';
        order: 'ASC' | 'DESC';
        searchQuery: { [key: string]: string };
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
      providesTags: (_, __, arg) => [{ type: 'PublishersPage', id: JSON.stringify(arg) }],
    }),

    updatePublisher: builder.mutation<
      { message: string },
      { id: number; name: string; website: string }
    >({
      query: ({ id, name, website }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { name, website },
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Publisher', id },
        { type: 'PublishersPage' },
        { type: 'AllPublishers' },
      ],
    }),

    deletePublisher: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Publisher', id },
        { type: 'PublishersPage' },
        { type: 'AllPublishers' },
      ],
    }),
  }),
});

export const {
  useCreatePublisherMutation,
  useGetPublisherQuery,
  useGetPublishersQuery,
  useGetAllPublishersQuery,
  useGetPublishersPaginatedQuery,
  useUpdatePublisherMutation,
  useDeletePublisherMutation,
} = publisherApi;

export default publisherApi;
