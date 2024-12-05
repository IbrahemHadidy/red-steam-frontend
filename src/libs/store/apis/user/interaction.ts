// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';
import type { LibraryItem, WishlistItem } from '@interfaces/user';

const userInteractionApi = createApi({
  reducerPath: 'api/user/interaction',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/interaction`,
  }),
  tagTypes: ['Library', 'Wishlist', 'Cart', 'Tags', 'Reviews'],
  endpoints: (builder) => ({
    changeTags: builder.mutation<{ message: string }, number[]>({
      query: (tags) => ({
        url: '/tags',
        method: 'PUT',
        body: { tags },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Tags', id: 'ALL' }],
    }),

    getTags: builder.query<{ tags: Tag[] }, void>({
      query: () => ({
        url: '/tags',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Tags', id: 'ALL' }],
    }),

    addToLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Library', id: 'ALL' }],
    }),

    removeFromLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Library', id: 'ALL' }],
    }),

    clearLibrary: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/library',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Library', id: 'ALL' }],
    }),

    addToWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Wishlist', id: 'ALL' }],
    }),

    removeFromWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Wishlist', id: 'ALL' }],
    }),

    clearWishlist: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/wishlist',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Wishlist', id: 'ALL' }],
    }),

    addToCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'ALL' }],
    }),

    removeFromCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'ALL' }],
    }),

    clearCart: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'ALL' }],
    }),

    getLibrary: builder.query<LibraryItem[], void>({
      query: () => ({
        url: '/library',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Library', id: 'ALL' }],
    }),

    getWishlist: builder.query<WishlistItem[], void>({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Wishlist', id: 'ALL' }],
    }),

    getCart: builder.query<{ items: LibraryItem[] }, void>({
      query: () => ({
        url: '/cart',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Cart', id: 'ALL' }],
    }),

    reviewGame: builder.mutation<
      { message: string },
      { gameId: number; positive: boolean; content: string }
    >({
      query: ({ gameId, positive, content }) => ({
        url: '/review',
        method: 'POST',
        body: { gameId, positive, content },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'ALL' }],
    }),

    updateReview: builder.mutation<
      { message: string },
      { reviewId: number; positive: boolean; content: string }
    >({
      query: ({ reviewId, positive, content }) => ({
        url: '/review',
        method: 'PUT',
        body: { reviewId, positive, content },
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'Reviews', id: 'ALL' }],
    }),

    hasReviewedGame: builder.query<{ reviewed: boolean; review: Review }, number>({
      query: (gameId) => ({
        url: `/check-review/${gameId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Reviews', id: 'ALL' }],
    }),

    getReviews: builder.query<Review[], void>({
      query: () => ({
        url: '/reviews',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'Reviews', id: 'ALL' }],
    }),
  }),
});

export const {
  useChangeTagsMutation,
  useGetTagsQuery,
  useAddToLibraryMutation,
  useRemoveFromLibraryMutation,
  useClearLibraryMutation,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetLibraryQuery,
  useGetWishlistQuery,
  useGetCartQuery,
  useReviewGameMutation,
  useUpdateReviewMutation,
  useHasReviewedGameQuery,
  useGetReviewsQuery,
} = userInteractionApi;

export default userInteractionApi;
