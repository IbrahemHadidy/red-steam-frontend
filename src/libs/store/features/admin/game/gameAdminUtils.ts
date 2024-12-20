// Utils
import { getFileFromIndexedDB } from '@utils/filesStorageUtils';
import { toast } from 'react-toastify';

// Types
import type FileMetadata from '@custom-types/file-metadata';
import type { Language, Screenshot, Video } from '@custom-types/game-admin';
import type { Game, SystemRequirementsEntry } from '@interfaces/game';

export type FormThumbnails = {
  mainImage: { file: FileMetadata; changed: boolean };
  backgroundImage: { file: FileMetadata; changed: boolean };
  menuImg: { file: FileMetadata; changed: boolean };
  horizontalHeaderImage: { file: FileMetadata; changed: boolean };
  verticalHeaderImage: { file: FileMetadata; changed: boolean };
  smallHeaderImage: { file: FileMetadata; changed: boolean };
  searchImage: { file: FileMetadata; changed: boolean };
  tabImage: { file: FileMetadata; changed: boolean };
};

/**
 * Check if the screenshot is already in the state
 * @param file The file to check
 * @param screenshots The screenshots state
 * @return True if the file is duplicate
 */
export const checkDuplicateScreenshot = (
  file: FileMetadata | string,
  screenshots: Screenshot[]
): boolean => {
  if (file instanceof File) {
    if (
      screenshots.some(
        (screenshot) =>
          screenshot.image instanceof File &&
          screenshot.image.name === file.name &&
          screenshot.image.size === file.size &&
          screenshot.image.type === file.type
      )
    ) {
      toast.warn('This screenshot is already added.');
      return true;
    }
  }
  return false;
};

/**
 * Check if the video is already in the state
 * @param file The file to check
 * @param videos The videos state
 * @return True if the file is duplicate
 */
export const checkDuplicateVideo = (file: FileMetadata | string, videos: Video[]): boolean => {
  if (file instanceof File) {
    if (
      videos.some(
        (video) =>
          video.video instanceof File &&
          video.video.name === file.name &&
          video.video.size === file.size &&
          video.video.type === file.type
      )
    ) {
      toast.warn('This video is already added.');
      return true;
    }
  }
  return false;
};

/**
 * Get next order for added media
 * @param screenshots The screenshots state
 * @param videos The videos state
 * @return The next order
 */
export const getNextOrder = (screenshots: Screenshot[], videos: Video[]): number => {
  const allItems = [...screenshots, ...videos];
  return allItems.length > 0 ? Math.max(...allItems.map((item) => item.order)) + 1 : 1;
};

/**
 * Prepare the form data for creating a game
 * @param gameData The game data
 * @param thumbnails The thumbnails data
 * @param images The screenshots data
 * @param videos The videos data
 * @return The form data
 */
export const prepareCreateGameFormData = async (
  gameData: Game,
  thumbnails: FormThumbnails,
  images: Screenshot[],
  videos: Video[]
): Promise<FormData> => {
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

  // Append thumbnails
  for (const [key, value] of Object.entries(thumbnails)) {
    const file = await getFileFromIndexedDB(value.file.id);
    if (file) {
      formData.append(key, file as File);
    }
  }

  // Append images
  for (const entry of images) {
    const file = await getFileFromIndexedDB((entry.image as FileMetadata).id);
    if (file) {
      formData.append(`${entry.order}`, file as File);
    }
  }

  // Append videos
  for (const entry of videos) {
    const videoFile = await getFileFromIndexedDB((entry.video as FileMetadata).id);
    const posterFile = await getFileFromIndexedDB((entry.poster as FileMetadata).id);
    if (videoFile) {
      formData.append(`${entry.order}`, videoFile as File);
    }
    if (posterFile) {
      formData.append(`${entry.order}-poster`, posterFile as File);
    }
  }

  return formData;
};

/**
 * Prepare the form data for updating a game
 * @param media The media changes including thumbnails, screenshots, and videos
 * @param updateData The update data including game details like name, category, etc.
 * @return The form data
 */
export const prepareUpdateGameFormData = async (
  media: {
    changedThumbnails: {
      mainImage?: FileMetadata;
      backgroundImage?: FileMetadata;
      menuImg?: FileMetadata;
      horizontalHeaderImage?: FileMetadata;
      verticalHeaderImage?: FileMetadata;
      smallHeaderImage?: FileMetadata;
      searchImage?: FileMetadata;
      tabImage?: FileMetadata;
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
  }
): Promise<FormData> => {
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

  // Append thumbnails
  for (const [key, value] of Object.entries(media.changedThumbnails)) {
    if (value) {
      const file = await getFileFromIndexedDB(value.id);
      if (file) {
        formData.append(key, file as File);
      }
    }
  }

  // Append images
  if (media.addedScreenshots) {
    for (const entry of media.addedScreenshots) {
      const file = await getFileFromIndexedDB((entry.image as FileMetadata).id);
      if (file) {
        formData.append(`${entry.order}`, file as File);
      }
    }
  }

  // Append videos
  if (media.addedVideos) {
    for (const entry of media.addedVideos) {
      const videoFile = await getFileFromIndexedDB((entry.video as FileMetadata).id);
      const posterFile = await getFileFromIndexedDB((entry.poster as FileMetadata).id);
      if (videoFile) {
        formData.append(`${entry.order}`, videoFile as File);
      }
      if (posterFile) {
        formData.append(`${entry.order}-poster`, posterFile as File);
      }
    }
  }

  return formData;
};
