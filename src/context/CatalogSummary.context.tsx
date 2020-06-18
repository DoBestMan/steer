import { ReactNode, useEffect, useState } from 'react';

import { PAGE_TRANSITION_DURATION } from '~/components/modules/App/App.constants';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { createContext } from '~/lib/utils/context';

const BUILD_IN_PAUSE = 4000;

async function pause(pauseTime = 2000) {
  await new Promise((resolve) => setTimeout(resolve, pauseTime));
}

export interface CatalogSummaryContextProps {
  catalogSummary: SiteCatalogSummary;
  contentStage: STAGES;
  isSearch: boolean;
  setNewContent(): void;
  setStage(stage: STAGES): void;
  showLoadingInterstitial: boolean;
  stage: STAGES;
}

const CatalogSummaryContext = createContext<CatalogSummaryContextProps>();

interface SetupProps {
  catalogSummaryResponse: SiteCatalogSummary;
  isSearch: boolean;
  numberOfProducts: number;
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

  /**
   * The `stage` state is used to determine which content to display.
   * The `contentStage` matches the `stage` state but on a delay which
   * allows for the Content component to fade out/back in during the
   * transition of the vehicle svg.
   */
  const [stage, setStage] = useState<STAGES>(STAGES.LOADING);
  const [contentStage, setContentStage] = useState<STAGES>(stage);

  // If deep-linking in, or the local data has no results, we skip
  // the loading interstitial and show the relevant stage without
  // CSS transitions.
  const [showLoadingInterstitial] = useState<boolean>(isSearch && hasResults);

  // If local data does not exist, show loading indicator
  const [isLoadingData, setIsLoadingData] = useState<boolean>(!isSearch);

  /**
   * There will always be a LOADING stage when the user lands on the
   * Catalog page.
   * - If local data does not exist, show the LOADING stage until
   *   local data has been fetched. In this use case, we then skip the
   *   loading interstitial and the page loads at the relevant step.
   * - If local data does exist (e.g. the user is coming from the
   *   Search), show the LOADING stage for the duration of the global
   *   page transition (e.g. until the Nav has transitioned back
   *   into place).
   */
  useEffect(() => {
    if (stage !== STAGES.LOADING) {
      return;
    }

    const getLocalData = async () => {
      // TEMP: pause to retrieve local data
      await pause();
      // Once we have local results, jump to relevant step
      if (mustShowPrompt) {
        setStage(hasResults ? STAGES.DATA_MOMENT : STAGES.NO_RESULTS);
      } else {
        setStage(STAGES.TOP_PICKS);
      }
      setIsLoadingData(false);
    };

    let loadingTimeout: ReturnType<typeof setTimeout> | null = null;

    if (isLoadingData) {
      getLocalData();
    } else {
      loadingTimeout = setTimeout(
        () => {
          setStage(hasResults ? STAGES.BUILD_IN : STAGES.NO_RESULTS);
        },
        // TODO: adjust this duration based on transition from Search
        PAGE_TRANSITION_DURATION * 2,
      );
    }

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [hasResults, mustShowPrompt, isLoadingData, stage]);

  /**
   * During the BUILD_IN stage, the animation is paused to
   * show the build-in content (e.g. the Casino animation).
   * After the pause, the user is transitioned to the DATA_MOMENT.
   */
  useEffect(() => {
    if (stage !== STAGES.BUILD_IN) {
      return;
    }

    const timeout = setTimeout(() => {
      setStage(STAGES.DATA_MOMENT);
    }, BUILD_IN_PAUSE);

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
      // Called after the previous content message exit transition.
      // Brings `contentStage` back in alignment with `stage`.
      setContentStage(stage);
    },
    setStage,
    showLoadingInterstitial,
    stage,
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
