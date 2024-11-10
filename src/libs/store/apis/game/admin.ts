// RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Utils
import { getFileFromLocalStorage } from '@utils/filesStorageUtils';

// Types
import type FileMetadata from '@custom-types/file-metadata';
import type { Language, Screenshot, Video } from '@custom-types/game-admin';
import type { Game, SystemRequirementsEntry } from '@interfaces/game';

export type Thumbnails = {
  mainImage: { file: FileMetadata; changed: boolean };
  backgroundImage: { file: FileMetadata; changed: boolean };
  menuImg: { file: FileMetadata; changed: boolean };
  horizontalHeaderImage: { file: FileMetadata; changed: boolean };
  verticalHeaderImage: { file: FileMetadata; changed: boolean };
  smallHeaderImage: { file: FileMetadata; changed: boolean };
  searchImage: { file: FileMetadata; changed: boolean };
  tabImage: { file: FileMetadata; changed: boolean };
};

const gameAdminApi = createApi({
  reducerPath: 'api/game/admin',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/game/admin`,
  }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    createGame: builder.mutation<
      { message: string; id: number },
      { gameData: Game; thumbnails: Thumbnails; images: Screenshot[]; videos: Video[] }
    >({
      query: ({ gameData, thumbnails, images, videos }) => {
        const formData = new FormData();

        const body = {
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

        Object.entries(thumbnails).forEach(([key, value]) => {
          formData.append(key, getFileFromLocalStorage(value.file.id) as File);
        });

        images.forEach((entry) => {
          formData.append(
            `${entry.order}`,
            getFileFromLocalStorage((entry.image as FileMetadata).id) as File
          );
        });
        videos.forEach((entry) => {
          formData.append(
            `${entry.order}`,
            getFileFromLocalStorage((entry.video as FileMetadata).id) as File
          );
          formData.append(
            `${entry.order}-poster`,
            getFileFromLocalStorage((entry.poster as FileMetadata).id) as File
          );
        });

        return {
          url: '',
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Game'],
    }),

    updateGame: builder.mutation<
      { message: string },
      {
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
        };
        updateData: {
          id?: number;
          name?: string;
          category?: string;
          description?: string;
          releaseDate?: string;
          featured?: boolean;
          publishers?: number[];
          developers?: number[];
          pricing?: {
            free?: boolean;
            price?: string;
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
        };
      }
    >({
      query: ({ media, updateData }) => {
        if (!updateData.id) throw new Error('No game id provided');

        const formData = new FormData();

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

        Object.entries(media.changedThumbnails).forEach(([key, value]) => {
          if (value) {
            formData.append(key, value);
          }
        });

        media.addedScreenshots?.forEach((screenshot) => {
          formData.append(
            `${screenshot.order}`,
            getFileFromLocalStorage((screenshot.image as FileMetadata).id) as File
          );
        });
        media.addedVideos?.forEach((video) => {
          formData.append(
            `${video.order}`,
            getFileFromLocalStorage((video.video as FileMetadata).id) as File
          );
          formData.append(
            `${video.order}-poster`,
            getFileFromLocalStorage((video.poster as FileMetadata).id) as File
          );
        });

        return {
          url: `/${updateData.id}`,
          method: 'PATCH',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Game'],
    }),

    deleteGame: builder.mutation<{ message: string }, number>({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: ['Game'],
    }),
  }),
});

export const { useCreateGameMutation, useUpdateGameMutation, useDeleteGameMutation } = gameAdminApi;

export default gameAdminApi;
