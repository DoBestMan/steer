import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { TIME } from '~/lib/constants';
import { createContext } from '~/lib/utils/context';

export interface GlobalToastContextProps {
  globalToastMessage: JSX.Element | string;
  handleClearGlobalToastMessage: () => void;
  handleGlobalToastDismiss: () => void;
  handleShowTostOnNextPage: () => void;
  isGlobalToastOpen: boolean;
  setGlobalToastMessage: (message: JSX.Element | string) => void;
}

const GlobalToastContext = createContext<GlobalToastContextProps>();

function useGlobalToastContextSetup() {
  const [globalToastMessage, setGlobalToastMessage] = useState<
    JSX.Element | string
  >('');
  const [isGlobalToastOpen, setIsGlobalToastOpen] = useState(false);
  const [showToastOnNextPage, setShowToastOnNextPage] = useState(false);

  const router = useRouter();

  const prevMessage = useRef(globalToastMessage);

  function handleGlobalToastDismiss() {
    setIsGlobalToastOpen(false);
  }

  function handleClearGlobalToastMessage() {
    setGlobalToastMessage('');
  }

  function handleShowTostOnNextPage() {
    setShowToastOnNextPage(true);
  }

  const showGlobalToast = useCallback(() => {
    if (!prevMessage.current && globalToastMessage) {
      setIsGlobalToastOpen(true);
    }

    prevMessage.current = globalToastMessage;
    setShowToastOnNextPage(false);
  }, [globalToastMessage]);

  const showGlobalToastOnRouteChange = useCallback(() => {
    if (showToastOnNextPage) {
      window.scrollTo(0, 0);
      // Show the toast a little after the page loads so you can see it animate in
      setTimeout(() => {
        showGlobalToast();
      }, TIME.MS300);
    }
  }, [showToastOnNextPage, showGlobalToast]);

  useEffect(() => {
    // We don't always want to show the toast on the next page.
    // For example: in the case of an error, we'll want to display
    // it on the current page
    router.events.on('routeChangeComplete', showGlobalToastOnRouteChange);

    if (!showToastOnNextPage) {
      showGlobalToast();
    }

    return () => {
      router.events.off('routeChangeComplete', showGlobalToastOnRouteChange);
    };
  }, [
    router.events,
    showGlobalToast,
    showToastOnNextPage,
    showGlobalToastOnRouteChange,
  ]);

  return {
    globalToastMessage,
    handleClearGlobalToastMessage,
    handleGlobalToastDismiss,
    handleShowTostOnNextPage,
    isGlobalToastOpen,
    setGlobalToastMessage,
  };
}

interface Props {
  children: ReactNode;
}

export function GlobalToastContextProvider({ children }: Props) {
  const value = useGlobalToastContextSetup();
  return (
    <GlobalToastContext.Provider value={value}>
      {children}
    </GlobalToastContext.Provider>
  );
}

export const useGlobalToastContext = GlobalToastContext.useContext;
