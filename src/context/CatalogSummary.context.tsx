import { ReactNode, useEffect, useState } from 'react';

import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { createContext } from '~/lib/utils/context';

const CONSTANTS = {
  DATA_MOMENT_PAUSE: 5000,
  CONFIRM_TIRE_SIZE_PAUSE: 3500,
};

async function pause(pauseTime = 2000) {
  await new Promise((resolve) => setTimeout(resolve, pauseTime));
}

export interface CatalogSummaryContextProps {
  messageStage: STAGES;
  // setMessageStage(stage: STAGES): void;
  setNewMessage(): void;
  setStage(stage: STAGES): void;
  stage: STAGES;
}

const CatalogSummaryContext = createContext<CatalogSummaryContextProps>();

interface SetupProps {
  hasMultipleTireSizes: boolean;
  hasResults: boolean;
  isSearch: boolean;
}

// TODO: tests
function getDefaultStage({
  hasResults,
  isSearch,
}: Omit<SetupProps, 'hasMultipleTireSizes'>): STAGES {
  // default to LOADING (fetching local data)
  let stage = STAGES.LOADING;

  // if we have local data already, go staight into relevant stage
  if (isSearch) {
    stage = hasResults ? STAGES.BUILD_IN : STAGES.NO_RESULTS;
  }

  return stage;
}

// TODO: Exported for testing only
export function useContextSetup({
  hasMultipleTireSizes,
  hasResults,
  isSearch,
}: SetupProps) {
  const [stage, setStage] = useState<STAGES>(
    getDefaultStage({ hasResults, isSearch }),
  );
  const [messageStage, setMessageStage] = useState<STAGES>(stage);

  const [isLoadingData, setIsLoadingData] = useState<boolean>(
    stage === STAGES.LOADING,
  );

  // TEMP: pause to retrieve local data
  useEffect(() => {
    if (!isLoadingData) {
      return;
    }

    const getLocalData = async () => {
      await pause();
      // Once we have local results, jump to relevant step
      setStage(
        hasResults
          ? hasMultipleTireSizes
            ? STAGES.DATA_MOMENT
            : STAGES.TOP_PICKS
          : STAGES.NO_RESULTS,
      );
      setIsLoadingData(false);
    };

    getLocalData();
  }, [hasResults, hasMultipleTireSizes, isLoadingData]);

  // Pause on the build-in screen to show the casino animation,
  // before transitioning to the data moment
  useEffect(() => {
    if (stage !== STAGES.BUILD_IN) {
      return;
    }

    const pauseLength = hasMultipleTireSizes
      ? CONSTANTS.CONFIRM_TIRE_SIZE_PAUSE
      : CONSTANTS.DATA_MOMENT_PAUSE;
    const timeout = setTimeout(() => {
      setStage(STAGES.DATA_MOMENT);
    }, pauseLength);

    return () => {
      clearTimeout(timeout);
    };
  }, [hasMultipleTireSizes, stage]);

  return {
    isLoadingData,
    messageStage,
    // setMessageStage,
    setNewMessage: () => {
      // Called after the previous message exit transition
      setMessageStage(stage);
    },
    setStage,
    stage,
  };
}

export function CatalogSummaryContextProvider({
  children,
  hasMultipleTireSizes,
  hasResults,
  isSearch,
}: {
  children: ReactNode;
  hasMultipleTireSizes: boolean;
  hasResults: boolean;
  isSearch: boolean;
}) {
  const value = useContextSetup({ hasMultipleTireSizes, hasResults, isSearch });
  return (
    <CatalogSummaryContext.Provider value={value}>
      {children}
    </CatalogSummaryContext.Provider>
  );
}

export const useCatalogSummaryContext = CatalogSummaryContext.useContext;
