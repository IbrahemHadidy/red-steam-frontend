import Api from '@services/api';

// Types
import type { Language, Screenshot, Video } from '@app/admin/_GameAdmin/game-admin.types';
import type { Game, SystemRequirementsEntry } from '@entities/game.entity';
import type { AxiosRequestConfig } from 'axios';
type GameData = Omit<Game, 'languages' | 'totalSales'>;
export type Thumbnails = {
  mainImage: { file: File; changed: boolean };
  backgroundImage: { file: File; changed: boolean };
  menuImg: { file: File; changed: boolean };
  horizontalHeaderImage: { file: File; changed: boolean };
  verticalHeaderImage: { file: File; changed: boolean };
  smallHeaderImage: { file: File; changed: boolean };
  searchImage: { file: File; changed: boolean };
  tabImage: { file: File; changed: boolean };
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
  ): Promise<{ message: string; id: number }> => {
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
      features: gameData.features?.map((feature) => feature.id),
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

    formData.append('mainImage', thumbnails.mainImage.file);
    formData.append('verticalHeaderImage', thumbnails.verticalHeaderImage.file);
    formData.append('horizontalHeaderImage', thumbnails.horizontalHeaderImage.file);
    formData.append('smallHeaderImage', thumbnails.smallHeaderImage.file);
    formData.append('backgroundImage', thumbnails.backgroundImage.file);
    formData.append('menuImg', thumbnails.menuImg.file);
    formData.append('searchImage', thumbnails.searchImage.file);
    formData.append('tabImage', thumbnails.tabImage.file);

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

  public updateGame = async (
    media: {
      changedThumbnails: {
        mainImage?: File;
        backgroundImage?: File;
        menuImg?: File;
        horizontalHeaderImage?: File;
        verticalHeaderImage?: File;
        smallHeaderImage?: File;
        searchImage?: File;
        tabImage?: File;
      };
      deletedScreenshots?: number[];
      deletedVideos?: number[];
      changedScreenshots?: { oldOrder: number; newOrder: number }[];
      changedVideos?: { oldOrder: number; newOrder: number }[];
      addedScreenshots?: Screenshot[];
      addedVideos?: Video[];
      featuredOrders: number[];
    },
    updateData: {
      id?: number;
      name?: string;
      category?: string;
      description?: string;
      releaseDate?: Date;
      featured?: boolean;
      publishers?: number[];
      developers?: number[];
      pricing?: {
        free?: boolean;
        price?: number;
      };
      tags?: number[];
      features?: number[];
      languages?: Language[];
      platforms?: {
        win: boolean;
        mac: boolean;
      };
      link?: string;
      about?: string;
      mature?: boolean;
      matureDescription?: string;
      systemRequirements?: SystemRequirementsEntry;
      legal?: string;
    }
  ): Promise<{ message: string }> => {
    // Check if game id is provided
    if (!updateData.id) return Promise.reject('No game id provided');

    // Init form
    const formData: FormData = new FormData();

    // Append update data
    formData.append(
      'body',
      JSON.stringify({
        ...updateData,
        deletedScreenshots: media.deletedScreenshots,
        deletedVideos: media.deletedVideos,
        changedScreenshots: media.changedScreenshots,
        changedVideos: media.changedVideos,
        addedScreenshots: media.addedScreenshots?.map((screenshot) => ({
          order: screenshot.order,
        })),
        addedVideos: media.addedVideos?.map((video) => ({
          order: video.order,
        })),
        featuredOrders: media.featuredOrders,
      })
    );

    // Append changed thumbnails
    media.changedThumbnails.mainImage &&
      formData.append('mainImage', media.changedThumbnails.mainImage);
    media.changedThumbnails.verticalHeaderImage &&
      formData.append('verticalHeaderImage', media.changedThumbnails.verticalHeaderImage);
    media.changedThumbnails.horizontalHeaderImage &&
      formData.append('horizontalHeaderImage', media.changedThumbnails.horizontalHeaderImage);
    media.changedThumbnails.smallHeaderImage &&
      formData.append('smallHeaderImage', media.changedThumbnails.smallHeaderImage);
    media.changedThumbnails.backgroundImage &&
      formData.append('backgroundImage', media.changedThumbnails.backgroundImage);
    media.changedThumbnails.menuImg && formData.append('menuImg', media.changedThumbnails.menuImg);
    media.changedThumbnails.searchImage &&
      formData.append('searchImage', media.changedThumbnails.searchImage);
    media.changedThumbnails.tabImage &&
      formData.append('tabImage', media.changedThumbnails.tabImage);

    // Append added screenshots and videos
    media.addedScreenshots?.map((screenshot) => {
      formData.append(`${screenshot.order}`, screenshot.image);
    });
    media.addedVideos?.map((video) => {
      formData.append(`${video.order}`, video.video);
      formData.append(`${video.order}-poster`, video.poster);
    });

    const config: AxiosRequestConfig = {
      withCredentials: true,
    };

    const { data } = await this.patch(`/${updateData.id}`, formData, config);
    return data;
  };

  public deleteGame = async (id: number): Promise<{ message: string }> => {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
    const { data } = await this.delete(`${id}`, config);
    return data;
  };
}

export const { createGame, updateGame, deleteGame } = new GameAdminApi();
