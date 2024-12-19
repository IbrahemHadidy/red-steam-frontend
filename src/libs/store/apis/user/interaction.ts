// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

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
        method: ApiMethod.PUT,
        body: { tags },
        credentials: 'include',
      }),
      invalidatesTags: ['UserTags'],
    }),

    getTags: builder.query<{ tags: Tag[] }, void>({
      query: () => ({
        url: '/tags',
        method: ApiMethod.GET,
        credentials: 'include',
      }),
      providesTags: ['UserTags'],
    }),

    addToLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: ApiMethod.POST,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    removeFromLibrary: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/library',
        method: ApiMethod.DELETE,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    clearLibrary: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/library',
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['UserLibrary'],
    }),

    addToWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: ApiMethod.POST,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    removeFromWishlist: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/wishlist',
        method: ApiMethod.DELETE,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    clearWishlist: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/wishlist',
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['UserWishlist'],
    }),

    addToCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: ApiMethod.POST,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    removeFromCart: builder.mutation<{ message: string }, number[]>({
      query: (itemsIds) => ({
        url: '/cart',
        method: ApiMethod.DELETE,
        body: { itemsIds },
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    clearCart: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/cart',
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['UserCart'],
    }),

    getLibrary: builder.query<LibraryItem[], void>({
      query: () => ({
        url: '/library',
        method: ApiMethod.GET,
        credentials: 'include',
      }),
      providesTags: ['UserLibrary'],
    }),

    getWishlist: builder.query<WishlistItem[], void>({
      query: () => ({
        url: '/wishlist',
        method: ApiMethod.GET,
        credentials: 'include',
      }),
      providesTags: ['UserWishlist'],
    }),

    getCart: builder.query<{ items: LibraryItem[] }, void>({
      query: () => ({
        url: '/cart',
        method: ApiMethod.GET,
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
        method: ApiMethod.POST,
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
        method: ApiMethod.PUT,
        body: { reviewId, positive, content },
        credentials: 'include',
      }),
      invalidatesTags: ['UserReviews'],
    }),

    hasReviewedGame: builder.query<{ reviewed: boolean; review: Review }, number>({
      query: (gameId) => ({
        url: `/check-review/${gameId}`,
        method: ApiMethod.GET,
        credentials: 'include',
      }),
      providesTags: ['UserReviews'],
    }),

    getReviews: builder.query<Review[], void>({
      query: () => ({
        url: '/reviews',
        method: ApiMethod.GET,
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

export const {
  changeTags: changeTagsService,
  getTags: getTagsService,
  addToLibrary: addToLibraryService,
  removeFromLibrary: removeFromLibraryService,
  clearLibrary: clearLibraryService,
  addToWishlist: addToWishlistService,
  removeFromWishlist: removeFromWishlistService,
  clearWishlist: clearWishlistService,
  addToCart: addToCartService,
  removeFromCart: removeFromCartService,
  clearCart: clearCartService,
  getLibrary: getLibraryService,
  getWishlist: getWishlistService,
  getCart: getCartService,
  reviewGame: reviewGameService,
  updateReview: updateReviewService,
  hasReviewedGame: hasReviewedGameService,
  getReviews: getReviewsService,
} = userInteractionApi.endpoints;

export default userInteractionApi;
