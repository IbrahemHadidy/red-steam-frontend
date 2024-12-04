// Toast Notifications
import { toast } from 'react-toastify';

// Redux
import { createAction, createSlice, nanoid } from '@reduxjs/toolkit';

// Thunks
import { getPreviewData, submitForm } from './gameAdminThunks';

// Utils
import { checkDuplicateScreenshot, checkDuplicateVideo, getNextOrder } from './gameAdminUtils';

// Types
import type FileMetadata from '@custom-types/file-metadata';
import type {
  Language,
  Platforms,
  Pricing,
  Screenshot,
  SystemRequirements,
  Thumbnails,
  Video,
} from '@custom-types/game-admin';
import type { Game } from '@interfaces/game';
import type { PayloadAction } from '@reduxjs/toolkit';

interface GameAdminState {
  // Admin type
  readonly type: 'create' | 'update';

  // Game to update (if type is 'update')
  readonly gameToUpdate: Game | null;

  // Basic Info Section
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly releaseDate: string;
  readonly featured: boolean;

  // Companies Section
  readonly publishers: number[];
  readonly developers: number[];

  // Thumbnails Section
  readonly thumbnails: Thumbnails;

  // Media Section
  readonly screenshots: Screenshot[];
  readonly videos: Video[];
  readonly changes: (Screenshot | Video)[];
  readonly duplicateOrders: number[];
  readonly cachedVideoFile: File | null;

  // Pricing Section
  readonly pricing: Pricing;

  // Specifications Section
  readonly tags: number[];
  readonly features: number[];
  readonly languages: Language[];
  readonly platforms: Platforms;

  // System Requirements Section
  readonly systemRequirements: SystemRequirements;

  // Additional Info Section
  readonly link: string;
  readonly about: string;
  readonly mature: boolean;
  readonly matureDescription: string;
  readonly legal: string;

  // Preview Data
  readonly previewData: Game | null;

  // UI States
  readonly isUpdateFetching: boolean;
  readonly isGameUpdateInitialized: boolean;
  readonly currentPage:
    | 'basic'
    | 'companies'
    | 'thumbnails'
    | 'media'
    | 'pricing'
    | 'specifications'
    | 'systemRequirements'
    | 'additional'
    | 'preview';
  readonly posterModalOpen: boolean;
  readonly loading: boolean;
  readonly duplicateError: boolean;
}

// Initial state
const gameAdminState: GameAdminState = {
  type: 'create',

  gameToUpdate: null,

  name: '',
  category: '',
  description: '',
  releaseDate: new Date().toISOString(),
  featured: false,

  publishers: [],
  developers: [],

  thumbnails: {
    mainImage: { file: null, changed: false },
    backgroundImage: { file: null, changed: false },
    menuImg: { file: null, changed: false },
    horizontalHeaderImage: { file: null, changed: false },
    verticalHeaderImage: { file: null, changed: false },
    smallHeaderImage: { file: null, changed: false },
    searchImage: { file: null, changed: false },
    tabImage: { file: null, changed: false },
  },

  screenshots: [],
  videos: [],
  changes: [],
  duplicateOrders: [],
  cachedVideoFile: null,

  pricing: {
    free: true,
    price: '',
  },

  tags: [],
  features: [],
  languages: [],
  platforms: { win: true, mac: false },

  systemRequirements: {
    req64: false,
    mini: {
      os: '',
      cpu: '',
      ram: '',
      gpu: '',
      dx: '',
      network: '',
      storage: '',
      soundCard: '',
      vrSupport: '',
      additionalNotes: '',
    },
    recommended: {
      os: '',
      cpu: '',
      ram: '',
      gpu: '',
      dx: '',
      network: '',
      storage: '',
      soundCard: '',
      vrSupport: '',
      additionalNotes: '',
    },
  },

  link: '',
  about: '',
  mature: false,
  matureDescription: `<p>The developers describe the content like this:</p>
		<p><i>This Game may contain content not appropriate for all ages, or may not be appropriate for viewing at work: Frequent Violence or Gore, General Mature Content</i></p>`,
  legal: '',

  previewData: null,

  isUpdateFetching: true,
  isGameUpdateInitialized: false,
  currentPage: 'basic',
  loading: false,
  posterModalOpen: false,
  duplicateError: false,
};

// Page order (for page navigation reducers)
const pageOrder: GameAdminState['currentPage'][] = [
  'basic',
  'companies',
  'thumbnails',
  'media',
  'pricing',
  'specifications',
  'systemRequirements',
  'additional',
  'preview',
];

const gameAdminSlice = createSlice({
  name: 'admin/game',
  initialState: gameAdminState,

  reducers: {
    setType: (state, action: PayloadAction<'create' | 'update'>) => {
      state.type = action.payload;
    },

    setGameToUpdate: (state, action: PayloadAction<Game>) => {
      state.gameToUpdate = action.payload;
    },
    setUpdateFormInitialValues: (state, action: PayloadAction<Game>) => {
      const game = action.payload;

      state.type = 'update';
      state.name = game.name;
      state.category = game.category;
      state.description = game.description;
      state.releaseDate = game.releaseDate;
      state.featured = game.featured;
      state.publishers = game.publishers?.map((p) => p.id) ?? [];
      state.developers = game.developers?.map((d) => d.id) ?? [];

      state.thumbnails = {
        mainImage: { file: game.thumbnailEntries.mainImage, changed: false },
        backgroundImage: { file: game.thumbnailEntries.backgroundImage, changed: false },
        menuImg: { file: game.thumbnailEntries.menuImg, changed: false },
        horizontalHeaderImage: {
          file: game.thumbnailEntries.horizontalHeaderImage,
          changed: false,
        },
        verticalHeaderImage: { file: game.thumbnailEntries.verticalHeaderImage, changed: false },
        smallHeaderImage: { file: game.thumbnailEntries.smallHeaderImage, changed: false },
        searchImage: { file: game.thumbnailEntries.searchImage, changed: false },
        tabImage: { file: game.thumbnailEntries.tabImage, changed: false },
      };

      state.screenshots = game.imageEntries.map((image) => ({
        id: nanoid(),
        image: image.link,
        featured: image.featured,
        baseOrder: image.order,
        order: image.order,
        change: 'unchanged',
      }));
      state.videos = game.videoEntries.map((video) => ({
        id: nanoid(),
        video: video.link,
        poster: video.posterLink,
        baseOrder: video.order,
        order: video.order,
        change: 'unchanged',
      }));

      state.pricing = {
        free: game.pricing?.free ?? false,
        price: game.pricing?.price ?? '',
      };

      state.tags = game.tags?.map((tag) => tag.id) ?? [];
      state.features = game.features?.map((feature) => feature.id) ?? [];
      state.languages = game.languageSupport;
      state.platforms = game.platformEntries;

      state.systemRequirements = game.systemRequirements;

      state.link = game.link ?? '';
      state.about = game.about;
      state.mature = game.mature;
      state.matureDescription = game.matureDescription;
      state.legal = game.legal;
    },

    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateReleaseDate: (state, action: PayloadAction<string>) => {
      state.releaseDate = action.payload;
    },
    toggleFeatured: (state) => {
      state.featured = !state.featured;
    },

    updatePublishers: (state, action: PayloadAction<number[]>) => {
      state.publishers = action.payload;
    },
    updateDevelopers: (state, action: PayloadAction<number[]>) => {
      state.developers = action.payload;
    },

    updateThumbnails: (
      state,
      action: PayloadAction<{ key: string; file: FileMetadata; changed: boolean }>
    ) => {
      const { key, file, changed } = action.payload;
      state.thumbnails[key as keyof Thumbnails] = { file, changed };
    },

    addScreenshot: (state, action: PayloadAction<FileMetadata>) => {
      // Check if the screenshot is already in the state
      const isDuplicate = checkDuplicateScreenshot(action.payload, state.screenshots);
      if (isDuplicate) {
        toast.warn('This screenshot is already added.');
        return;
      }

      const nextOrder = getNextOrder(state.screenshots, state.videos);

      state.screenshots = [
        ...state.screenshots,
        {
          id: nanoid(),
          image: action.payload,
          baseOrder: nextOrder,
          order: nextOrder,
          change: 'added',
        },
      ];
    },
    addVideo: (state, action: PayloadAction<{ video: FileMetadata; poster: FileMetadata }>) => {
      // Check if the video is already in the state
      const isVideoDuplicate = checkDuplicateVideo(action.payload.video, state.videos);
      if (isVideoDuplicate) {
        toast.warn('This video is already added.');
        return;
      }

      const nextOrder = getNextOrder(state.screenshots, state.videos);

      state.videos = [
        ...state.videos,
        {
          id: nanoid(),
          video: action.payload.video,
          poster: action.payload.poster,
          baseOrder: nextOrder,
          order: nextOrder,
          change: 'added',
        },
      ];
    },
    removeScreenshot: (state, action: PayloadAction<number>) => {
      const currentScreenshots = state.screenshots;
      const order = action.payload;

      if (state.type === 'update') {
        const screenshot = currentScreenshots.find((screenshot) => screenshot.baseOrder === order);

        if (!screenshot) return;
        if (screenshot.change === 'added') {
          state.screenshots = currentScreenshots.filter(
            (screenshot) => screenshot.baseOrder !== order
          );
        } else {
          state.changes = [...state.changes, screenshot];
          state.screenshots = currentScreenshots.map((screenshot) =>
            screenshot.baseOrder === order ? { ...screenshot, change: 'deleted' } : screenshot
          );
        }
      } else {
        state.screenshots = currentScreenshots.filter(
          (screenshot) => screenshot.baseOrder !== order
        );
      }
    },
    removeVideo: (state, action: PayloadAction<number>) => {
      const currentVideos = state.videos;
      const order = action.payload;

      if (state.type === 'update') {
        const video = currentVideos.find((video) => video.baseOrder === order);

        if (!video) return;
        if (video.change === 'added') {
          state.videos = currentVideos.filter((video) => video.baseOrder !== order);
        } else {
          state.changes = [...state.changes, video];
          state.videos = currentVideos.map((video) =>
            video.baseOrder === order ? { ...video, change: 'deleted' } : video
          );
        }
      } else {
        state.videos = currentVideos.filter((video) => video.baseOrder !== order);
      }
    },
    restoreScreenshot: (state, action: PayloadAction<number>) => {
      const order = action.payload;
      const previousChanges = state.changes.find((change) => change.baseOrder === order)?.change;

      if (previousChanges) {
        state.screenshots = state.screenshots.map((screenshot) =>
          screenshot.baseOrder === order ? { ...screenshot, change: previousChanges } : screenshot
        );
      }
    },
    restoreVideo: (state, action: PayloadAction<number>) => {
      const order = action.payload;
      const previousChanges = state.changes.find((change) => change.baseOrder === order)?.change;

      if (previousChanges) {
        state.videos = state.videos.map((video) =>
          video.baseOrder === order ? { ...video, change: previousChanges } : video
        );
      }
    },
    updateScreenshotOrder: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;

      state.screenshots
        .map((item) => (item.baseOrder === from ? { ...item, order: to } : item))
        .sort((a, b) => a.order - b.order);
    },
    updateVideoOrder: (state, action: PayloadAction<{ from: number; to: number }>) => {
      const { from, to } = action.payload;

      state.videos
        .map((item) => (item.baseOrder === from ? { ...item, order: to } : item))
        .sort((a, b) => a.order - b.order);
    },
    toggleScreenshotFeatured: (state, action: PayloadAction<number>) => {
      state.screenshots = state.screenshots.map((screenshot) =>
        screenshot.baseOrder === action.payload
          ? { ...screenshot, featured: !screenshot.featured }
          : screenshot
      );
    },
    resetMedia: (state) => {
      if (state.type === 'create') {
        state.screenshots = [];
        state.videos = [];
      } else {
        state.screenshots =
          state.gameToUpdate?.imageEntries.map((image) => ({
            id: nanoid(),
            image: image.link,
            featured: image.featured,
            baseOrder: image.order,
            order: image.order,
            change: 'unchanged',
          })) ?? [];

        state.videos =
          state.gameToUpdate?.videoEntries.map((video) => ({
            id: nanoid(),
            video: video.link,
            poster: video.posterLink,
            baseOrder: video.order,
            order: video.order,
            change: 'unchanged',
          })) ?? [];
      }

      state.changes = [];
      state.duplicateOrders = [];
      state.cachedVideoFile = null;
    },
    updateChanges: (state, action: PayloadAction<(Screenshot | Video)[]>) => {
      state.changes = action.payload;
    },
    updateDuplicateOrders: (state, action: PayloadAction<number[]>) => {
      state.duplicateOrders = action.payload;
    },
    updateCachedVideoFile: (state, action: PayloadAction<File | null>) => {
      state.cachedVideoFile = action.payload;
    },

    updatePrice: (state, action: PayloadAction<string>) => {
      state.pricing.price = action.payload;
    },
    toggleFree: (state) => {
      state.pricing.free = !state.pricing.free;
    },

    updateTags: (state, action: PayloadAction<number[]>) => {
      state.tags = action.payload;
    },
    updateFeatures: (state, action: PayloadAction<number[]>) => {
      state.features = action.payload;
    },
    updateLanguages: (state, action: PayloadAction<string[]>) => {
      const updatedLanguages = action.payload.map((name) => {
        // Find the existing language object if it exists
        const existingLanguage = state.languages.find((lang) => lang.name === name);

        // If it exists, retain its properties; otherwise, set default properties
        return existingLanguage ?? { name, interface: false, fullAudio: false, subtitles: false };
      });

      state.languages = updatedLanguages;
    },
    toggleLanguageField: (
      state,
      action: PayloadAction<{ name: string; field: keyof Language; value: boolean }>
    ) => {
      const { name, field, value } = action.payload;
      state.languages = state.languages.map((lang) =>
        lang.name === name ? { ...lang, [field]: value } : lang
      );
    },
    togglePlatform: (state, action: PayloadAction<'win' | 'mac'>) => {
      state.platforms[action.payload] = !state.platforms[action.payload];
    },

    toggleRequired64bit: (state) => {
      state.systemRequirements.req64 = !state.systemRequirements.req64;
    },
    updateMiniOS: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.os = action.payload;
    },
    updateMiniCPU: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.cpu = action.payload;
    },
    updateMiniRAM: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.ram = action.payload;
    },
    updateMiniGPU: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.gpu = action.payload;
    },
    updateMiniDX: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.dx = action.payload;
    },
    updateMiniNetwork: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.network = action.payload;
    },
    updateMiniStorage: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.storage = action.payload;
    },
    updateMiniSoundCard: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.soundCard = action.payload;
    },
    updateMiniVrSupport: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.vrSupport = action.payload;
    },
    updateMiniAdditionalNotes: (state, action: PayloadAction<string>) => {
      state.systemRequirements.mini.additionalNotes = action.payload;
    },
    updateRecommendedOS: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.os = action.payload;
    },
    updateRecommendedCPU: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.cpu = action.payload;
    },
    updateRecommendedRAM: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.ram = action.payload;
    },
    updateRecommendedGPU: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.gpu = action.payload;
    },
    updateRecommendedDX: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.dx = action.payload;
    },
    updateRecommendedNetwork: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.network = action.payload;
    },
    updateRecommendedStorage: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.storage = action.payload;
    },
    updateRecommendedSoundCard: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.soundCard = action.payload;
    },
    updateRecommendedVrSupport: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.vrSupport = action.payload;
    },
    updateRecommendedAdditionalNotes: (state, action: PayloadAction<string>) => {
      state.systemRequirements.recommended.additionalNotes = action.payload;
    },

    updateLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    updateAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload;
    },
    toggleMature: (state) => {
      state.mature = !state.mature;
    },
    updateMatureDescription: (state, action: PayloadAction<string>) => {
      state.matureDescription = action.payload;
    },
    updateLegal: (state, action: PayloadAction<string>) => {
      state.legal = action.payload;
    },

    setIsUpdateFetching: (state, action: PayloadAction<boolean>) => {
      state.isUpdateFetching = action.payload;
    },
    setIsGameUpdateInitialized: (state, action: PayloadAction<boolean>) => {
      state.isGameUpdateInitialized = action.payload;
    },

    setPage: (state, action: PayloadAction<GameAdminState['currentPage']>) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      const currentIndex = pageOrder.indexOf(state.currentPage);
      if (currentIndex >= 0 && currentIndex < pageOrder.length - 1) {
        state.currentPage = pageOrder[currentIndex + 1];
      }
    },
    prevPage: (state) => {
      const currentIndex = pageOrder.indexOf(state.currentPage);
      if (currentIndex > 0) {
        state.currentPage = pageOrder[currentIndex - 1];
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPosterModalOpen: (state, action: PayloadAction<boolean>) => {
      state.posterModalOpen = action.payload;
    },
    setDuplicateError: (state, action: PayloadAction<boolean>) => {
      state.duplicateError = action.payload;
    },

    reset: (state) => {
      if (state.type === 'create') {
        return gameAdminState;
      } else {
        return {
          ...gameAdminState,
          type: 'update',
          gameToUpdate: state.gameToUpdate,
        };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPreviewData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPreviewData.fulfilled, (state, action) => {
        state.previewData = action.payload;
        state.loading = false;
        state.currentPage = 'preview';
      })
      .addCase(getPreviewData.rejected, (state) => {
        state.loading = false;
      })

      .addCase(submitForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Listener actions
export const initializeGameUpdate = createAction<number>('admin/game/initializeGameUpdate');

export const {
  setType,
  setGameToUpdate,
  setUpdateFormInitialValues,
  updateName,
  updateCategory,
  updateDescription,
  updateReleaseDate,
  toggleFeatured,
  updatePublishers,
  updateDevelopers,
  updateThumbnails,
  addScreenshot,
  addVideo,
  removeScreenshot,
  removeVideo,
  restoreScreenshot,
  restoreVideo,
  updateScreenshotOrder,
  updateVideoOrder,
  toggleScreenshotFeatured,
  resetMedia,
  updateChanges,
  updateDuplicateOrders,
  updateCachedVideoFile,
  updatePrice,
  toggleFree,
  updateTags,
  updateFeatures,
  updateLanguages,
  toggleLanguageField,
  togglePlatform,
  toggleRequired64bit,
  updateMiniOS,
  updateMiniCPU,
  updateMiniRAM,
  updateMiniGPU,
  updateMiniDX,
  updateMiniNetwork,
  updateMiniStorage,
  updateMiniSoundCard,
  updateMiniVrSupport,
  updateMiniAdditionalNotes,
  updateRecommendedOS,
  updateRecommendedCPU,
  updateRecommendedRAM,
  updateRecommendedGPU,
  updateRecommendedDX,
  updateRecommendedNetwork,
  updateRecommendedStorage,
  updateRecommendedSoundCard,
  updateRecommendedVrSupport,
  updateRecommendedAdditionalNotes,
  updateLink,
  updateAbout,
  toggleMature,
  updateMatureDescription,
  updateLegal,
  setIsUpdateFetching,
  setIsGameUpdateInitialized,
  setPage,
  nextPage,
  prevPage,
  setLoading,
  setPosterModalOpen,
  setDuplicateError,
  reset,
} = gameAdminSlice.actions;
export default gameAdminSlice;
