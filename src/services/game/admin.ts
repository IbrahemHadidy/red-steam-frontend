import Api from '@services/api';

// Types
import type { Screenshot, Video } from '@app/admin/create-game/create-game.types';
import type { Game } from '@entities/game.entity';
import type { AxiosRequestConfig } from 'axios';
type GameData = Omit<Game, 'languages' | 'totalSales'>;
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

class GameAdminApi extends Api {
  constructor() {
    super('game/admin');
  }

  public createGame = async (
    gameData: GameData,
    thumbnails: Thumbnails,
    images: Screenshot[],
    videos: Video[]
  ): Promise<{ message: string }> => {
    const formData: FormData = new FormData();

    const body: { [key: string]: unknown } = {
      name: gameData.name,
      category: gameData.category,
      description: gameData.description,
      releaseDate: gameData.releaseDate,
      featured: gameData.featured,
      publishers: gameData.publishers?.map((publisher) => publisher.id),
      developers: gameData.developers?.map((developer) => developer.id),
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
        free: gameData.pricing?.free,
        price: gameData.pricing?.price,
      },
      tags: gameData.tags?.map((tag) => tag.id),
      gamesFeatures: gameData.gamesFeatures?.map((feature) => feature.id),
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
      },
      withCredentials: true,
    };

    const { data } = await this.post('', formData, config);
    return data;
  };

  public deleteGame = async (id: number): Promise<{ message: string }> => {
    const config: AxiosRequestConfig = {
      withCredentials: true,
    };
    const { data } = await this.delete(`${id}`, config);
    return data;
  };
}

export const { createGame, deleteGame } = new GameAdminApi();
