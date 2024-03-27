/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */

import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { getFilters } from './async';
import type { IFiltersState } from './types';

const initialState: IFiltersState = {
  filtersData: null,
  isLoading: false,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilters.fulfilled, (state, action) => {
      if (!isEqual(state.filtersData, action.payload.data)) {
        state.filtersData = action.payload.data;
      }
      state.isLoading = false;
    });
    builder.addCase(getFilters.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default filtersSlice.reducer;
