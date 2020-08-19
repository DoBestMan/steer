import { ReactNode, useEffect, useState } from 'react';

import { PAGE_TRANSITION_DURATION } from '~/components/modules/App/App.constants';
import {
  CatalogApiArgs,
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.types';
import { STAGES } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.constants';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
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
  apiArgs: CatalogApiArgs;
  comesFromSearch: boolean;
  endpoint: string;
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

export const onDataReady = (
  siteCatalogSummary: SiteCatalogSummary,
  showLoadingInterstitial: boolean,
) => {
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
    return {
      contentStage: STAGES.BUILD_IN,
      stage: STAGES.BUILD_IN,
    };
  } else if (hasPromptMustShow) {
    const newStage = hasNoResults ? STAGES.NO_RESULTS : STAGES.DATA_MOMENT;
    return {
      contentStage: newStage,
      stage: newStage,
    };
  } else {
    return {
      contentStage: STAGES.RESULTS,
      showSummary: hasTopPicks,
      stage: STAGES.RESULTS,
    };
  }
};

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
  apiArgs,
  comesFromSearch,
  endpoint,
}: SetupProps): CatalogSummaryContextProps {
  const [state, setState] = useState<CatalogSummaryState>({
    ...INITIAL_STATE,
    // Top Picks must be in the DOM on first render for SEO purposes
    contentStage: STAGES.RESULTS,
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
   * Combine the `hasLocalData` and data states, so that they can be
   * set simultaneously on fetch success.
   */
  const [{ hasLocalData, siteCatalogSummary }, setSummaryState] = useState<{
    hasLocalData: boolean;
    siteCatalogSummary: SiteCatalogSummary;
  }>({
    hasLocalData: false,
    siteCatalogSummary: apiArgs.defaultData.siteCatalogSummary,
  });

  /**
   * Fetch site catalog summary
   * Note that unusually this hook does not return the data directly,
   * but sets it to local state via the `onSuccess` callback. This was
   * done to solve an issue where the downstream components were
   * receiving the `hasLocalData: true` prop before the updated data.
   */
  const { error, revalidate: revalidateSummary } = useApiDataWithDefault<
    CatalogPageData['serverData']
  >({
    ...apiArgs,
    endpoint,
    options: {
      onSuccess: (data) => {
        setSummaryState({
          hasLocalData: true,
          siteCatalogSummary: data.siteCatalogSummary,
        });
      },
    },
  });

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    const handleResetSummary = async ({
      comesFromSearch,
    }: {
      comesFromSearch: boolean;
    }) => {
      // Reset hasLocalData state on `useApiData` hook
      setSummaryState((summaryState) => ({
        ...summaryState,
        hasLocalData: false,
      }));

      if (comesFromSearch) {
        await revalidateSummary();
      }

      // Reset scroll position to top
      window.scrollTo(0, 0);
    };

    eventEmitters.newCatalogSearchQuery.on(handleResetSummary);

    return () => {
      eventEmitters.newCatalogSearchQuery.off(handleResetSummary);
    };
  }, [revalidateSummary]);

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

    setState({
      ...state,
      // Reset contentStage to LOADING after first render
      contentStage: STAGES.LOADING,
      dataLoadingStatus: LOADING_STATUS.LOADING,
    });

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

    // Show the nav once loading stage is over
    eventEmitters.setNavVisibility.emit({ isVisible: true });

    setState({
      ...state,
      ...onDataReady(siteCatalogSummary, showLoadingInterstitial),
    });
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
  apiArgs,
  children,
  comesFromSearch,
  endpoint,
}: ProviderProps) {
  const value = useContextSetup({
    apiArgs,
    comesFromSearch,
    endpoint,
  });
  return (
    <CatalogSummaryContext.Provider value={value}>
      {children}
    </CatalogSummaryContext.Provider>
  );
}

export const useCatalogSummaryContext = CatalogSummaryContext.useContext;
