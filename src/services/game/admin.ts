import Api from 'services/api';

// Types
import type { Screenshot, Video } from 'app/admin/create-game/create-game.types';
import type { AxiosRequestConfig } from 'axios';
import type { Game } from 'types/game.types';
type GameData = Omit<Game, 'languages' | 'totalSales' | 'averageRating' | 'reviewsCount'>;
export type Thumbnails = {
  mainImage: File;
  backgroundImage: File;
  menuImg: File;
  horizontalHeaderImage: File;
  verticalHeaderImage: File;
  smallHeaderImage: File;
  searchImage: File;
  tabImage: File;
};

class AdminApi extends Api {
  constructor() {
    super('game/admin');
  }

  public createGame = async (
    gameData: GameData,
    thumbnails: Thumbnails,
    images: Screenshot[],
    videos: Video[]
  ): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();

    const formData: FormData = new FormData();

    const body: { [key: string]: unknown } = {
      name: gameData.name,
      category: gameData.category,
      description: gameData.description,
      releaseDate: gameData.releaseDate,
      featured: gameData.featured,
      publishers: gameData.publishers,
      developers: gameData.developers,
      imageEntries: gameData.imageEntries.map((entry) => ({
        ...entry,
        link: undefined,
      })),
      videoEntries: gameData.videoEntries.map((entry) => ({
        ...entry,
        link: undefined,
        posterLink: undefined,
      })),
      pricing: {
        free: gameData.pricing.free,
        price: gameData.pricing.price,
      },
      tags: gameData.tags,
      gamesFeatues: gameData.gamesFeatures,
      languages: gameData.languageSupport,
      platformEntries: gameData.platformEntries,
      link: gameData.link,
      about: gameData.about,
      mature: gameData.mature,
      matureDescription: gameData.matureDescription,
      systemRequirements: gameData.systemRequirements,
      legal: gameData.legal,
    };

    formData.append('body', JSON.stringify(body));

    formData.append('mainImage', thumbnails.mainImage);
    formData.append('verticalHeaderImage', thumbnails.verticalHeaderImage);
    formData.append('horizontalHeaderImage', thumbnails.horizontalHeaderImage);
    formData.append('smallHeaderImage', thumbnails.smallHeaderImage);
    formData.append('backgroundImage', thumbnails.backgroundImage);
    formData.append('menuImg', thumbnails.menuImg);
    formData.append('searchImage', thumbnails.searchImage);
    formData.append('tabImage', thumbnails.tabImage);

    images.map((entry) => {
      formData.append(`${entry.order}`, entry.image);
    });
    videos.map((entry) => {
      formData.append(`${entry.order}`, entry.video);
      formData.append(`${entry.order}-poster`, entry.poster);
    });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${accessToken}`,
      },
    };

    const { data } = await this.post('', formData, config);
    return data;
  };

  public deleteGame = async (id: number): Promise<{ message: string }> => {
    const accessToken: string | null = this.getAccessToken();
    const config: AxiosRequestConfig = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await this.delete(`${id}`, config);
    return data;
  };
}

export const { createGame, deleteGame } = new AdminApi();
