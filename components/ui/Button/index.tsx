/* eslint-disable react/require-default-props */

import type {
  FC, MouseEventHandler, PropsWithChildren, ReactNode,
} from 'react';

interface Props extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  outline?: boolean;
  icon?: ReactNode;
}

export const Button: FC<Props> = ({
  children, className, outline, onClick, icon, ...props
}) => {
  const varianClassNames = outline ? 'bg-white text-black border-black' : 'bg-blue border-blue text-white';

  return (
    <button
      type="button"
      className={`p-[12px] lg:p-[16px] flex items-center justify-center gap-[6px] text-sm rounded-[5px] disabled:opacity-75 border ${varianClassNames} ${className || ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
};
