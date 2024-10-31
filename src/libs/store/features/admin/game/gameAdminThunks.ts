// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Utils
import getFileUrl from '@utils/getFileUrl';

// APIs
import developerApi from '@store/apis/common/developers';
import featureApi from '@store/apis/common/features';
import publisherApi from '@store/apis/common/publishers';
import tagApi from '@store/apis/common/tags';
import gameAdminApi, { Thumbnails } from '@store/apis/game/admin';

// Types
import type { Game } from '@interfaces/game';
import type { AppDispatch, RootState } from '@store/store';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const getPreviewData = createAppAsyncThunk<Game, void, { rejectValue: string }>(
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
      const publishersData = await dispatch(
        publisherApi.endpoints.getPublishers.initiate(publishers)
      ).unwrap();
      const developersData = await dispatch(
        developerApi.endpoints.getDevelopers.initiate(developers)
      ).unwrap();
      const tagsData = await dispatch(tagApi.endpoints.getTags.initiate(tags)).unwrap();
      const featuresData = await dispatch(
        featureApi.endpoints.getFeatures.initiate(features)
      ).unwrap();

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
          mainImage: getFileUrl(thumbnails.mainImage.file ?? ''),
          verticalHeaderImage: getFileUrl(thumbnails.verticalHeaderImage.file ?? ''),
          smallHeaderImage: getFileUrl(thumbnails.smallHeaderImage.file ?? ''),
          searchImage: getFileUrl(thumbnails.searchImage.file ?? ''),
          tabImage: getFileUrl(thumbnails.tabImage.file ?? ''),
          backgroundImage: getFileUrl(thumbnails.backgroundImage.file ?? ''),
          menuImg: getFileUrl(thumbnails.menuImg.file ?? ''),
          horizontalHeaderImage: getFileUrl(thumbnails.horizontalHeaderImage.file ?? ''),
        },
        imageEntries: screenshots
          .filter((entry) => entry.change !== 'deleted')
          .map((entry) => ({
            ...entry,
            link: getFileUrl(entry.image),
          })),
        videoEntries: videos
          .filter((entry) => entry.change !== 'deleted')
          .map((entry) => ({
            ...entry,
            link: getFileUrl(entry.video),
            posterLink: getFileUrl(entry.poster),
          })),
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

  const response = await toast.promise(
    dispatch(
      gameAdminApi.endpoints.createGame.initiate({
        gameData: previewData as Game,
        thumbnails: thumbnails as Thumbnails,
        images: screenshots,
        videos,
      })
    ).unwrap(),
    {
      pending: 'Creating game...',
      success: 'Game created successfully',
      error: 'Failed to create game, please try again',
    }
  );
  if (response.id) router.push(`/game/${response.id}`);
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

  const response = await dispatch(
    gameAdminApi.endpoints.updateGame.initiate({
      media: {
        changedThumbnails: {
          mainImage:
            thumbnails.mainImage.file instanceof File && thumbnails.mainImage.changed
              ? thumbnails.mainImage.file
              : undefined,
          backgroundImage:
            thumbnails.backgroundImage.file instanceof File && thumbnails.backgroundImage.changed
              ? thumbnails.backgroundImage.file
              : undefined,
          menuImg:
            thumbnails.menuImg.file instanceof File && thumbnails.menuImg.changed
              ? thumbnails.menuImg.file
              : undefined,
          horizontalHeaderImage:
            thumbnails.horizontalHeaderImage.file instanceof File &&
            thumbnails.horizontalHeaderImage.changed
              ? thumbnails.horizontalHeaderImage.file
              : undefined,
          verticalHeaderImage:
            thumbnails.verticalHeaderImage.file instanceof File &&
            thumbnails.verticalHeaderImage.changed
              ? thumbnails.verticalHeaderImage.file
              : undefined,
          smallHeaderImage:
            thumbnails.smallHeaderImage.file instanceof File && thumbnails.smallHeaderImage.changed
              ? thumbnails.smallHeaderImage.file
              : undefined,
          searchImage:
            thumbnails.searchImage.file instanceof File && thumbnails.searchImage.changed
              ? thumbnails.searchImage.file
              : undefined,
          tabImage:
            thumbnails.tabImage.file instanceof File && thumbnails.tabImage.changed
              ? thumbnails.tabImage.file
              : undefined,
        },
        deletedScreenshots: screenshots
          .filter((screenshot) => screenshot.change === 'deleted')
          .map((screenshot) => screenshot.baseOrder),
        deletedVideos: videos
          .filter((video) => video.change === 'deleted')
          .map((video) => video.baseOrder),
        changedScreenshots: screenshots
          .filter(
            (screenshot) =>
              screenshot.change !== 'deleted' &&
              screenshot.change !== 'added' &&
              screenshot.order !== screenshot.baseOrder
          )
          .map((screenshot) => ({
            oldOrder: screenshot.baseOrder,
            newOrder: screenshot.order,
          })),
        changedVideos: videos
          .filter(
            (video) =>
              video.change !== 'deleted' &&
              video.change !== 'added' &&
              video.order !== video.baseOrder
          )
          .map((video) => ({
            oldOrder: video.baseOrder,
            newOrder: video.order,
          })),
        addedScreenshots: screenshots.filter((screenshot) => screenshot.change === 'added'),
        addedVideos: videos.filter((video) => video.change === 'added'),
        featuredOrders: screenshots
          .filter((screenshot) => screenshot.featured)
          .map((screenshot) => screenshot.order),
      },
      updateData: {
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
      },
    })
  ).unwrap();
  if (response.message) router.push(`/game/${gameToUpdate?.id}`);
};

export const submitForm = createAppAsyncThunk<void, AppRouterInstance, { rejectValue: string }>(
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

      if (type === 'create') {
        createGame(dispatch, getState(), router);
      } else if (type === 'update') {
        updateGame(dispatch, getState(), router);
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
