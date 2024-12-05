// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Game } from '@interfaces/game';

const gameOfferApi = createApi({
  reducerPath: 'api/game/offer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/game/offer`,
  }),
  tagTypes: ['Game'],
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
        method: 'POST',
        body: {
          gameId,
          discountPrice,
          offerType,
          discountStartDate,
          discountEndDate,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Game'],
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
          method: 'GET',
          credentials: 'include',
        };
      },
      providesTags: ['Game'],
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
        method: 'PUT',
        body: {
          discountPrice,
          offerType,
          discountStartDate,
          discountEndDate,
        },
        credentials: 'include',
      }),
      invalidatesTags: ['Game'],
    }),

    deleteOffer: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});

export const {
  useCreateOfferMutation,
  useGetOffersPaginatedQuery,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = gameOfferApi;

export default gameOfferApi;
