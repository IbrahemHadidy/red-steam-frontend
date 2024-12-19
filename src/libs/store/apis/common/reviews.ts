// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

// Types
import type { Review } from '@interfaces/review';

const reviewApi = createApi({
  reducerPath: 'api/review',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/review`,
  }),
  tagTypes: ['ReviewsPage'],
  endpoints: (builder) => ({
    getReviewsPaginated: builder.query<
      {
        items: Review[];
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
      providesTags: (_, __, { page }) => [{ type: 'ReviewsPage', id: page }],
    }),

    deleteReview: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['ReviewsPage'],
    }),
  }),
});

export const { useGetReviewsPaginatedQuery, useDeleteReviewMutation } = reviewApi;

export const {
  getReviewsPaginated: getReviewsPaginatedService,
  deleteReview: deleteReviewService,
} = reviewApi.endpoints;

export default reviewApi;
