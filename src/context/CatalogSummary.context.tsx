import { ReactNode, useEffect, useState } from 'react';

import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { createContext } from '~/lib/utils/context';

const CONSTANTS = {
  DATA_MOMENT_PAUSE: 5000,
  CONFIRM_TIRE_SIZE_PAUSE: 3500,
};

async function pause(pauseTime = 2000) {
  await new Promise((resolve) => setTimeout(resolve, pauseTime));
}

export interface CatalogSummaryContextProps {
  catalogSummary: SiteCatalogSummary;
  contentStage: STAGES;
  isSearch: boolean; // TODO: remove?
  setNewContent(): void;
  setStage(stage: STAGES): void;
  stage: STAGES;
  useTransitions: boolean;
}

const CatalogSummaryContext = createContext<CatalogSummaryContextProps>();

interface SetupProps {
  catalogSummaryResponse: SiteCatalogSummary;
  isSearch: boolean;
  numberOfProducts: number;
}

// TODO: tests
function getDefaults({
  hasResults,
  isSearch,
}: {
  hasResults: boolean;
  isSearch: boolean;
}): {
  defaultStage: STAGES;
  defaultUseTransitions: boolean;
} {
  // default to LOADING (fetching local data)
  let defaultStage = STAGES.LOADING;
  let defaultUseTransitions = false;

  // if we have local data already, go staight into relevant stage
  if (isSearch) {
    defaultStage = hasResults ? STAGES.BUILD_IN : STAGES.NO_RESULTS;
    defaultUseTransitions = hasResults ? true : false;
  }

  return {
    defaultStage,
    defaultUseTransitions,
  };
}

// TODO: Exported for testing only
export function useContextSetup({
  catalogSummaryResponse,
  isSearch,
  numberOfProducts,
}: SetupProps) {
  const hasResults = numberOfProducts > 0;
  const mustShowPrompt =
    catalogSummaryResponse.siteCatalogSummaryPrompt?.mustShow;
  const { defaultStage, defaultUseTransitions } = getDefaults({
    hasResults,
    isSearch,
  });

  const [stage, setStage] = useState<STAGES>(defaultStage);
  const [contentStage, setContentStage] = useState<STAGES>(stage);

  const [useTransitions] = useState<boolean>(defaultUseTransitions);

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
      if (mustShowPrompt) {
        setStage(hasResults ? STAGES.DATA_MOMENT : STAGES.NO_RESULTS);
      } else {
        setStage(STAGES.TOP_PICKS);
      }
      setIsLoadingData(false);
    };

    getLocalData();
  }, [hasResults, mustShowPrompt, isLoadingData]);

  // Pause on the build-in screen to show the casino animation,
  // before transitioning to the data moment
  useEffect(() => {
    if (stage !== STAGES.BUILD_IN) {
      return;
    }

    const pauseLength = mustShowPrompt
      ? CONSTANTS.CONFIRM_TIRE_SIZE_PAUSE
      : CONSTANTS.DATA_MOMENT_PAUSE;
    const timeout = setTimeout(() => {
      setStage(STAGES.DATA_MOMENT);
    }, pauseLength);

    return () => {
      clearTimeout(timeout);
    };
  }, [mustShowPrompt, stage]);

  return {
    catalogSummary: catalogSummaryResponse,
    contentStage,
    isSearch,
    numberOfProducts,
    setNewContent: () => {
      // Called after the previous content message exit transition
      setContentStage(stage);
    },
    setStage,
    stage,
    useTransitions,
  };
}

export function CatalogSummaryContextProvider({
  catalogSummaryResponse,
  children,
  isSearch,
  numberOfProducts,
}: {
  catalogSummaryResponse: SiteCatalogSummary;
  children: ReactNode;
  isSearch: boolean;
  numberOfProducts: number;
}) {
  const value = useContextSetup({
    catalogSummaryResponse,
    isSearch,
    numberOfProducts,
  });
  return (
    <CatalogSummaryContext.Provider value={value}>
      {children}
    </CatalogSummaryContext.Provider>
  );
}

export const useCatalogSummaryContext = CatalogSummaryContext.useContext;
