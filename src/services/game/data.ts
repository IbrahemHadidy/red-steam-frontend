import Api from '@services/api';

// Types
import type { Game } from '@entities/game.entity';
import type { Review } from '@entities/review.entity';

class GameDataApi extends Api {
  constructor() {
    super('game/data');
  }

  public search = async (partialName: string): Promise<Game[]> => {
    const { data } = await this.get(`search/${partialName}`);
    return data;
  };

  public getByParameters = async (
    searchData: {
      sort?: 'relevance' | 'name' | 'lowestPrice' | 'highestPrice' | 'releaseDate' | 'reviews';
      partialName?: string;
      maxPrice?: number;
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
    },
    pagination?: { offset?: number; limit?: number }
  ): Promise<Game[]> => {
    const queryParams = new URLSearchParams();

    const appendArrayParam = (key: string, array?: unknown[]) => {
      if (array && array.length > 0) {
        queryParams.append(key, array.join(','));
      }
    };

    if (searchData.sort) {
      queryParams.append('sort', searchData.sort);
    }
    if (searchData.partialName) {
      queryParams.append('partialName', searchData.partialName);
    }
    if (searchData.maxPrice) {
      queryParams.append('maxPrice', searchData.maxPrice.toString());
    }
    if (searchData.paid) {
      queryParams.append('paid', 'true');
    }
    if (searchData.offers) {
      queryParams.append('offers', 'true');
    }
    if (searchData.featured) {
      queryParams.append('featured', 'true');
    }
    if (searchData.excludeMature) {
      queryParams.append('excludeMature', 'true');
    }
    if (searchData.upcomingMode) {
      queryParams.append('upcomingMode', searchData.upcomingMode);
    }

    appendArrayParam('tags', searchData.tags);
    appendArrayParam('excludeTags', searchData.excludeTags);
    appendArrayParam('platforms', searchData.platforms);
    appendArrayParam('publishers', searchData.publishers);
    appendArrayParam('developers', searchData.developers);
    appendArrayParam('features', searchData.features);
    appendArrayParam('languages', searchData.languages);
    appendArrayParam('excludedGames', searchData.excludedGames);

    if (pagination && pagination.offset) {
      queryParams.append('offset', pagination.offset.toString());
    }
    if (pagination && pagination.limit) {
      queryParams.append('limit', pagination.limit.toString());
    }

    const { data } = await this.get(`search?${queryParams.toString()}`);
    return data;
  };

  public getFeatured = async (limit: string): Promise<Game[]> => {
    const { data } = await this.get(`featured?limit=${limit}`);
    return data;
  };

  public getByTags = async (tags: number[], limit: string): Promise<Game[]> => {
    const { data } = await this.get(`tags?tags=${tags.join(',')}&limit=${limit}`);
    return data;
  };

  public getById = async (id: number): Promise<Game> => {
    const { data } = await this.get(`${id}`);
    return data;
  };

  public getByIds = async (ids: number[]): Promise<Game[]> => {
    const { data } = await this.get(`bulk?ids=${ids.join(',')}`);
    return data;
  };

  public getByOffers = async (): Promise<Game[]> => {
    const { data } = await this.get(`offers`);
    return data;
  };

  public getByNewest = async (): Promise<Game[]> => {
    const { data } = await this.get(`newest`);
    return data;
  };

  public getByTopSales = async (): Promise<Game[]> => {
    const { data } = await this.get(`top-sales`);
    return data;
  };

  public getBySpecials = async (): Promise<Game[]> => {
    const { data } = await this.get(`specials`);
    return data;
  };

  public getByUpcoming = async (): Promise<Game[]> => {
    const { data } = await this.get(`upcomming`);
    return data;
  };

  public getGameReviews = async (
    gameId: number,
    filter: 'positive' | 'negative' | 'all',
    sort: 'newest' | 'oldest',
    limit: number,
    offset: number
  ): Promise<Review[]> => {
    const { data } = await this.get(
      `${gameId}/reviews?filter=${filter}&sort=${sort}&limit=${limit}&offset=${offset}`
    );
    return data;
  };
}

export const {
  search,
  getByParameters,
  getFeatured,
  getByTags,
  getById,
  getByIds,
  getByOffers,
  getByNewest,
  getByTopSales,
  getBySpecials,
  getByUpcoming,
  getGameReviews,
} = new GameDataApi();
