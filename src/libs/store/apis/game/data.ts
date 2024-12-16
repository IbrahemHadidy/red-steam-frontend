// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { RequestParams } from '@custom-types/search';
import type { ReviewFilter, ReviewSort } from '@enums/reviews';
import type { Game } from '@interfaces/game';
import type { Review } from '@interfaces/review';

const gameDataApi = createApi({
  reducerPath: 'api/game/data',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/game/data`,
  }),
  tagTypes: ['Games', 'GameReviews'],
  endpoints: (builder) => ({
    search: builder.query<Game[], string>({
      query: (partialName) => `search/${partialName}`,
      providesTags: (result) => result?.map((game) => ({ type: 'Games', id: game.id })) ?? [],
    }),

    getByParameters: builder.query<Game[], RequestParams>({
      query: ({ searchData, pagination }) => {
        const queryParams = new URLSearchParams();

        const appendArrayParam = (key: string, array?: unknown[]) => {
          if (array && array.length > 0) queryParams.append(key, array.join(','));
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

        if (pagination.page) queryParams.append('page', pagination.page.toString());
        if (pagination.limit) queryParams.append('limit', pagination.limit.toString());

        return `search?${queryParams.toString()}`;
      },
      providesTags: (_, __, arg) => [{ type: 'Games', id: JSON.stringify(arg) }],
    }),

    getFeatured: builder.query<Game[], { excludedGames: number[]; limit: number }>({
      query: ({ excludedGames, limit }) => {
        const endpoint = `featured?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}&limit=${limit}`;
        return endpoint;
      },
      providesTags: [{ type: 'Games', id: 'FEATURED' }],
    }),

    getByTags: builder.query<Game[], { tags: number[]; excludedGames: number[]; limit?: number }>({
      query: ({ tags, excludedGames, limit }) => {
        const endpoint = `tags?${tags.length > 0 ? `tags=${tags.join(',')}` : ''}${excludedGames.length > 0 ? `&excludedGames=${excludedGames.join(',')}` : ''}${limit ? `&limit=${limit}` : ''}`;
        return endpoint;
      },
      providesTags: [{ type: 'Games', id: 'TAGS' }],
    }),

    getById: builder.query<Game, number>({
      query: (id) => `${id}`,
      providesTags: (_, __, arg) => [{ type: 'Games', id: arg }],
    }),

    getByIds: builder.query<Game[], number[]>({
      query: (ids) => `bulk?${ids.length > 0 ? `ids=${ids.join(',')}` : ''}`,
      providesTags: (_, __, arg) => arg.map((id) => ({ type: 'Games', id })),
    }),

    getByOffers: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `offers?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Games', id: 'OFFERS' }],
    }),

    getByNewest: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `newest?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Games', id: 'NEWEST' }],
    }),

    getByTopSales: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `top-sales?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Games', id: 'TOP_SALES' }],
    }),

    getBySpecials: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `specials?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Games', id: 'SPECIALS' }],
    }),

    getByUpcoming: builder.query<Game[], number[]>({
      query: (excludedGames) =>
        `upcoming?${excludedGames.length > 0 ? `excludedGames=${excludedGames.join(',')}` : ''}`,
      providesTags: [{ type: 'Games', id: 'UPCOMING' }],
    }),

    getReviews: builder.query<
      Review[],
      {
        gameId: number;
        filter: ReviewFilter;
        sort: ReviewSort;
        offset: number;
        limit: number;
      }
    >({
      query: ({ gameId, filter, sort, limit, offset }) => ({
        url: `${gameId}/reviews?filter=${filter.toLowerCase()}&sort=${sort.toLowerCase()}&limit=${limit}&offset=${offset}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: (_, __, { gameId }) => [{ type: 'GameReviews', id: gameId }],
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
  useGetReviewsQuery,
} = gameDataApi;

export default gameDataApi;
