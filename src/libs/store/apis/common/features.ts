// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Feature } from '@interfaces/feature';

const featureApi = createApi({
  reducerPath: 'api/feature',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/feature`,
  }),
  tagTypes: ['Feature', 'AllFeatures', 'FeaturesPage'],
  endpoints: (builder) => ({
    createFeature: builder.mutation<{ message: string }, { name: string; icon: string }>({
      query: (newFeature) => ({
        url: '',
        method: 'POST',
        body: newFeature,
        credentials: 'include',
      }),
      invalidatesTags: ['AllFeatures', 'FeaturesPage'],
    }),

    getFeature: builder.query<Feature, number>({
      query: (id) => `/${id}`,
      providesTags: (_, __, id) => [{ type: 'Feature', id }],
    }),

    getFeatures: builder.query<Feature[], number[]>({
      query: (ids) => `/bulk/${ids.join(',')}`,
      providesTags: (_, __, ids) => ids.map((id) => ({ type: 'Feature', id })),
    }),

    getAllFeatures: builder.query<Feature[], void>({
      query: () => '',
      providesTags: ['AllFeatures'],
    }),

    getFeaturesPaginated: builder.query<
      {
        items: Feature[];
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
      providesTags: (_, __, arg) => [{ type: 'FeaturesPage', id: JSON.stringify(arg) }],
    }),

    updateFeature: builder.mutation<
      { message: string },
      { id: number; name: string; icon: string }
    >({
      query: ({ id, name, icon }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { name, icon },
        credentials: 'include',
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Feature', id },
        { type: 'FeaturesPage' },
        { type: 'AllFeatures' },
      ],
    }),

    deleteFeature: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Feature', id },
        { type: 'FeaturesPage' },
        { type: 'AllFeatures' },
      ],
    }),
  }),
});

export const {
  useCreateFeatureMutation,
  useGetFeatureQuery,
  useGetFeaturesQuery,
  useGetAllFeaturesQuery,
  useGetFeaturesPaginatedQuery,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;

export default featureApi;
