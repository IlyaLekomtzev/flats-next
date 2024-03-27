import { FlatsList } from '@/components/sections/FlatsList';
import { useAppDispatch } from '@/hooks/redux';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { getFilters } from '@/store/filters/async';
import { IFilterValues } from '@/types/filters';
import { getFlats } from '@/store/flats/async';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { LIST_ITEMS_COUNT } from '@/constants';

const Filters = dynamic(
  () => import('@/components/sections/Filters/dynamic'),
  { ssr: false },
);

const HomePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const [pageQuery] = useFiltersQuery();

  useEffect(() => {
    const newParams: IFilterValues = {
      projects: pageQuery?.projects?.map((item) => item) as number[] || [],
      rooms: pageQuery?.rooms?.map((item) => item) as number[] || [],
      price: pageQuery?.price?.[0] && pageQuery?.price?.[1]
        ? [pageQuery?.price?.[0], pageQuery?.price?.[1]]
        : undefined,
      square: pageQuery?.square?.[0] && pageQuery?.square?.[1]
        ? [pageQuery?.square?.[0], pageQuery?.square?.[1]]
        : undefined,
      per_page: pageQuery.perPage || LIST_ITEMS_COUNT,
    };

    const filtersPromise = dispatch(getFilters(newParams));
    const flatsPromise = dispatch(getFlats(newParams));

    return () => {
      filtersPromise.abort();
      flatsPromise.abort();
    };
  }, [pageQuery]);

  return (
    <main className="w-full container lg:py-[32px] py-[20px]">
      <header className="w-full mb-[48px]">
        <h4>
          Планировки
        </h4>
      </header>
      <Filters className="w-full mb-[48px]" />
      <FlatsList />
    </main>
  );
};

export default HomePage;
