/* eslint-disable import/no-cycle */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constants';
import type { IFiltersResponse, IFilterValues } from '@/types/filters';
import type { RootState } from '@/store';
import { prepareFiltersRequestQuery } from './utils';

export const getFilters = createAsyncThunk<IFiltersResponse, IFilterValues | null>(
  'filters/get',
  async (params, { getState }) => {
    const { filtersData } = (getState() as RootState).filters;
    const query = prepareFiltersRequestQuery(params, filtersData);

    const { data } = await axios.get<IFiltersResponse>(`${API_URL}/filters?${query}`);
    return data;
  },
);
