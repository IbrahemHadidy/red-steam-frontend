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
  tagTypes: ['UserLibrary', 'UserWishlist', 'UserCart', 'UserTags', 'UserReviews'],
  endpoints: (builder) => ({
    changeTags: builder.mutation<{ message: string }, number[]>({
      query: (tags) => ({
        url: '/tags',
        method: 'PUT',
        body: { tags },
        credentials: 'include',
      }),
      invalidatesTags: ['UserTags'],
    }),

    getTags: builder.query<{ tags: Tag[] }, void>({
      query: () => ({
        url: '/tags',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserTags'],
    }),

    addToLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    removeFromLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    clearLibrary: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/library',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    addToWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    removeFromWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    clearWishlist: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/wishlist',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    addToCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: 'POST',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    removeFromCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: 'DELETE',
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    clearCart: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    getLibrary: builder.query<LibraryItem[], void>({
      query: () => ({
        url: '/library',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserLibrary'],
    }),

    getWishlist: builder.query<WishlistItem[], void>({
      query: () => ({
        url: '/wishlist',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserWishlist'],
    }),

    getCart: builder.query<{ items: LibraryItem[] }, void>({
      query: () => ({
        url: '/cart',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserCart'],
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
      invalidatesTags: ['UserReviews'],
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
      invalidatesTags: ['UserReviews'],
    }),

    hasReviewedGame: builder.query<{ reviewed: boolean; review: Review }, number>({
      query: (gameId) => ({
        url: `/check-review/${gameId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserReviews'],
    }),

    getReviews: builder.query<Review[], void>({
      query: () => ({
        url: '/reviews',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['UserReviews'],
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
