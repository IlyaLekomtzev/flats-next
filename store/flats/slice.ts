/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { IFlatItem, IFlatsResponseMeta } from '@/types/flats';
import { getFlats } from './async';

interface IFlatsState {
  items: IFlatItem[];
  meta: IFlatsResponseMeta | null;
  isLoading: boolean;
}

const initialState: IFlatsState = {
  items: [],
  meta: null,
  isLoading: false,

};

export const flatsSlice = createSlice({
  name: 'flats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFlats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFlats.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.meta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getFlats.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default flatsSlice.reducer;
