import { LabelLayout } from '@/components/layouts/LabelLayout';
import { Button } from '@/components/ui/Button';
import { useFiltersQuery } from '@/hooks/useFiltersQuery';
import { useLoading } from '@/hooks/useLoading';
import type { IFiltersRoom } from '@/types/filters';
import type { FC } from 'react';

interface Props {
  roomsFilters: IFiltersRoom[];
}

export const RoomsFilter: FC<Props> = ({ roomsFilters }) => {
  const [pageQuery, setPageQuery] = useFiltersQuery();
  const rooms = (pageQuery.rooms || []) as number[];

  const isLoading = useLoading();

  if (!roomsFilters.length) {
    return null;
  }

  const handleClick = (number: number) => () => {
    setPageQuery({
      rooms: rooms.includes(number) ? rooms.filter((item) => item !== number) : [...rooms, number],
    });
  };

  return (
    <LabelLayout label="Укажите количество комнат">
      <div className="w-full flex flex-wrap gap-[20px]">
        {roomsFilters.toSorted((a, b) => a.number - b.number).map((room) => {
          const isActive = rooms.includes(room.number);

          return (
            <Button
              key={room.number}
              outline={!isActive}
              disabled={isLoading || room.disabled}
              className="p-[16px] lg:px-[24px] rounded-base font-ev font-normal"
              onClick={handleClick(room.number)}
            >
              {room.number === 0 ? 'Ст' : `${room.number}к`}
            </Button>
          );
        })}
      </div>
    </LabelLayout>
  );
};
