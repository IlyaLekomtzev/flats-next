import type { IFilterValues, IFiltersRequest, IFiltersResponseData } from '@/types/filters';
import qs from 'qs';

export const prepareFiltersRequestQuery = (
  filtersValues: IFilterValues | null,
  filtersData: IFiltersResponseData | null,
) => {
  const requestData: IFiltersRequest = {
    per_page: filtersValues?.per_page,
  };

  if (filtersValues?.projects && filtersValues?.projects?.length > 0) {
    requestData.f = {
      ...requestData.f,
      projects: filtersValues.projects,
    };
  }

  if (filtersValues?.rooms && filtersValues?.rooms?.length > 0) {
    requestData.f = {
      ...requestData.f,
      rooms: filtersValues.rooms,
    };
  }

  const priceMin = filtersValues?.price?.[0];
  const priceMax = filtersValues?.price?.[1];

  if (priceMin !== undefined && priceMax !== undefined
    && (priceMin !== filtersData?.price.min_range || priceMax !== filtersData.price.max_range)
  ) {
    requestData.f = {
      ...requestData.f,
      price: {
        min: priceMin,
        max: priceMax,
      },
    };
  }

  const squareMin = filtersValues?.square?.[0];
  const squareMax = filtersValues?.square?.[1];

  if (squareMin !== undefined && squareMax !== undefined
    && (squareMin !== filtersData?.square.min_range || squareMax !== filtersData.square.max_range)
  ) {
    requestData.f = {
      ...requestData.f,
      square: {
        min: squareMin,
        max: squareMax,
      },
    };
  }

  return qs.stringify(
    requestData,
    {
      encodeValuesOnly: true,
    },
  );
};
