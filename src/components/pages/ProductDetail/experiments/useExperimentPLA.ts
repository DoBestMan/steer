import { EXPERIMENTS } from '~/lib/constants';
import Optimize from '~/lib/helpers/analytics';

/*
 * Experiment ID: PLA - ORDER CHANGED
 *
 * This experiment has 3 variations:
 * - Control: The first curation zone is above the Review section
 * - Test 1: The first curation zone is under the insight area
 * - Test 2: The first curation zone is under the free shipping section.
 */
export default function useExperimentPLA({
  isPLA,
  hasRecirculation,
}: {
  hasRecirculation: boolean | null;
  isPLA: boolean;
}) {
  /*
   * Based on A/B experiment
   * "0" = The first curation zone is above the Review section
   * "1" = The first curation zone is under the insight area
   * "2" = The first curation zone is under the free shipping section.
   */
  let positionCuration = '0';
  const callback = (response?: string) => {
    if (typeof response !== 'undefined') {
      positionCuration = response;
    }
  };

  const experimentID = EXPERIMENTS.PLA.ORDER_CHANGED;
  const removeCall = Optimize.getExperiment({ experimentID, callback });

  removeCall();

  const positionCuration0 =
    positionCuration === '0' && isPLA && hasRecirculation;
  const positionCuration1 =
    positionCuration === '1' && isPLA && hasRecirculation;
  const positionCuration2 =
    positionCuration === '2' && isPLA && hasRecirculation;

  return {
    positionCuration0,
    positionCuration1,
    positionCuration2,
  };
}
