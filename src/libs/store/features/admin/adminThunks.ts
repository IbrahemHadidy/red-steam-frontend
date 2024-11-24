// Toast Notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { setIsFetching } from './adminSlice';

// Utils
import debounce from '@utils/debounce';

// APIs
import developerApi from '@store/apis/common/developers';
import featureApi from '@store/apis/common/features';
import languageApi from '@store/apis/common/languages';
import publisherApi from '@store/apis/common/publishers';
import reviewApi from '@store/apis/common/reviews';
import tagApi from '@store/apis/common/tags';
import gameOfferApi from '@store/apis/game/offer';

// Types
import type { Company } from '@interfaces/company';
import type { Feature } from '@interfaces/feature';
import type { Game } from '@interfaces/game';
import type { Language } from '@interfaces/language';
import type { Review } from '@interfaces/review';
import type { Tag } from '@interfaces/tag';
import type { AppDispatch } from '@store/store';

type OffersOrderBy =
  | 'id'
  | 'username'
  | 'email'
  | 'country'
  | 'isVerified'
  | 'isAdmin'
  | 'createdAt';

interface FetchPaginatedFeaturesPayload {
  items: Feature[];
  total: number;
  totalPages: number;
}

interface FetchPaginatedCompaniesPayload {
  items: Company[];
  total: number;
  totalPages: number;
}

interface FetchPaginatedLanguagesPayload {
  items: Language[];
  total: number;
  totalPages: number;
}

interface FetchPaginatedTagsPayload {
  items: Tag[];
  total: number;
  totalPages: number;
}

interface FetchPaginatedReviewsPayload {
  items: Review[];
  total: number;
  totalPages: number;
}

interface FetchPaginatedOffersPayload {
  items: Game[];
  total: number;
  totalPages: number;
}

export const fetchPaginatedFeatures = createAppAsyncThunk<
  FetchPaginatedFeaturesPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedFeatures',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedFeaturesPayload>(
        dispatch(
          featureApi.endpoints.getFeaturesPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching features...',
          error: 'Error fetching features',
        }
      )
      .catch((error) => {
        console.error('Error fetching features:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching features');
    }
  }
);

export const fetchPaginatedPublishers = createAppAsyncThunk<
  FetchPaginatedCompaniesPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedPublishers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedCompaniesPayload>(
        dispatch(
          publisherApi.endpoints.getPublishersPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching publishers...',
          error: 'Error fetching publishers',
        }
      )
      .catch((error) => {
        console.error('Error fetching publishers:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching publishers');
    }
  }
);

export const fetchPaginatedDevelopers = createAppAsyncThunk<
  FetchPaginatedCompaniesPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedDevelopers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedCompaniesPayload>(
        dispatch(
          developerApi.endpoints.getDevelopersPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching developers...',
          error: 'Error fetching developers',
        }
      )
      .catch((error) => {
        console.error('Error fetching developers:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching developers');
    }
  }
);

export const fetchPaginatedLanguages = createAppAsyncThunk<
  FetchPaginatedLanguagesPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedLanguages',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedLanguagesPayload>(
        dispatch(
          languageApi.endpoints.getLanguagesPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching languages...',
          error: 'Error fetching languages',
        }
      )
      .catch((error) => {
        console.error('Error fetching languages:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching languages');
    }
  }
);

export const fetchPaginatedTags = createAppAsyncThunk<
  FetchPaginatedTagsPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedTags',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedTagsPayload>(
        dispatch(
          tagApi.endpoints.getTagsPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching tags...',
          error: 'Error fetching tags',
        }
      )
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching tags');
    }
  }
);

export const fetchPaginatedReviews = createAppAsyncThunk<
  FetchPaginatedReviewsPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedReviews',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedReviewsPayload>(
        dispatch(
          reviewApi.endpoints.getReviewsPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as 'id' | 'name',
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching reviews...',
          error: 'Error fetching reviews',
        }
      )
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching reviews');
    }
  }
);

export const fetchPaginatedOffers = createAppAsyncThunk<
  FetchPaginatedOffersPayload,
  void,
  { rejectValue: string }
>(
  'admin/fetchPaginatedOffers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await toast
      .promise<FetchPaginatedOffersPayload>(
        dispatch(
          gameOfferApi.endpoints.getOffersPaginated.initiate({
            page: currentPage,
            limit: itemsPerPage,
            orderBy: sortConfig.key as OffersOrderBy,
            order: sortConfig.direction,
            searchQuery,
          })
        ).unwrap(),
        {
          pending: 'Fetching reviews...',
          error: 'Error fetching reviews',
        }
      )
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching reviews');
    }
  }
);

const createDebouncedFetch = (fetchAction: (dispatch: AppDispatch) => void) =>
  (() => {
    const debounced = debounce((dispatch: AppDispatch) => {
      fetchAction(dispatch);
    }, 500);

    return (dispatch: AppDispatch) => {
      dispatch(setIsFetching(true));
      debounced(dispatch);
    };
  })();

export const debouncedFetchPaginatedFeatures = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedFeatures())
);
export const debouncedFetchPaginatedPublishers = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedPublishers())
);
export const debouncedFetchPaginatedDevelopers = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedDevelopers())
);
export const debouncedFetchPaginatedLanguages = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedLanguages())
);
export const debouncedFetchPaginatedTags = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedTags())
);
export const debouncedFetchPaginatedReviews = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedReviews())
);
export const debouncedFetchPaginatedOffers = createDebouncedFetch((dispatch) =>
  dispatch(fetchPaginatedOffers())
);

export const submitItem = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'admin/submitItem',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const {
      adminType,
      name,
      website,
      icon,
      offerGame,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    } = getState().admin.common;

    if (adminType === 'feature') {
      await toast
        .promise(
          dispatch(
            featureApi.endpoints.createFeature.initiate({ name: name.trim(), icon })
          ).unwrap(),
          {
            pending: 'Creating feature...',
            success: 'Feature created successfully',
            error: 'Error creating feature',
          }
        )
        .catch((error) => {
          console.error('Error creating feature:', error);
        });
    } else if (adminType === 'publisher') {
      await toast
        .promise(
          dispatch(
            publisherApi.endpoints.createPublisher.initiate({ name: name.trim(), website })
          ).unwrap(),
          {
            pending: 'Creating publisher...',
            success: 'Publisher created successfully',
            error: 'Error creating publisher',
          }
        )
        .catch((error) => {
          console.error('Error creating publisher:', error);
        });
    } else if (adminType === 'developer') {
      await toast
        .promise(
          dispatch(
            developerApi.endpoints.createDeveloper.initiate({ name: name.trim(), website })
          ).unwrap(),
          {
            pending: 'Creating developer...',
            success: 'Developer created successfully',
            error: 'Error creating developer',
          }
        )
        .catch((error) => {
          console.error('Error creating developer:', error);
        });
    } else if (adminType === 'language') {
      await toast
        .promise(
          dispatch(languageApi.endpoints.createLanguage.initiate({ name: name.trim() })).unwrap(),
          {
            pending: 'Creating language...',
            success: 'Language created successfully',
            error: 'Error creating language',
          }
        )
        .catch((error) => {
          console.error('Error creating language:', error);
        });
    } else if (adminType === 'tag') {
      await toast
        .promise(dispatch(tagApi.endpoints.createTag.initiate({ name: name.trim() })).unwrap(), {
          pending: 'Creating tag...',
          success: 'Tag created successfully',
          error: 'Error creating tag',
        })
        .catch((error) => {
          console.error('Error creating tag:', error);
        });
    } else if (adminType === 'create-offer' && offerGame) {
      await toast
        .promise(
          dispatch(
            gameOfferApi.endpoints.createOffer.initiate({
              gameId: offerGame.id,
              discountPrice,
              offerType,
              discountStartDate,
              discountEndDate,
            })
          ).unwrap(),
          {
            pending: 'Creating offer...',
            success: 'Offer created successfully',
            error: 'Error creating offer',
          }
        )
        .catch((error) => {
          console.error('Error creating offer:', error);
        });
    } else {
      return rejectWithValue('Error submitting item');
    }

    return fulfillWithValue(undefined);
  }
);

export const updateItem = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'admin/updateItem',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const {
      adminType,
      currentEditItem,
      name,
      website,
      icon,
      offerGame,
      discount,
      discountPrice,
      offerType,
      discountStartDate,
      discountEndDate,
    } = getState().admin.common;

    if (adminType === 'feature') {
      await toast
        .promise(
          dispatch(
            featureApi.endpoints.updateFeature.initiate({
              id: currentEditItem?.id ?? 0,
              name: name.trim(),
              icon,
            })
          ).unwrap(),
          {
            pending: 'Updating feature...',
            success: 'Feature updated successfully',
            error: 'Error updating feature',
          }
        )
        .catch((error) => {
          console.error('Error updating feature:', error);
        });

      debouncedFetchPaginatedFeatures(dispatch);
    } else if (adminType === 'publisher') {
      await toast
        .promise(
          dispatch(
            publisherApi.endpoints.updatePublisher.initiate({
              id: currentEditItem?.id ?? 0,
              name: name.trim(),
              website,
            })
          ).unwrap(),
          {
            pending: 'Updating publisher...',
            success: 'Publisher updated successfully',
            error: 'Error updating publisher',
          }
        )
        .catch((error) => {
          console.error('Error updating publisher:', error);
        });

      debouncedFetchPaginatedPublishers(dispatch);
    } else if (adminType === 'developer') {
      await toast
        .promise(
          dispatch(
            developerApi.endpoints.updateDeveloper.initiate({
              id: currentEditItem?.id ?? 0,
              name: name.trim(),
              website,
            })
          ).unwrap(),
          {
            pending: 'Updating developer...',
            success: 'Developer updated successfully',
            error: 'Error updating developer',
          }
        )
        .catch((error) => {
          console.error('Error updating developer:', error);
        });

      debouncedFetchPaginatedDevelopers(dispatch);
    } else if (adminType === 'language') {
      await toast
        .promise(
          dispatch(
            languageApi.endpoints.updateLanguage.initiate({
              id: currentEditItem?.id ?? 0,
              name: name.trim(),
            })
          ).unwrap(),
          {
            pending: 'Updating language...',
            success: 'Language updated successfully',
            error: 'Error updating language',
          }
        )
        .catch((error) => {
          console.error('Error updating language:', error);
        });

      debouncedFetchPaginatedLanguages(dispatch);
    } else if (adminType === 'tag') {
      await toast
        .promise(
          dispatch(
            tagApi.endpoints.updateTag.initiate({ id: currentEditItem?.id ?? 0, name: name.trim() })
          ).unwrap(),
          {
            pending: 'Updating tag...',
            success: 'Tag updated successfully',
            error: 'Error updating tag',
          }
        )
        .catch((error) => {
          console.error('Error updating tag:', error);
        });

      debouncedFetchPaginatedTags(dispatch);
    } else if (['offer', 'create-offer'].includes(adminType) && offerGame) {
      await toast
        .promise(
          dispatch(
            gameOfferApi.endpoints.updateOffer.initiate({
              id: currentEditItem?.id ?? 0,
              discount,
              discountPrice,
              offerType,
              discountStartDate,
              discountEndDate,
            })
          ).unwrap(),
          {
            pending: 'Updating offer...',
            success: 'Offer updated successfully',
            error: 'Error updating offer',
          }
        )
        .catch((error) => {
          console.error('Error updating offer:', error);
        });

      debouncedFetchPaginatedOffers(dispatch);
    } else {
      return rejectWithValue('Error updating item');
    }

    return fulfillWithValue(undefined);
  }
);

export const deleteItem = createAppAsyncThunk<void, void, { rejectValue: string }>(
  'admin/deleteItem',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    const { adminType, deleteItemId: id } = getState().admin.common;

    if (adminType === 'feature') {
      await toast
        .promise(dispatch(featureApi.endpoints.deleteFeature.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting feature...',
          success: 'Feature deleted successfully',
          error: 'Error deleting feature',
        })
        .catch((error) => {
          console.error('Error deleting feature:', error);
        });

      debouncedFetchPaginatedFeatures(dispatch);
    } else if (adminType === 'publisher') {
      await toast
        .promise(dispatch(publisherApi.endpoints.deletePublisher.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting publisher...',
          success: 'Publisher deleted successfully',
          error: 'Error deleting publisher',
        })
        .catch((error) => {
          console.error('Error deleting publisher:', error);
        });

      debouncedFetchPaginatedPublishers(dispatch);
    } else if (adminType === 'developer') {
      await toast
        .promise(dispatch(developerApi.endpoints.deleteDeveloper.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting developer...',
          success: 'Developer deleted successfully',
          error: 'Error deleting developer',
        })
        .catch((error) => {
          console.error('Error deleting developer:', error);
        });

      debouncedFetchPaginatedDevelopers(dispatch);
    } else if (adminType === 'language') {
      await toast
        .promise(dispatch(languageApi.endpoints.deleteLanguage.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting language...',
          success: 'Language deleted successfully',
          error: 'Error deleting language',
        })
        .catch((error) => {
          console.error('Error deleting language:', error);
        });

      debouncedFetchPaginatedLanguages(dispatch);
    } else if (adminType === 'tag') {
      await toast
        .promise(dispatch(tagApi.endpoints.deleteTag.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting tag...',
          success: 'Tag deleted successfully',
          error: 'Error deleting tag',
        })
        .catch((error) => {
          console.error('Error deleting tag:', error);
        });

      debouncedFetchPaginatedTags(dispatch);
    } else if (['offer', 'create-offer'].includes(adminType)) {
      await toast
        .promise(dispatch(gameOfferApi.endpoints.deleteOffer.initiate(id ?? 0)).unwrap(), {
          pending: 'Deleting offer...',
          success: 'Offer deleted successfully',
          error: 'Error deleting offer',
        })
        .catch((error) => {
          console.error('Error deleting offer:', error);
        });

      debouncedFetchPaginatedOffers(dispatch);
    } else {
      return rejectWithValue('Error deleting item');
    }

    return fulfillWithValue(undefined);
  }
);
