/* eslint-disable react/require-default-props */

import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectFlatsData } from '@/store/flats/selectors';
import { Button } from '@/components/ui/Button';
import { LIST_ITEMS_COUNT } from '@/constants';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { FlatCard } from './FlatCard';

interface Props {
  className?: string;
}

export const FlatsList: FC<Props> = ({ className }) => {
  const { items, meta, isLoading } = useAppSelector(selectFlatsData);
  const [, setPageQuery] = useFiltersQuery();

  const handleLoadMore = () => {
    setPageQuery({
      perPage: (meta?.per_page || 0) + LIST_ITEMS_COUNT,
    });
  };

  if (!items.length) {
    if (isLoading) {
      return <span className="font-ev font-normal text-md text-black">Загрузка..</span>;
    }

    return <span className="font-ev font-normal text-md text-black">Ничего не найдено</span>;
  }

  return (
    <section className={`w-full flex flex-col items-center gap-[24px] lg:gap-[64px] ${className || ''}`}>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-[20px] gap-y-[10px] lg:gap-y-[48px]">
        {items.map((item) => <FlatCard key={item.id} data={item} />)}
      </div>
      {!!meta && meta.current_page < meta.last_page && (
        <Button className="w-full max-w-[580px]" disabled={isLoading} onClick={handleLoadMore}>
          {`Показать еще ${LIST_ITEMS_COUNT} из ${meta.total - meta.per_page}`}
        </Button>
      )}
    </section>
  );
};
