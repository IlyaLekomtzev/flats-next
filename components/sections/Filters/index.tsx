/* eslint-disable react/require-default-props */

import { PriceFilter } from '@/components/filters/PriceFilter';
import { ProjectsFilter } from '@/components/filters/ProjectsFilter';
import { RoomsFilter } from '@/components/filters/RoomsFilter';
import { SquareFilter } from '@/components/filters/SquareFilter';
import { FilterIcon } from '@/components/icons/FilterIcon';
import { RefreshIcon } from '@/components/icons/RefreshIcon';
import { ModalLayout } from '@/components/layouts/ModalLayout';
import { Button } from '@/components/ui/Button';
import { useAppSelector } from '@/hooks/redux';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useLoading } from '@/hooks/useLoading';
import { selectFiltersData } from '@/store/filters/selectors';
import { selectFlatsData } from '@/store/flats/selectors';
import { useMediaQuery } from '@uidotdev/usehooks';
import { type FC, useState, useMemo } from 'react';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const [, setPageQuery] = useFiltersQuery();

  const isLargeDevice = useMediaQuery('only screen and (min-width : 768px)');
  const [modalIsVisible, setModalIsVisible] = useState(true);

  const { meta } = useAppSelector(selectFlatsData);
  const { filtersData } = useAppSelector(selectFiltersData);
  const isLoading = useLoading();

  const handleOpenModal = () => setModalIsVisible(true);

  const handleCloseModal = () => setModalIsVisible(false);

  const handleReset = () => setPageQuery({
    projects: [],
    rooms: [],
    price: [],
    square: [],
    perPage: undefined,
  });

  const content = useMemo(() => (
    <section className={`w-full pb-[64px] lg:border-b border-grey ${className || ''}`}>
      <h4 className="w-full lg:hidden mb-[32px]">
        Фильтр
      </h4>
      {!!filtersData && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[20px] mb-[48px]">
          <ProjectsFilter projectsFilters={filtersData.projects} />
          <RoomsFilter roomsFilters={filtersData.rooms} />
          <PriceFilter priceFilters={filtersData.price} />
          <SquareFilter squareFilters={filtersData.square} />
        </div>
      )}
      <Button className="w-full lg:hidden" onClick={handleCloseModal} disabled={isLoading}>
        {isLoading ? 'Загрузка..' : 'Смотреть квартиры'}
      </Button>
      <div className="w-full hidden lg:flex justify-center relative">
        <span className="font-ev font-normal text-md text-black">
          {isLoading ? 'Загрузка..' : `Найдено ${meta?.total || 0} квартир`}
        </span>
        <button type="button" disabled={isLoading} className="absolute right-0 flex items-center justify-end gap-[12px]" onClick={handleReset}>
          <RefreshIcon />
          <span className="font-ev font-normal text-md text-black">Очистить всё</span>
        </button>
      </div>
    </section>
  ), [className, filtersData, isLoading, meta?.total]);

  if (isLargeDevice) {
    return content;
  }

  return (
    <div className="w-full mb-[48px]">
      <Button className="w-full" icon={<FilterIcon />} onClick={handleOpenModal}>Фильтр</Button>
      <ModalLayout isVisible={modalIsVisible} onClose={handleCloseModal}>
        {content}
      </ModalLayout>
    </div>
  );
};
