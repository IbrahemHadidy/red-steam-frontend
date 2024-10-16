// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Pricing } from '@entities/pricing.entity';

const gameOfferApi = createApi({
  reducerPath: 'api/game/offer',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/game/offer`,
  }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    createOffer: builder.mutation<
      { message: string },
      {
        gameId: number;
        discountPrice: string;
        offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
        discountStartDate: Date;
        discountEndDate: Date;
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
      { items: Pricing[]; total: number; totalPages: number },
      {
        page: number;
        limit: number;
        orderBy: 'id' | 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt';
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
        discount: boolean;
        discountPrice: string;
        offerType: 'SPECIAL PROMOTION' | 'WEEKEND DEAL';
        discountStartDate: Date;
        discountEndDate: Date;
      }
    >({
      query: ({ id, discount, discountPrice, offerType, discountStartDate, discountEndDate }) => ({
        url: `/offer/${id}`,
        method: 'PUT',
        body: {
          discount,
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
        url: `/offer/${id}`,
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
