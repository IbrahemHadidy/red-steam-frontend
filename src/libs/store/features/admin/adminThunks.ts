// Redux Hooks
import { createAppAsyncThunk } from '@store/hooks';

// Redux Handlers
import { setIsFetching } from './adminSlice';

// APIs
import developerApi from '@store/apis/common/developers';
import featureApi from '@store/apis/common/features';
import languageApi from '@store/apis/common/languages';
import publisherApi from '@store/apis/common/publishers';
import reviewApi from '@store/apis/common/reviews';
import tagApi from '@store/apis/common/tags';
import gameOfferApi from '@store/apis/game/offer';

// Utils
import debounce from '@utils/debounce';
import promiseToast from '@utils/promiseToast';

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

export const fetchPaginatedFeatures = createAppAsyncThunk<FetchPaginatedFeaturesPayload>(
  'admin/fetchPaginatedFeatures',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching features',
        fallbackError: 'Error fetching features',
      }
    ).catch((error) => {
      console.error('Error fetching features:', error);
    });
    if (!data) return rejectWithValue('Error fetching features');

    return fulfillWithValue(data);
  }
);

export const fetchPaginatedPublishers = createAppAsyncThunk<FetchPaginatedCompaniesPayload>(
  'admin/fetchPaginatedPublishers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching publishers',
        fallbackError: 'Error fetching publishers',
      }
    );

    if (data) {
      return fulfillWithValue(data);
    } else {
      return rejectWithValue('Error fetching publishers');
    }
  }
);

export const fetchPaginatedDevelopers = createAppAsyncThunk<FetchPaginatedCompaniesPayload>(
  'admin/fetchPaginatedDevelopers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching developers',
        fallbackError: 'Error fetching developers',
      }
    );
    if (!data) return rejectWithValue('Error fetching developers');

    return fulfillWithValue(data);
  }
);

export const fetchPaginatedLanguages = createAppAsyncThunk<FetchPaginatedLanguagesPayload>(
  'admin/fetchPaginatedLanguages',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching languages',
        fallbackError: 'Error fetching languages',
      }
    );
    if (!data) return rejectWithValue('Error fetching languages');

    return fulfillWithValue(data);
  }
);

export const fetchPaginatedTags = createAppAsyncThunk<FetchPaginatedTagsPayload>(
  'admin/fetchPaginatedTags',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching tags',
        fallbackError: 'Error fetching tags',
      }
    );
    if (!data) return rejectWithValue('Error fetching tags');

    return fulfillWithValue(data);
  }
);

export const fetchPaginatedReviews = createAppAsyncThunk<FetchPaginatedReviewsPayload>(
  'admin/fetchPaginatedReviews',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching reviews',
        fallbackError: 'Error fetching reviews',
      }
    );
    if (!data) return rejectWithValue('Error fetching reviews');

    return fulfillWithValue(data);
  }
);

export const fetchPaginatedOffers = createAppAsyncThunk<FetchPaginatedOffersPayload>(
  'admin/fetchPaginatedOffers',
  async (_, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { currentPage, itemsPerPage, sortConfig, searchQuery } = getState().admin.common;

    const data = await promiseToast(
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
        pending: 'Fetching reviews',
        fallbackError: 'Error fetching reviews',
      }
    );
    if (!data) return rejectWithValue('Error fetching reviews');

    return fulfillWithValue(data);
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

export const submitItem = createAppAsyncThunk(
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

    let result: void | { message: string };
    if (adminType === 'feature') {
      result = await promiseToast(
        dispatch(featureApi.endpoints.createFeature.initiate({ name: name.trim(), icon })).unwrap(),
        {
          pending: 'Creating feature',
          success: 'Feature created successfully',
          fallbackError: 'Error creating feature',
        }
      );
    } else if (adminType === 'publisher') {
      result = await promiseToast(
        dispatch(
          publisherApi.endpoints.createPublisher.initiate({ name: name.trim(), website })
        ).unwrap(),
        {
          pending: 'Creating publisher',
          success: 'Publisher created successfully',
          fallbackError: 'Error creating publisher',
        }
      );
    } else if (adminType === 'developer') {
      result = await promiseToast(
        dispatch(
          developerApi.endpoints.createDeveloper.initiate({ name: name.trim(), website })
        ).unwrap(),
        {
          pending: 'Creating developer',
          success: 'Developer created successfully',
          fallbackError: 'Error creating developer',
        }
      );
    } else if (adminType === 'language') {
      result = await promiseToast(
        dispatch(languageApi.endpoints.createLanguage.initiate({ name: name.trim() })).unwrap(),
        {
          pending: 'Creating language',
          success: 'Language created successfully',
          fallbackError: 'Error creating language',
        }
      );
    } else if (adminType === 'tag') {
      result = await promiseToast(
        dispatch(tagApi.endpoints.createTag.initiate({ name: name.trim() })).unwrap(),
        {
          pending: 'Creating tag',
          success: 'Tag created successfully',
          fallbackError: 'Error creating tag',
        }
      );
    } else if (adminType === 'create-offer' && offerGame) {
      result = await promiseToast(
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
          pending: 'Creating offer',
          success: 'Offer created successfully',
          fallbackError: 'Error creating offer',
        }
      );
    } else {
      return rejectWithValue('Error submitting item');
    }

    if (!result) return rejectWithValue('Error submitting item');

    return fulfillWithValue(undefined);
  }
);

export const updateItem = createAppAsyncThunk(
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
      const result = await promiseToast(
        dispatch(
          featureApi.endpoints.updateFeature.initiate({
            id: currentEditItem?.id ?? 0,
            name: name.trim(),
            icon,
          })
        ).unwrap(),
        {
          pending: 'Updating feature',
          success: 'Feature updated successfully',
          fallbackError: 'Error updating feature',
        }
      );
      if (!result) return rejectWithValue('Error updating feature');

      debouncedFetchPaginatedFeatures(dispatch);
    } else if (adminType === 'publisher') {
      const result = await promiseToast(
        dispatch(
          publisherApi.endpoints.updatePublisher.initiate({
            id: currentEditItem?.id ?? 0,
            name: name.trim(),
            website,
          })
        ).unwrap(),
        {
          pending: 'Updating publisher',
          success: 'Publisher updated successfully',
          fallbackError: 'Error updating publisher',
        }
      );
      if (!result) return rejectWithValue('Error updating publisher');

      debouncedFetchPaginatedPublishers(dispatch);
    } else if (adminType === 'developer') {
      const result = await promiseToast(
        dispatch(
          developerApi.endpoints.updateDeveloper.initiate({
            id: currentEditItem?.id ?? 0,
            name: name.trim(),
            website,
          })
        ).unwrap(),
        {
          pending: 'Updating developer',
          success: 'Developer updated successfully',
          fallbackError: 'Error updating developer',
        }
      );
      if (!result) return rejectWithValue('Error updating developer');

      debouncedFetchPaginatedDevelopers(dispatch);
    } else if (adminType === 'language') {
      const result = await promiseToast(
        dispatch(
          languageApi.endpoints.updateLanguage.initiate({
            id: currentEditItem?.id ?? 0,
            name: name.trim(),
          })
        ).unwrap(),
        {
          pending: 'Updating language',
          success: 'Language updated successfully',
          fallbackError: 'Error updating language',
        }
      );
      if (!result) return rejectWithValue('Error updating language');

      debouncedFetchPaginatedLanguages(dispatch);
    } else if (adminType === 'tag') {
      const result = await promiseToast(
        dispatch(
          tagApi.endpoints.updateTag.initiate({ id: currentEditItem?.id ?? 0, name: name.trim() })
        ).unwrap(),
        {
          pending: 'Updating tag',
          success: 'Tag updated successfully',
          fallbackError: 'Error updating tag',
        }
      );
      if (!result) return rejectWithValue('Error updating tag');

      debouncedFetchPaginatedTags(dispatch);
    } else if (['offer', 'create-offer'].includes(adminType) && offerGame) {
      const result = await promiseToast(
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
          pending: 'Updating offer',
          success: 'Offer updated successfully',
          fallbackError: 'Error updating offer',
        }
      );
      if (!result) return rejectWithValue('Error updating offer');

      debouncedFetchPaginatedOffers(dispatch);
    } else {
      return rejectWithValue('Error updating item');
    }

    return fulfillWithValue(undefined);
  }
);

export const deleteItem = createAppAsyncThunk(
  'admin/deleteItem',
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    const { adminType, deleteItemId: id } = getState().admin.common;

    if (adminType === 'feature') {
      const result = await promiseToast(
        dispatch(featureApi.endpoints.deleteFeature.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting feature',
          success: 'Feature deleted successfully',
          fallbackError: 'Error deleting feature',
        }
      );
      if (!result) return rejectWithValue('Error deleting feature');

      debouncedFetchPaginatedFeatures(dispatch);
    } else if (adminType === 'publisher') {
      const result = await promiseToast(
        dispatch(publisherApi.endpoints.deletePublisher.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting publisher',
          success: 'Publisher deleted successfully',
          fallbackError: 'Error deleting publisher',
        }
      );
      if (!result) return rejectWithValue('Error deleting publisher');

      debouncedFetchPaginatedPublishers(dispatch);
    } else if (adminType === 'developer') {
      const result = await promiseToast(
        dispatch(developerApi.endpoints.deleteDeveloper.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting developer',
          success: 'Developer deleted successfully',
          fallbackError: 'Error deleting developer',
        }
      );
      if (!result) return rejectWithValue('Error deleting developer');

      debouncedFetchPaginatedDevelopers(dispatch);
    } else if (adminType === 'language') {
      const result = await promiseToast(
        dispatch(languageApi.endpoints.deleteLanguage.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting language',
          success: 'Language deleted successfully',
          fallbackError: 'Error deleting language',
        }
      );
      if (!result) return rejectWithValue('Error deleting language');

      debouncedFetchPaginatedLanguages(dispatch);
    } else if (adminType === 'tag') {
      const result = await promiseToast(
        dispatch(tagApi.endpoints.deleteTag.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting tag',
          success: 'Tag deleted successfully',
          fallbackError: 'Error deleting tag',
        }
      );
      if (!result) return rejectWithValue('Error deleting tag');

      debouncedFetchPaginatedTags(dispatch);
    } else if (['offer', 'create-offer'].includes(adminType)) {
      const result = await promiseToast(
        dispatch(gameOfferApi.endpoints.deleteOffer.initiate(id ?? 0)).unwrap(),
        {
          pending: 'Deleting offer',
          success: 'Offer deleted successfully',
          fallbackError: 'Error deleting offer',
        }
      );
      if (!result) return rejectWithValue('Error deleting offer');

      debouncedFetchPaginatedOffers(dispatch);
    } else {
      return rejectWithValue('Error deleting item');
    }

    return fulfillWithValue(undefined);
  }
);
