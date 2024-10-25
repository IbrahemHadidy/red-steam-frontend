// Redux
import { createAsyncThunk } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector, useStore } from 'react-redux';

// Types
import type { AppDispatch, AppStore, RootState } from './store';

// Typed useDispatch hook for dispatching actions, including typed thunks
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook for selecting state with shallow equality for better performance
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
  useSelector<RootState, TSelected>(selector, shallowEqual);

// Typed useStore hook for accessing the store with its types
export const useAppStore = () => useStore<AppStore>();

// Utility function to create typed async thunks for actions
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
