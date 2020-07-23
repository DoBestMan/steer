import { ReactNode, useEffect, useState } from 'react';

import { PAGE_TRANSITION_DURATION } from '~/components/modules/App/App.constants';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { eventEmitters } from '~/lib/events/emitters';
import { createContext } from '~/lib/utils/context';

export interface CatalogSummaryContextProps {
  contentStage: STAGES;
  setNewContent(): void;
  setStage(stage: STAGES): void;
  showLoadingInterstitial: boolean;
  showSummary: boolean;
  siteCatalogSummary: SiteCatalogSummary;
  stage: STAGES;
}

const CatalogSummaryContext = createContext<CatalogSummaryContextProps>();

interface SetupProps {
  comesFromSearch: boolean;
  hasLocalData: boolean;
  siteCatalogSummary: SiteCatalogSummary;
}

enum LOADING_STATUS {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
}

interface CatalogSummaryState {
  contentStage: STAGES;
  dataLoadingStatus: LOADING_STATUS | null;
  showLoadingInterstitial: boolean;
  showSummary: boolean;
  stage: STAGES;
}

/**
 * @param {STAGES} contentStage - Matches the `stage` state but on a delay
 * which allows for the Content component to fade out/back in during the
 * transition of the vehicle svg.
 * @param {LOADING_STATUS} dataLoadingStatus - Local data loading status.
 * @param {boolean} showLoadingInterstitial - If deep-linking in, or the
 * local data has no results, we skip the loading interstitial and show
 * the relevant stage without CSS transitions.
 * @param {boolean} showSummary - If there are results but no Top Picks, then
 * the `CatalogSummary` section is hidden.
 * @param {STAGES} stage - Used to determine which content to display.
 */
const INITIAL_STATE: CatalogSummaryState = {
  contentStage: STAGES.LOADING,
  dataLoadingStatus: null,
  showLoadingInterstitial: false,
  showSummary: true,
  stage: STAGES.LOADING,
};

const BUILD_IN_PAUSE = 4000;

// TODO: Exported for testing only
export function useContextSetup({
  comesFromSearch,
  hasLocalData,
  siteCatalogSummary,
}: SetupProps): CatalogSummaryContextProps {
  const [state, setState] = useState<CatalogSummaryState>({
    ...INITIAL_STATE,
    showLoadingInterstitial: comesFromSearch,
  });
  const {
    contentStage,
    dataLoadingStatus,
    showLoadingInterstitial,
    showSummary,
    stage,
  } = state;

  /**
   * There will always be a LOADING stage when the user lands on the
   * Catalog page.
   * - If local data is not available on load, wait until local data has
   *   been fetched.
   * - Whether local data is available on load, set a timer for the duration
   *   of the global page transition (e.g. until the Nav has transitioned
   *   back into place).
   * - Only set the next stage once local data is available, and the timer
   *   has finished.
   */
  useEffect(() => {
    if (stage !== STAGES.LOADING || dataLoadingStatus) {
      return;
    }

    setState({ ...state, dataLoadingStatus: LOADING_STATUS.LOADING });

    const timeout = setTimeout(() => {
      setState({ ...state, dataLoadingStatus: LOADING_STATUS.LOADED });
    }, PAGE_TRANSITION_DURATION * 2);

    return () => {
      clearTimeout(timeout);
    };
    // Prevent hook from being called every time `dataLoadingStatus` changes,
    // otherwise the timeout is cleared when status is set to
    // `LOADING_STATUS.LOADING`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  useEffect(() => {
    // Local data has been fetched and minimum loading period over
    const dataReady =
      hasLocalData && dataLoadingStatus === LOADING_STATUS.LOADED;

    if (stage !== STAGES.LOADING || !dataReady) {
      return;
    }

    const totalResult =
      siteCatalogSummary.siteCatalogSummaryMeta?.totalResults || 0;
    const hasPromptMustShow =
      siteCatalogSummary.siteCatalogSummaryPrompt?.mustShow;
    const hasPromptCTAList = !!siteCatalogSummary.siteCatalogSummaryPrompt
      ?.ctaList?.length;
    const hasTopPicks = !!siteCatalogSummary.siteCatalogSummaryTopPicksList
      .length;

    /**
     * Disambiguation response also has 0 results, but user should see the
     * loading interstitial. Therefore, only show the NO_RESULTS stage if
     * there are no CTA objects are present in the `ctaList`
     */
    const hasNoResults = totalResult === 0 && !hasPromptCTAList;

    if (showLoadingInterstitial && hasPromptCTAList) {
      setState({
        ...state,
        stage: STAGES.BUILD_IN,
      });
    } else if (hasPromptMustShow) {
      setState({
        ...state,
        stage: hasNoResults ? STAGES.NO_RESULTS : STAGES.DATA_MOMENT,
      });
    } else {
      setState({
        ...state,
        showSummary: hasTopPicks,
        stage: STAGES.TOP_PICKS,
      });
    }
  }, [
    dataLoadingStatus,
    hasLocalData,
    showLoadingInterstitial,
    siteCatalogSummary,
    stage,
    state,
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
      setState({ ...state, stage: STAGES.DATA_MOMENT });
    }, BUILD_IN_PAUSE);

    return () => {
      clearTimeout(timeout);
    };
  }, [stage, state]);

  const handleNewSearchQuery = ({
    comesFromSearch,
  }: {
    comesFromSearch: boolean;
  }) => {
    // Reset state
    setState({
      ...INITIAL_STATE,
      showLoadingInterstitial: comesFromSearch,
    });
  };

  useEffect(() => {
    eventEmitters.newCatalogSearchQuery.on(handleNewSearchQuery);

    return () => {
      eventEmitters.newCatalogSearchQuery.off(handleNewSearchQuery);
    };
  });

  return {
    contentStage,
    setNewContent: () => {
      // Called after the previous content message exit transition.
      // Brings `contentStage` back in alignment with `stage`.
      setState({ ...state, contentStage: stage });
    },
    setStage: (newStage: STAGES) => {
      setState({ ...state, stage: newStage });
    },
    showLoadingInterstitial,
    showSummary,
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
