/* eslint-disable import/no-cycle */

import { configureStore } from '@reduxjs/toolkit';
import flatsReducer from './flats/slice';
import filtersReducer from './filters/slice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    flats: flatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
