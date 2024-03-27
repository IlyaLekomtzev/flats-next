import { LabelLayout } from '@/components/layouts/LabelLayout';
import { RangeInput, type RangeValuesType } from '@/components/ui/RangeInput';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useLoading } from '@/hooks/useLoading';
import type { IFiltersRange } from '@/types/filters';
import { getMaxValue, getMinValue } from '@/utils';
import type { FC } from 'react';

interface Props {
  squareFilters: IFiltersRange;
}

export const SquareFilter: FC<Props> = ({ squareFilters }) => {
  const [pageQuery, setPageQuery] = useFiltersQuery();
  const squares = (pageQuery.square || []) as [number, number];

  const isLoading = useLoading();

  const from = getMinValue(squares[0], squareFilters.min, squareFilters.max);
  const to = getMaxValue(squares[1], squareFilters.min, squareFilters.max);

  const handleChange = (values: RangeValuesType) => {
    setPageQuery({
      square: values,
    });
  };

  return (
    <LabelLayout label="Задайте площадь, м²">
      <RangeInput
        onChange={handleChange}
        from={from}
        to={to}
        step={0.1}
        min={squareFilters.min_range}
        max={squareFilters.max_range}
        disabled={isLoading}
      />
    </LabelLayout>
  );
};
