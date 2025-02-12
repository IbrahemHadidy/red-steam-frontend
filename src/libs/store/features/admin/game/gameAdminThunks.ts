// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { initializeGamePreview } from '@store/features/game/gameSlice';

// APIs
import { getDevelopersService } from '@store/apis/common/developers';
import { getFeaturesService } from '@store/apis/common/features';
import { getPublishersService } from '@store/apis/common/publishers';
import { getTagsService } from '@store/apis/common/tags';
import { createGameService, deleteGameService, updateGameService } from '@store/apis/game/admin';

// Utils
import getFileUrl from '@utils/getFileUrl';
import promiseToast from '@utils/promiseToast';
import { prepareCreateGameFormData, prepareUpdateGameFormData } from './gameAdminUtils';

// Enums
import { GameAdminType, GameMediaChangeStatus } from '@enums/admin';

// Types
import type FileMetadata from '@custom-types/file-metadata';
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { FormThumbnails } from './gameAdminUtils';

export const getPreviewData = createAppAsyncThunk<Game>(
  'admin/game/getPreviewData',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const {
      name,
      category,
      description,
      releaseDate,
      featured,
      publishers,
      developers,
      thumbnails,
      screenshots,
      videos,
      pricing,
      tags,
      features,
      languages,
      platforms,
      link,
      about,
      mature,
      matureDescription,
      systemRequirements,
      legal,
    } = getState().admin.game;

    try {
      const publishersData = await dispatch(getPublishersService.initiate(publishers)).unwrap();
      const developersData = await dispatch(getDevelopersService.initiate(developers)).unwrap();
      const tagsData = await dispatch(getTagsService.initiate(tags)).unwrap();
      const featuresData = await dispatch(getFeaturesService.initiate(features)).unwrap();

      const game: Game = {
        id: 0,
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        releaseDate,
        featured,
        publishers: publishersData,
        developers: developersData,
        thumbnailEntries: {
          mainImage: await getFileUrl(thumbnails.mainImage.file ?? ''),
          verticalHeaderImage: await getFileUrl(thumbnails.verticalHeaderImage.file ?? ''),
          smallHeaderImage: await getFileUrl(thumbnails.smallHeaderImage.file ?? ''),
          searchImage: await getFileUrl(thumbnails.searchImage.file ?? ''),
          tabImage: await getFileUrl(thumbnails.tabImage.file ?? ''),
          backgroundImage: await getFileUrl(thumbnails.backgroundImage.file ?? ''),
          menuImg: await getFileUrl(thumbnails.menuImg.file ?? ''),
          horizontalHeaderImage: await getFileUrl(thumbnails.horizontalHeaderImage.file ?? ''),
        },
        imageEntries: await Promise.all(
          screenshots
            .filter((entry) => entry.change !== GameMediaChangeStatus.Deleted)
            .map(async (entry) => ({
              ...entry,
              link: await getFileUrl(entry.image),
            }))
        ),
        videoEntries: await Promise.all(
          videos
            .filter((entry) => entry.change !== GameMediaChangeStatus.Deleted)
            .map(async (entry) => ({
              ...entry,
              link: await getFileUrl(entry.video),
              posterLink: await getFileUrl(entry.poster),
            }))
        ),
        pricing: {
          id: 1,
          free: pricing.free,
          basePrice: pricing.price ?? '',
          price: pricing.price ?? '',
        },
        tags: tagsData,
        features: featuresData,
        languageSupport: languages,
        platformEntries: platforms,
        link: link.trim() === '' ? null : link.trim(),
        about: about.trim(),
        mature,
        matureDescription: matureDescription.trim(),
        systemRequirements,
        legal: legal.trim(),
        reviews: [],
        averageRating: 0,
        reviewsCount: 0,
        totalSales: 0,
      };

      dispatch(initializeGamePreview(game));
      return fulfillWithValue(game);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }

      return rejectWithValue('Something went wrong');
    }
  }
);

const createGame = async (dispatch: AppDispatch, state: RootState, router: AppRouterInstance) => {
  const { previewData, thumbnails, screenshots, videos } = state.admin.game;

  const formData = await prepareCreateGameFormData(
    previewData as Game,
    thumbnails as FormThumbnails,
    screenshots,
    videos
  );

  const response = await promiseToast(dispatch(createGameService.initiate({ formData })).unwrap(), {
    pending: 'Creating game',
    success: 'Game created successfully',
    fallbackError: 'An error occurred while creating game. Please try again.',
  });

  if (response?.id) router.push(`/game/${response.id}`);
};

const updateGame = async (dispatch: AppDispatch, state: RootState, router: AppRouterInstance) => {
  const {
    name,
    category,
    description,
    releaseDate,
    featured,
    publishers,
    developers,
    thumbnails,
    screenshots,
    videos,
    pricing,
    tags,
    features,
    languages,
    platforms,
    link,
    about,
    mature,
    matureDescription,
    systemRequirements,
    legal,
    gameToUpdate,
  } = state.admin.game;

  const formData = await prepareUpdateGameFormData(
    {
      changedThumbnails: {
        mainImage: thumbnails.mainImage.changed
          ? (thumbnails.mainImage.file as FileMetadata)
          : undefined,
        backgroundImage: thumbnails.backgroundImage.changed
          ? (thumbnails.backgroundImage.file as FileMetadata)
          : undefined,
        menuImg: thumbnails.menuImg.changed ? (thumbnails.menuImg.file as FileMetadata) : undefined,
        horizontalHeaderImage: thumbnails.horizontalHeaderImage.changed
          ? (thumbnails.horizontalHeaderImage.file as FileMetadata)
          : undefined,
        verticalHeaderImage: thumbnails.verticalHeaderImage.changed
          ? (thumbnails.verticalHeaderImage.file as FileMetadata)
          : undefined,
        smallHeaderImage: thumbnails.smallHeaderImage.changed
          ? (thumbnails.smallHeaderImage.file as FileMetadata)
          : undefined,
        searchImage: thumbnails.searchImage.changed
          ? (thumbnails.searchImage.file as FileMetadata)
          : undefined,
        tabImage: thumbnails.tabImage.changed
          ? (thumbnails.tabImage.file as FileMetadata)
          : undefined,
      },
      deletedScreenshots: screenshots
        .filter((screenshot) => screenshot.change === GameMediaChangeStatus.Deleted)
        .map((screenshot) => screenshot.baseOrder),
      deletedVideos: videos
        .filter((video) => video.change === GameMediaChangeStatus.Deleted)
        .map((video) => video.baseOrder),
      changedScreenshots: screenshots
        .filter(
          (screenshot) =>
            screenshot.change !== GameMediaChangeStatus.Deleted &&
            screenshot.change !== GameMediaChangeStatus.Added &&
            screenshot.order !== screenshot.baseOrder
        )
        .map((screenshot) => ({
          oldOrder: screenshot.baseOrder,
          newOrder: screenshot.order,
        })),
      changedVideos: videos
        .filter(
          (video) =>
            video.change !== GameMediaChangeStatus.Deleted &&
            video.change !== GameMediaChangeStatus.Added &&
            video.order !== video.baseOrder
        )
        .map((video) => ({
          oldOrder: video.baseOrder,
          newOrder: video.order,
        })),
      addedScreenshots: screenshots.filter(
        (screenshot) => screenshot.change === GameMediaChangeStatus.Added
      ),
      addedVideos: videos.filter((video) => video.change === GameMediaChangeStatus.Added),
      featuredOrders: screenshots
        .filter((screenshot) => screenshot.featured)
        .map((screenshot) => screenshot.order),
    },
    {
      id: gameToUpdate?.id,
      name: name.trim(),
      category: gameToUpdate?.category !== category.trim() ? category.trim() : undefined,
      description:
        gameToUpdate?.description !== description.trim() ? description.trim() : undefined,
      releaseDate: gameToUpdate?.releaseDate !== releaseDate ? releaseDate : undefined,
      featured: gameToUpdate?.featured !== featured ? featured : undefined,
      publishers:
        JSON.stringify(gameToUpdate?.publishers?.map((publisher) => publisher.id).sort()) !==
        JSON.stringify([...publishers].sort())
          ? publishers
          : undefined,
      developers:
        JSON.stringify(gameToUpdate?.developers?.map((developer) => developer.id).sort()) !==
        JSON.stringify([...developers].sort())
          ? developers
          : undefined,
      pricing:
        gameToUpdate?.pricing?.free !== pricing.free ||
        gameToUpdate?.pricing?.basePrice !== pricing.price?.toString()
          ? {
              free: gameToUpdate?.pricing?.free !== pricing.free ? pricing.free : undefined,
              price:
                gameToUpdate?.pricing?.basePrice !== pricing.price
                  ? pricing.price?.toString()
                  : undefined,
            }
          : undefined,
      tags:
        JSON.stringify(gameToUpdate?.tags?.map((tag) => tag.id).sort()) !==
        JSON.stringify([...tags].sort())
          ? tags
          : undefined,
      features:
        JSON.stringify(gameToUpdate?.features?.map((feature) => feature.id).sort()) !==
        JSON.stringify([...features].sort())
          ? features
          : undefined,
      languages: gameToUpdate?.languageSupport !== languages ? languages : undefined,
      platforms: {
        win: platforms.win,
        mac: platforms.mac,
      },
      link: gameToUpdate?.link !== link.trim() ? link.trim() : undefined,
      about: gameToUpdate?.about !== about.trim() ? about.trim() : undefined,
      mature: gameToUpdate?.mature !== mature ? mature : undefined,
      matureDescription:
        gameToUpdate?.matureDescription !== matureDescription.trim()
          ? matureDescription.trim()
          : undefined,
      systemRequirements:
        gameToUpdate?.systemRequirements !== systemRequirements ? systemRequirements : undefined,
      legal: gameToUpdate?.legal !== legal.trim() ? legal.trim() : undefined,
    }
  );

  const response = await promiseToast(
    dispatch(updateGameService.initiate({ id: gameToUpdate?.id, formData })).unwrap(),
    {
      pending: 'Updating game',
      success: 'Game updated successfully',
      fallbackError: 'Error updating game',
    }
  );

  if (response?.message) router.push(`/game/${gameToUpdate?.id}`);
};

export const deleteGame = createAppAsyncThunk<void, { id: number; router: AppRouterInstance }>(
  'admin/game/deleteGame',
  async ({ id, router }, { dispatch }) => {
    const response = await promiseToast(dispatch(deleteGameService.initiate(id)).unwrap(), {
      pending: 'Deleting game...',
      success: 'Game deleted successfully',
      fallbackError: 'Error deleting game',
    });

    if (response?.message) router.push('/');
  }
);

export const submitForm = createAppAsyncThunk<void, AppRouterInstance>(
  'admin/game/submitForm',
  async (router, { rejectWithValue, getState, dispatch }) => {
    const { type } = getState().admin.game;

    // Prevent the user from leaving the page message
    const preventNavigation = (e: BeforeUnloadEvent): string => {
      e.preventDefault();
      const message = 'A process is in progress. Are you sure you want to leave?';
      return message;
    };

    try {
      // Prevent the user from leaving the page
      window.addEventListener('beforeunload', preventNavigation);

      if (type === GameAdminType.Create) {
        await createGame(dispatch, getState(), router);
      } else if (type === GameAdminType.Update) {
        await updateGame(dispatch, getState(), router);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    } finally {
      // Clean up the event listener
      window.removeEventListener('beforeunload', preventNavigation);
    }
  }
);
