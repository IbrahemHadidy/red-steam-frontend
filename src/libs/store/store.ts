// Redux
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// Slices
import authSlice from './features/auth/authSlice';

import cartSlice from './features/shop/cart/cartSlice';
import checkoutSlice from './features/shop/checkout/checkoutSlice';
import librarySlice from './features/shop/library/librarySlice';
import wishlistSlice from './features/shop/wishlist/wishlistSlice';

import loginSlice from './features/user/login/loginSlice';
import recoverySlice from './features/user/recovery/recoverySlice';
import userSettingsSlice from './features/user/settings/userSettingsSlice';
import signupSlice from './features/user/signup/signupSlice';
import userTagsSlice from './features/user/tags/userTagsSlice';

import gameSlice from './features/game/gameSlice';

import searchSlice from './features/search/searchSlice';

import gameAdminSlice from './features/admin/game/gameAdminSlice';

// Listeners
import authListener from './features/auth/authListener';

import cartListener from './features/shop/cart/cartListener';
import libraryListener from './features/shop/library/libraryListener';
import wishlistListener from './features/shop/wishlist/wishlistListener';

import recoveryListener from './features/user/recovery/recoveryListener';
import userSettingsListener from './features/user/settings/userSettingsListener';
import signupListener from './features/user/signup/signupListener';
import userTagsListener from './features/user/tags/userTagsListener';

import gameListener from './features/game/gameListener';

import searchListener from './features/search/searchListener';

import gameAdminListener from './features/admin/game/gameAdminListener';

// APIs
import ipBaseApi from './apis/countries/countryCode';

import developerApi from './apis/common/developers';
import featureApi from './apis/common/features';
import languageApi from './apis/common/languages';
import publisherApi from './apis/common/publishers';
import reviewApi from './apis/common/reviews';
import tagApi from './apis/common/tags';

import gameAdminApi from './apis/game/admin';
import gameDataApi from './apis/game/data';
import gameOfferApi from './apis/game/offer';

import userAdminApi from './apis/user/admin';
import userAuthApi from './apis/user/auth';
import userInteractionApi from './apis/user/interaction';
import userManagementApi from './apis/user/management';
import userPaymentApi from './apis/user/payment';
import userPhoneApi from './apis/user/phone';

// Types
import type { Action, ThunkAction } from '@reduxjs/toolkit';

//--------------------------- Combined Reducers ---------------------------//
const userReducer = combineReducers({
  login: loginSlice.reducer,
  recovery: recoverySlice.reducer,
  signup: signupSlice.reducer,
  settings: userSettingsSlice.reducer,
  tags: userTagsSlice.reducer,
});

const shopReducer = combineReducers({
  cart: cartSlice.reducer,
  checkout: checkoutSlice.reducer,
  library: librarySlice.reducer,
  wishlist: wishlistSlice.reducer,
});

const adminReducer = combineReducers({
  game: gameAdminSlice.reducer,
});

//--------------------------- Store Configuration --------------------------//
const store = configureStore({
  reducer: {
    // Slices
    auth: authSlice.reducer,
    user: userReducer,
    shop: shopReducer,
    game: gameSlice.reducer,
    search: searchSlice.reducer,
    admin: adminReducer,

    // APIs
    [ipBaseApi.reducerPath]: ipBaseApi.reducer,

    [developerApi.reducerPath]: developerApi.reducer,
    [publisherApi.reducerPath]: publisherApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [languageApi.reducerPath]: languageApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,

    [gameAdminApi.reducerPath]: gameAdminApi.reducer,
    [gameDataApi.reducerPath]: gameDataApi.reducer,
    [gameOfferApi.reducerPath]: gameOfferApi.reducer,

    [userAdminApi.reducerPath]: userAdminApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [userInteractionApi.reducerPath]: userInteractionApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [userPhoneApi.reducerPath]: userPhoneApi.reducer,
    [userPaymentApi.reducerPath]: userPaymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(
        // Listener Middlewares
        authListener.middleware,

        recoveryListener.middleware,
        signupListener.middleware,
        userSettingsListener.middleware,
        userTagsListener.middleware,

        cartListener.middleware,
        wishlistListener.middleware,
        libraryListener.middleware,

        gameListener.middleware,

        searchListener.middleware,

        gameAdminListener.middleware
      )
      .concat(
        // API Middlewares
        ipBaseApi.middleware,

        developerApi.middleware,
        publisherApi.middleware,
        featureApi.middleware,
        languageApi.middleware,
        tagApi.middleware,
        reviewApi.middleware,

        gameAdminApi.middleware,
        gameDataApi.middleware,
        gameOfferApi.middleware,

        userAdminApi.middleware,
        userAuthApi.middleware,
        userInteractionApi.middleware,
        userManagementApi.middleware,
        userPhoneApi.middleware,
        userPaymentApi.middleware
      ),
});

//--------------------------- Store Export ---------------------------------//
const makeStore = () => store;
export default makeStore;

//--------------------------- Store Types ----------------------------------//
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
