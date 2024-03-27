import {
  NumberParam, NumericArrayParam, useQueryParams, withDefault,
} from 'use-query-params';

export const useFiltersQuery = () => useQueryParams({
  projects: withDefault(NumericArrayParam, []),
  rooms: withDefault(NumericArrayParam, []),
  price: withDefault(NumericArrayParam, []),
  square: withDefault(NumericArrayParam, []),
  perPage: NumberParam,
});
