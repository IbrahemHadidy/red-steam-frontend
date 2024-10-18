// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ipBaseApi = createApi({
  reducerPath: 'api/ipBase',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ipbase.com/v1/' }),
  endpoints: (builder) => ({
    fetchUserCountry: builder.query<string | null, void>({
      query: () => `json/`,
      transformResponse: (response: { country_code: string }) => response.country_code,
    }),
  }),
});

export const { useFetchUserCountryQuery } = ipBaseApi;

export default ipBaseApi;
