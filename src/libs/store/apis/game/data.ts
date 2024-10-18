// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Game } from '@entities/game.entity';
import type { Review } from '@entities/review.entity';

const gameDataApi = createApi({
  reducerPath: 'api/game/data',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/game/data`,
  }),
  tagTypes: ['Game', 'GameReviews'],
  endpoints: (builder) => ({
    search: builder.query<Game[], string>({
      query: (partialName) => `search/${partialName}`,
    }),

    getByParameters: builder.query<
      Game[],
      {
        searchData: {
          sort?:
            | 'relevance'
            | 'name'
            | 'lowestPrice'
            | 'highestPrice'
            | 'releaseDate'
            | 'reviews'
            | 'totalSales';
          partialName?: string;
          maxPrice?: string;
          tags?: number[];
          excludeTags?: number[];
          paid?: boolean;
          offers?: boolean;
          platforms?: ('win' | 'mac')[];
          publishers?: number[];
          developers?: number[];
          features?: number[];
          languages?: number[];
          featured?: boolean;
          excludeMature?: boolean;
          excludedGames?: number[];
          upcomingMode?: 'onlyUpcoming' | 'exclude';
        };
        pagination?: { offset?: number; limit?: number };
      }
    >({
      query: ({ searchData, pagination }) => {
        const queryParams = new URLSearchParams();

        const appendArrayParam = (key: string, array?: unknown[]) => {
          if (array && array.length > 0) {
            queryParams.append(key, array.join(','));
          }
        };

        if (searchData.sort) queryParams.append('sort', searchData.sort);
        if (searchData.partialName) queryParams.append('partialName', searchData.partialName);
        if (searchData.maxPrice) queryParams.append('maxPrice', searchData.maxPrice.toString());
        if (searchData.paid) queryParams.append('paid', 'true');
        if (searchData.offers) queryParams.append('offers', 'true');
        if (searchData.featured) queryParams.append('featured', 'true');
        if (searchData.excludeMature) queryParams.append('excludeMature', 'true');
        if (searchData.upcomingMode) queryParams.append('upcomingMode', searchData.upcomingMode);

        appendArrayParam('tags', searchData.tags);
        appendArrayParam('excludeTags', searchData.excludeTags);
        appendArrayParam('platforms', searchData.platforms);
        appendArrayParam('publishers', searchData.publishers);
        appendArrayParam('developers', searchData.developers);
        appendArrayParam('features', searchData.features);
        appendArrayParam('languages', searchData.languages);
        appendArrayParam('excludedGames', searchData.excludedGames);

        if (pagination) {
          if (pagination.offset) queryParams.append('offset', pagination.offset.toString());
          if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
        }

        return `search?${queryParams.toString()}`;
      },
    }),

    getFeatured: builder.query<Game[], { excludedGames: number[]; limit: number }>({
      query: ({ excludedGames, limit }) => {
        const endpoint = `featured?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}&limit=${limit}`;
        return endpoint;
      },
      providesTags: [{ type: 'Game', id: 'FEATURED' }],
    }),

    getByTags: builder.query<Game[], { tags: number[]; excludedGames: number[]; limit?: number }>({
      query: ({ tags, excludedGames, limit }) => {
        const endpoint = `tags?${tags.length > 0 ? `tags=${tags.join(',')}` : ''}${excludedGames.length > 0 ? `&excludedGames=${excludedGames.join(',')}` : ''}${limit ? `&limit=${limit}` : ''}`;
        return endpoint;
      },
      providesTags: [{ type: 'Game', id: 'TAGS' }],
    }),

    getById: builder.query<Game, number>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Game', id: arg }],
    }),

    getByIds: builder.query<Game[], number[]>({
      query: (ids) => `bulk?${ids.length > 0 ? `ids=${ids.join(',')}` : ''}`,
      providesTags: (result, error, arg) => arg.map((id) => ({ type: 'Game', id })),
    }),

    getByOffers: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `offers?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Game', id: 'OFFERS' }],
    }),

    getByNewest: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `newest?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Game', id: 'NEWEST' }],
    }),

    getByTopSales: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `top-sales?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Game', id: 'TOP_SALES' }],
    }),

    getBySpecials: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `specials?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Game', id: 'SPECIALS' }],
    }),

    getByUpcoming: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `upcoming?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Game', id: 'UPCOMING' }],
    }),

    getGameReviews: builder.query<
      Review[],
      {
        gameId: number;
        filter: 'positive' | 'negative' | 'all';
        sort: 'newest' | 'oldest';
        offset: number;
        limit: number;
      }
    >({
      query: ({ gameId, filter, sort, limit, offset }) => ({
        url: `${gameId}/reviews?filter=${filter}&sort=${sort}&limit=${limit}&offset=${offset}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: (result, error, { gameId }) => [{ type: 'GameReviews', id: gameId }],
    }),
  }),
});

export const {
  useSearchQuery,
  useGetByParametersQuery,
  useGetFeaturedQuery,
  useGetByTagsQuery,
  useGetByIdQuery,
  useGetByIdsQuery,
  useGetByOffersQuery,
  useGetByNewestQuery,
  useGetByTopSalesQuery,
  useGetBySpecialsQuery,
  useGetByUpcomingQuery,
  useGetGameReviewsQuery,
} = gameDataApi;

export default gameDataApi;
