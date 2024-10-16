// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import { Language } from '@entities/language.entity';

const languageApi = createApi({
  reducerPath: 'api/language',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/language`,
  }),
  tagTypes: ['Language'],
  endpoints: (builder) => ({
    createLanguage: builder.mutation<{ message: string }, { name: string }>({
      query: (newLanguage) => ({
        url: '',
        method: 'POST',
        body: newLanguage,
        credentials: 'include',
      }),
      invalidatesTags: ['Language'],
    }),

    getLanguage: builder.query<Language, number>({
      query: (id) => `/${id}`,
    }),

    getLanguages: builder.query<Language[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
    }),

    getAllLanguages: builder.query<Language[], void>({
      query: () => '',
    }),

    getLanguagesPaginated: builder.query<
      {
        items: Language[];
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
    }),

    updateLanguage: builder.mutation<{ message: string }, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { name },
        credentials: 'include',
      }),
      invalidatesTags: ['Language'],
    }),

    deleteLanguage: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Language'],
    }),
  }),
});

export const {
  useCreateLanguageMutation,
  useGetLanguageQuery,
  useGetLanguagesQuery,
  useGetAllLanguagesQuery,
  useGetLanguagesPaginatedQuery,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation,
} = languageApi;

export default languageApi;
