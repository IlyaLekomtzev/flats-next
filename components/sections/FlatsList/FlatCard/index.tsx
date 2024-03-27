import Image from 'next/image';
import type { FC } from 'react';
import { HeartIcon } from '@/components/icons/HeartIcon';
import type { IFlatItem } from '@/types/flats';
import { formatMoney } from '@/utils';

interface Props {
  data: IFlatItem;
}

export const FlatCard: FC<Props> = ({ data }) => {
  const title = data.studio ? 'Студия' : `${data.rooms}-комнатная`;

  return (
    <article className="w-full h-full flex flex-col gap-y-[30px] lg:gap-y-[52px] items-center py-[16px] lg:pt-[32px] lg:pb-[53px] px-[24px] lg:px-[40px] border border-black rounded-base">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-[8px]">
          <h6 className="text-sm">
            {`${title} ${data.square} м2`}
          </h6>

          <div className="flex gap-[20px] items-baseline flex-wrap">
            <span className="text-4xl font-semibold">{formatMoney(data.price)}</span>
            {!!data.old_price && <span className="line-through text-xs">{formatMoney(data.old_price)}</span>}
          </div>
        </div>
        <button type="button" className="w-[54px] h-[54px] flex items-center justify-center shrink-0 border border-black rounded-full">
          <HeartIcon />
        </button>
      </div>

      <div className="w-full h-[290px] relative">
        <Image
          alt="flat"
          src={data.image}
          style={{
            objectFit: 'contain',
          }}
          fill
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between py-[8px] border-b border-grey">
          <span className="font-ev font-normal text-grey">Проект</span>
          <span className="font-ev font-normal text-black">{data.project_title}</span>
        </div>
        <div className="w-full flex justify-between py-[8px] border-b border-grey">
          <span className="font-ev font-normal text-grey">Этаж</span>
          <span className="font-ev font-normal text-black">{data.floor}</span>
        </div>
        <div className="w-full flex justify-between py-[8px]">
          <span className="font-ev font-normal text-grey">Срок сдачи</span>
          <span className="font-ev font-normal text-black">{data.release_dates}</span>
        </div>
      </div>
    </article>
  );
};
