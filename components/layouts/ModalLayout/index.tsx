/* eslint-disable react/require-default-props */

import { CloseIcon } from '@/components/icons/CloseIcon';
import type { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onClose?: () => void;
}

export const ModalLayout: FC<Props> = ({ isVisible, children, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return createPortal(
    <div className="w-full h-full fixed overflow-y-auto top-0 left-0 right-0 bottom-0 z-50 bg-white p-[20px]">
      <div className="w-full flex justify-end">
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>,
    document.body,
  );
};
