import Api from 'services/api';

// Types
import type { Game } from 'types/game.types';

class DataApi extends Api {
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
      maxPrice?: string;
      tags?: string[];
      excludeTags?: string[];
      paid?: boolean;
      offers?: boolean;
      platforms?: ('win' | 'mac')[];
      publishers?: string[];
      developers?: string[];
      features?: string[];
      languages?: string[];
      featured?: boolean;
      excludeMature?: boolean;
    },
    pagination: { offset: string; limit: string }
  ): Promise<Game[]> => {
    const queryParams = new URLSearchParams({});
    if (searchData.sort) {
      queryParams.append('sort', searchData.sort);
    }
    if (searchData.partialName) {
      queryParams.append('partialName', searchData.partialName);
    }
    if (searchData.maxPrice) {
      queryParams.append('maxPrice', searchData.maxPrice);
    }
    if (searchData.tags) {
      searchData.tags.forEach((tag) => {
        queryParams.append('tags', tag);
      });
    }
    if (searchData.excludeTags) {
      searchData.excludeTags.forEach((tag) => {
        queryParams.append('excludeTags', tag);
      });
    }
    if (searchData.paid) {
      queryParams.append('paid', 'true');
    }
    if (searchData.offers) {
      queryParams.append('offers', 'true');
    }
    if (searchData.platforms) {
      searchData.platforms.forEach((platform) => {
        queryParams.append('platforms', platform);
      });
    }
    if (searchData.publishers) {
      searchData.publishers.forEach((publisher) => {
        queryParams.append('publishers', publisher);
      });
    }
    if (searchData.developers) {
      searchData.developers.forEach((developer) => {
        queryParams.append('developers', developer);
      });
    }
    if (searchData.features) {
      searchData.features.forEach((feature) => {
        queryParams.append('features', feature);
      });
    }
    if (searchData.languages) {
      searchData.languages.forEach((language) => {
        queryParams.append('languages', language);
      });
    }
    if (searchData.featured) {
      queryParams.append('featured', 'true');
    }
    if (searchData.excludeMature) {
      queryParams.append('excludeMature', 'true');
    }

    queryParams.append('offset', pagination.offset);
    queryParams.append('limit', pagination.limit);

    const { data } = await this.get(`search${queryParams}`);
    return data;
  };

  public getFeatured = async (limit: string): Promise<Game[]> => {
    const { data } = await this.get(`featured/?limit=${limit}`);
    return data;
  };

  public getByTags = async (tags: number[], limit: string): Promise<Game[]> => {
    const { data } = await this.get(`tags/?tags=${tags}&limit=${limit}`);
    return data;
  };

  public getById = async (id: number): Promise<Game> => {
    const { data } = await this.get(`${id}`);
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
}

export const {
  search,
  getByParameters,
  getFeatured,
  getByTags,
  getById,
  getByOffers,
  getByNewest,
  getByTopSales,
  getBySpecials,
} = new DataApi();
