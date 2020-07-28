import { useEffect, useState } from 'react';

import { EXPERIMENTS } from '~/lib/constants';
import Optimize from '~/lib/helpers/analytics';

/*
 * Experiment ID: CATALOG - SKIP CURATION VIEW
 *
 * This experiment has 2 variations:
 * - Control: Catalog grid shows curation view
 * - Test 1: Catalog grid shows directly the product grid
 */
export default function useExperimentSkipCurationView({
  isLoading,
  skipCurationView,
}: {
  isLoading: boolean;
  skipCurationView: () => void;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    if (!hasMounted || isLoading || hasLaunched) {
      return;
    }

    const callback = (response?: string) => {
      // Only once
      setHasLaunched(true);

      if (response && response === '1') {
        skipCurationView();
      }
    };

    const experimentID = EXPERIMENTS.CATALOG.SKIP_CURATION_VIEW;
    const removeCall = Optimize.getExperiment({ experimentID, callback });

    return () => {
      removeCall();
    };
  }, [skipCurationView, hasMounted, hasLaunched, isLoading]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return null;
}
