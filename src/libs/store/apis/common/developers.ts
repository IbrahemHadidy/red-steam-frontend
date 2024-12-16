// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Company } from '@interfaces/company';

const developerApi = createApi({
  reducerPath: 'api/developer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/developer`,
  }),
  tagTypes: ['Developer', 'AllDevelopers', 'DevelopersPage'],
  endpoints: (builder) => ({
    createDeveloper: builder.mutation<{ message: string }, { name: string; website: string }>({
      query: (newDeveloper) => ({
        url: '',
        method: 'POST',
        body: newDeveloper,
        credentials: 'include',
      }),
      invalidatesTags: ['AllDevelopers', 'DevelopersPage'],
    }),

    getDeveloper: builder.query<Company, number>({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Developer', id }],
    }),

    getDevelopers: builder.query<Company[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
      providesTags: (_, __, ids) => ids.map((id) => ({ type: 'Developer', id })),
    }),

    getAllDevelopers: builder.query<Company[], void>({
      query: () => '',
      providesTags: ['AllDevelopers'],
    }),

    getDevelopersPaginated: builder.query<
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
      providesTags: (_, __, arg) => [{ type: 'DevelopersPage', id: JSON.stringify(arg) }],
    }),

    updateDeveloper: builder.mutation<
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
        { type: 'Developer', id },
        { type: 'DevelopersPage' },
        { type: 'AllDevelopers' },
      ],
    }),

    deleteDeveloper: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Developer', id },
        { type: 'DevelopersPage' },
        { type: 'AllDevelopers' },
      ],
    }),
  }),
});

export const {
  useCreateDeveloperMutation,
  useGetDeveloperQuery,
  useGetDevelopersQuery,
  useGetAllDevelopersQuery,
  useGetDevelopersPaginatedQuery,
  useUpdateDeveloperMutation,
  useDeleteDeveloperMutation,
} = developerApi;

export default developerApi;
