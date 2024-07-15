import Api from 'services/api';

class GameApi extends Api {
  constructor() {
    super('game');
  }

  public search = async () => {
    const games = await this.get('search');
    return games;
  }

  public getByParameters = async (parameters: string) => {
    const games = await this.get(`parameters/${parameters}`);
    return games;
  }

  public getFeatured = async (limit: string) => {
    const game = await this.get(`featured/?limit=${limit}`);
    return game;
  }

  public getByTags = async (tags: number[], limit: string) => {
    const game = await this.get(`tags/?tags=${tags}&limit=${limit}`);
    return game;
  }

  public getById = async (id: string) => {
    const game = await this.get(`${id}`);
    return game;
  }

  public getByOffers = async () => {
    const game = await this.get(`offers`);
    return game;
  }

  public getByNewest = async () => {
    const game = await this.get(`newest`);
    return game;
  }

  public getByTopSales = async () => {
    const game = await this.get(`top-sales`);
    return game;
  }

  public getBySpecials = async () => {
    const game = await this.get(`specials`);
    return game;
  }
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
} = new GameApi();
