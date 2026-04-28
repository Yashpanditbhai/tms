import React, { useEffect } from 'react';
import CloseButton from './CloseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
      <div className={`relative bg-white rounded-t-xl sm:rounded-xl shadow-xl ${maxWidth} w-full sm:mx-4 z-10 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between px-4 sm:px-6 pt-5 sm:pt-6 pb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
            <CloseButton onClick={onClose} />
          </div>
        )}
        <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
