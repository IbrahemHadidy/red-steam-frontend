// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Enums
import { ApiMethod } from '@enums/api';

// Types
import type { Game } from '@interfaces/game';

const gameOfferApi = createApi({
  reducerPath: 'api/game/offer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/game/offer`,
  }),
  tagTypes: ['Games', 'GameOffersPage'],
  endpoints: (builder) => ({
    createOffer: builder.mutation<
      { message: string },
      {
        gameId: number;
        discountPrice: string;
        offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
        discountStartDate: string;
        discountEndDate: string;
      }
    >({
      query: ({ gameId, discountPrice, offerType, discountStartDate, discountEndDate }) => ({
        url: '',
        method: ApiMethod.POST,
        body: {
          gameId,
          discountPrice,
          offerType,
          discountStartDate,
          discountEndDate,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Games', 'GameOffersPage'],
    }),

    getOffersPaginated: builder.query<
      { items: Game[]; total: number; totalPages: number },
      {
        page: number;
        limit: number;
        orderBy:
          | 'id'
          | 'name'
          | 'discountPrice'
          | 'basePrice'
          | 'discountPercentage'
          | 'offerType'
          | 'discountStartDate'
          | 'discountEndDate';
        order: 'ASC' | 'DESC';
        searchQuery?: { [key: string]: string };
      }
    >({
      query: ({ page, limit, orderBy, order, searchQuery }) => {
        let queryString = `paginated?page=${page}&limit=${limit}&orderBy=${orderBy}&order=${order}`;
        if (searchQuery) {
          const encodedSearchQuery = encodeURIComponent(JSON.stringify(searchQuery));
          queryString += `&searchQuery=${encodedSearchQuery}`;
        }
        return {
          url: queryString,
          method: ApiMethod.GET,
          credentials: 'include',
        };
      },
      providesTags: (result) => [{ type: 'GameOffersPage', id: JSON.stringify(result) }],
    }),

    updateOffer: builder.mutation<
      { message: string },
      {
        id: number;
        discountPrice: string;
        offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
        discountStartDate: string;
        discountEndDate: string;
      }
    >({
      query: ({ id, discountPrice, offerType, discountStartDate, discountEndDate }) => ({
        url: `/${id}`,
        method: ApiMethod.PUT,
        body: {
          discountPrice,
          offerType,
          discountStartDate,
          discountEndDate,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Games', 'GameOffersPage'],
    }),

    deleteOffer: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: ApiMethod.DELETE,
        credentials: 'include',
      }),
      invalidatesTags: ['Games', 'GameOffersPage'],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetOffersPaginatedQuery,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = gameOfferApi;

export const {
  createOffer: createOfferService,
  getOffersPaginated: getOffersPaginatedService,
  updateOffer: updateOfferService,
  deleteOffer: deleteOfferService,
} = gameOfferApi.endpoints;

export default gameOfferApi;
