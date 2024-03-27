import { LabelLayout } from '@/components/layouts/LabelLayout';
import { RangeInput, type RangeValuesType } from '@/components/ui/RangeInput';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useLoading } from '@/hooks/useLoading';
import { IFiltersRange } from '@/types/filters';
import { formatMoney, getMaxValue, getMinValue } from '@/utils';
import type { FC } from 'react';

interface Props {
  priceFilters: IFiltersRange;
}

export const PriceFilter: FC<Props> = ({ priceFilters }) => {
  const [pageQuery, setPageQuery] = useFiltersQuery();
  const prices = (pageQuery.price || []) as [number, number];

  const isLoading = useLoading();

  const from = getMinValue(prices[0], priceFilters.min, priceFilters.max);
  const to = getMaxValue(prices[1], priceFilters.min, priceFilters.max);

  const handleChange = (values: RangeValuesType) => {
    setPageQuery({
      price: values,
    });
  };

  return (
    <LabelLayout label="Стоимость">
      <RangeInput
        formatValue={formatMoney}
        onChange={handleChange}
        from={from}
        to={to}
        step={1}
        min={priceFilters.min_range}
        max={priceFilters.max_range}
        disabled={isLoading}
      />
    </LabelLayout>
  );
};
