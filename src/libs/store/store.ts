// Redux
import { configureStore } from '@reduxjs/toolkit';

// Slices
import authSlice from './features/auth/authSlice';
import cartSlice from './features/shop/cart/cartSlice';
import checkoutSlice from './features/shop/checkout/checkoutSlice';
import librarySlice from './features/shop/library/librarySlice';
import wishlistSlice from './features/shop/wishlist/wishlistSlice';
import loginSlice from './features/user/login/loginSlice';
import recoverySlice from './features/user/recovery/recoverySlice';
import signupSlice from './features/user/signup/signupSlice';

// Listeners
import authListener from './features/auth/authListeners';
import cartListener from './features/shop/cart/cartListeners';
import libraryListener from './features/shop/library/libraryListeners';
import wishlistListener from './features/shop/wishlist/wishlistListeners';
import recoveryListener from './features/user/recovery/recoveryListeners';
import signupListener from './features/user/signup/signupListeners';

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

// Types
import type { Action, ThunkAction } from '@reduxjs/toolkit';

// Configure Store
const store = configureStore({
  reducer: {
    // Slices
    auth: authSlice.reducer,

    login: loginSlice.reducer,
    recovery: recoverySlice.reducer,
    signup: signupSlice.reducer,

    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    wishlist: wishlistSlice.reducer,
    library: librarySlice.reducer,

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
    [userPaymentApi.reducerPath]: userPaymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // Listener Middlewares
        authListener.middleware,
        recoveryListener.middleware,
        signupListener.middleware,
        cartListener.middleware,
        wishlistListener.middleware,
        libraryListener.middleware
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
        userPaymentApi.middleware
      ),
});

// Create Store and export it
export const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
