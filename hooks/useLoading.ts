import { selectFiltersData } from '@/store/filters/selectors';
import { selectFlatsData } from '@/store/flats/selectors';
import { useAppSelector } from './redux';

export const useLoading = () => {
  const { isLoading: filtersLoading } = useAppSelector(selectFiltersData);
  const { isLoading: flatsLoading } = useAppSelector(selectFlatsData);

  return filtersLoading || flatsLoading;
};
