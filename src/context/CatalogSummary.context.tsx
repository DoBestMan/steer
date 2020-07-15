import { ReactNode, useEffect, useState } from 'react';

import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { createContext } from '~/lib/utils/context';

const BUILD_IN_PAUSE = 4000;

export interface CatalogSummaryContextProps {
  contentStage: STAGES;
  isLocalDataByDefault: boolean;
  setNewContent(): void;
  setStage(stage: STAGES): void;
  showLoadingInterstitial: boolean;
  siteCatalogSummary: SiteCatalogSummary;
  stage: STAGES;
}

const CatalogSummaryContext = createContext<CatalogSummaryContextProps>();

interface SetupProps {
  comesFromSearch: boolean;
  hasLocalData: boolean;
  siteCatalogSummary: SiteCatalogSummary;
}

// TODO: Exported for testing only
export function useContextSetup({
  hasLocalData,
  siteCatalogSummary,
  comesFromSearch,
}: SetupProps) {
  const totalResult =
    siteCatalogSummary.siteCatalogSummaryMeta?.totalResults || 0;
  const hasPromptMustShow =
    siteCatalogSummary.siteCatalogSummaryPrompt?.mustShow;
  const hasPromptCTAList = !!siteCatalogSummary.siteCatalogSummaryPrompt
    ?.ctaList?.length;
  /**
   * Disambiguation response also has 0 results, but user should see the
   * loading interstitial. Therefore, only show the NO_RESULTS stage if
   * there are no CTA objects are present in the `ctaList`
   */
  const hasNoResults = totalResult === 0 && !hasPromptCTAList;

  /**
   * The `stage` state is used to determine which content to display.
   * The `contentStage` matches the `stage` state but on a delay which
   * allows for the Content component to fade out/back in during the
   * transition of the vehicle svg.
   */
  const [stage, setStage] = useState<STAGES>(STAGES.LOADING);
  const [contentStage, setContentStage] = useState<STAGES>(stage);

  const [isLocalDataByDefault] = useState<boolean>(comesFromSearch);

  // If deep-linking in, or the local data has no results, we skip
  // the loading interstitial and show the relevant stage without
  // CSS transitions.
  const [showLoadingInterstitial] = useState<boolean>(
    isLocalDataByDefault && !hasNoResults,
  );

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

    // TODO: when coming from search, should account for both use cases
    // of having local data immediately (use timeout), and having to load
    // local data
    if (isLocalDataByDefault && hasLocalData) {
      setStage(hasNoResults ? STAGES.NO_RESULTS : STAGES.BUILD_IN);
    }

    // Local data has been fetched
    if (!isLocalDataByDefault && hasLocalData) {
      if (hasPromptMustShow) {
        setStage(hasNoResults ? STAGES.NO_RESULTS : STAGES.DATA_MOMENT);
      } else {
        setStage(STAGES.TOP_PICKS);
      }
    }
  }, [
    hasLocalData,
    hasNoResults,
    hasPromptMustShow,
    isLocalDataByDefault,
    stage,
  ]);

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
  }, [stage]);

  return {
    contentStage,
    isLocalDataByDefault,
    setNewContent: () => {
      // Called after the previous content message exit transition.
      // Brings `contentStage` back in alignment with `stage`.
      setContentStage(stage);
    },
    setStage,
    showLoadingInterstitial,
    siteCatalogSummary,
    stage,
  };
}

interface ProviderProps extends SetupProps {
  children: ReactNode;
}

export function CatalogSummaryContextProvider({
  children,
  comesFromSearch,
  hasLocalData,
  siteCatalogSummary,
}: ProviderProps) {
  const value = useContextSetup({
    comesFromSearch,
    hasLocalData,
    siteCatalogSummary,
  });
  return (
    <CatalogSummaryContext.Provider value={value}>
      {children}
    </CatalogSummaryContext.Provider>
  );
}

export const useCatalogSummaryContext = CatalogSummaryContext.useContext;
