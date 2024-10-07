// Redux
import { createAsyncThunk, createListenerMiddleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore, shallowEqual } from 'react-redux';

// Types
import type { AppDispatch, AppStore, RootState } from './store';


// Typed useDispatch hook for dispatching actions, including typed thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook for selecting state with shallow equality for better performance
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
  useSelector<RootState, TSelected>(selector, shallowEqual);

// Memoized selector for optimized performance when selecting derived state
export const useMemoizedSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector, shallowEqual);

// Typed useStore hook for accessing the store with its types
export const useAppStore = () => useStore<AppStore>();

// Utility function to create typed async thunks for actions
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();

// Utility function to create typed listener middleware for handling side effects
export const createAppListener = createListenerMiddleware().startListening.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
