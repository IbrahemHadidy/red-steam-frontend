// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Developer } from '@interfaces/company';

const developerApi = createApi({
  reducerPath: 'api/developer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/developer`,
  }),
  tagTypes: ['Developer'],
  endpoints: (builder) => ({
    createDeveloper: builder.mutation<{ message: string }, { name: string; website: string }>({
      query: (newDeveloper) => ({
        url: '',
        method: 'POST',
        body: newDeveloper,
        credentials: 'include',
      }),
      invalidatesTags: ['Developer'],
    }),

    getDeveloper: builder.query<Developer, number>({
      query: (id) => `/${id}`,
    }),

    getDevelopers: builder.query<Developer[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
    }),

    getAllDevelopers: builder.query<Developer[], void>({
      query: () => '',
    }),

    getDevelopersPaginated: builder.query<
      {
        items: Developer[];
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
      invalidatesTags: ['Developer'],
    }),

    deleteDeveloper: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Developer'],
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
