import { useEffect, useRef, useState } from 'react';

import { TOAST_TYPE } from './Toast';

export function useToastManager() {
  const [toastMessage, setToastMessage] = useState<TOAST_TYPE | string>('');
  const [isOpen, setIsToastOpen] = useState(false);
  function handleClearMessage() {
    setToastMessage('');
  }
  function handleDismiss() {
    setIsToastOpen(false);
  }

  const prevMessage = useRef(toastMessage);
  useEffect(() => {
    if (!prevMessage.current && toastMessage) {
      setIsToastOpen(true);
    }

    prevMessage.current = toastMessage;
  }, [toastMessage, isOpen]);

  return {
    handleClearMessage,
    handleDismiss,
    isOpen,
    setToastMessage,
    toastMessage,
  };
}
