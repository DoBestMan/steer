import { COLORS } from '~/lib/constants';

export function getColorFromScrollState(thresholdCrossed: boolean) {
  return thresholdCrossed ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.ORANGE;
}
