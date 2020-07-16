import { COLORS } from '~/lib/constants';

export function getBgColorFromScrollState(thresholdCrossed: boolean) {
  return thresholdCrossed ? COLORS.GLOBAL.BLACK : COLORS.GLOBAL.ORANGE;
}

export function getTextColorFromScrollState(thresholdCrossed: boolean) {
  return thresholdCrossed ? COLORS.DARK.GRAY_40 : COLORS.GLOBAL.WHITE;
}
