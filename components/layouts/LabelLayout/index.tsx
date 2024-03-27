import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label: string;
}

export const LabelLayout: FC<Props> = ({ label, children }) => (
  <div className="w-full flex flex-col gap-y-[12px]">
    <span className="w-full font-ev font-normal text-md text-grey">{label}</span>
    <div className="w-full">{children}</div>
  </div>
);
