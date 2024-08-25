import Api from 'services/api';

// Types
import type { Game } from 'types/game.types';

class DataApi extends Api {
  constructor() {
    super('game/data');
  }

  public search = async (): Promise<Game[]> => {
    const { data } = await this.get('search');
    return data;
  };

  public getByParameters = async (parameters: string): Promise<Game[]> => {
    const { data } = await this.get(`search/${parameters}`);
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

  public getById = async (id: string): Promise<Game[]> => {
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
