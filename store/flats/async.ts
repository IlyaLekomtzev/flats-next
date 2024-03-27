/* eslint-disable import/no-cycle */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IFlatsResponse } from '@/types/flats';
import { API_URL } from '@/constants';
import type { RootState } from '@/store';
import type { IFilterValues } from '@/types/filters';
import { prepareFiltersRequestQuery } from '../filters/utils';

export const getFlats = createAsyncThunk<IFlatsResponse, IFilterValues | null>(
  'flats/get',
  async (params, { getState }) => {
    const { filtersData } = (getState() as RootState).filters;
    const query = prepareFiltersRequestQuery(params, filtersData);

    const { data } = await axios.get<IFlatsResponse>(`${API_URL}/flats?${query}`);
    return data;
  },
);
