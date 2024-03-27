import type { IFiltersResponseData } from '@/types/filters';

export interface IFiltersState {
  filtersData: IFiltersResponseData | null;
  isLoading: boolean;
}
