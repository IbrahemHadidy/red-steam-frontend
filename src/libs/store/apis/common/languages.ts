// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

// Types
import { Language } from '@interfaces/language';

const languageApi = createApi({
  reducerPath: 'api/language',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/language`,
  }),
  tagTypes: ['Language', 'AllLanguages', 'LanguagesPage'],
  endpoints: (builder) => ({
    createLanguage: builder.mutation<{ message: string }, { name: string }>({
      query: (newLanguage) => ({
        url: '',
        method: ApiMethod.POST,
        body: newLanguage,
        credentials: 'include',
      }),
      invalidatesTags: ['AllLanguages', 'LanguagesPage'],
    }),

    getLanguage: builder.query<Language, number>({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Language', id }],
    }),

    getLanguages: builder.query<Language[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
      providesTags: (_, __, ids) => ids.map((id) => ({ type: 'Language', id })),
    }),

    getAllLanguages: builder.query<Language[], void>({
      query: () => '',
      providesTags: ['AllLanguages'],
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
      providesTags: (_, __, arg) => [{ type: 'LanguagesPage', id: JSON.stringify(arg) }],
    }),

    updateLanguage: builder.mutation<{ message: string }, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/${id}`,
        method: ApiMethod.PUT,
        body: { name },
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Language', id },
        { type: 'LanguagesPage' },
        { type: 'AllLanguages' },
      ],
    }),

    deleteLanguage: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Language', id },
        { type: 'LanguagesPage' },
        { type: 'AllLanguages' },
      ],
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

export const {
  createLanguage: createLanguageService,
  getLanguage: getLanguageService,
  getLanguages: getLanguagesService,
  getAllLanguages: getAllLanguagesService,
  getLanguagesPaginated: getLanguagesPaginatedService,
  updateLanguage: updateLanguageService,
  deleteLanguage: deleteLanguageService,
} = languageApi.endpoints;

export default languageApi;
