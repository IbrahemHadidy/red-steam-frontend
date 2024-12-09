// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Company } from '@interfaces/company';

const publisherApi = createApi({
  reducerPath: 'api/publisher',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/publisher`,
  }),
  tagTypes: ['Publisher'],
  endpoints: (builder) => ({
    createPublisher: builder.mutation<{ message: string }, { name: string; website: string }>({
      query: (newPublisher) => ({
        url: '',
        method: 'POST',
        body: newPublisher,
        credentials: 'include',
      }),
      invalidatesTags: ['Publisher'],
    }),

    getPublisher: builder.query<Company, number>({
      query: (id) => `/${id}`,
    }),

    getPublishers: builder.query<Company[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
    }),

    getAllPublishers: builder.query<Company[], void>({
      query: () => '',
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
      invalidatesTags: ['Publisher'],
    }),

    deletePublisher: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Publisher'],
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
