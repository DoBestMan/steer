import { StylesMap } from '~/lib/constants';
import { THEME } from '~/lib/constants/theme';

export const iconThemeStyles: StylesMap = {
  [THEME.DARK]: {
    filter: 'brightness(0) invert(1)',
  },
  [THEME.LIGHT]: {
    filter:
      'invert(4%) sepia(4%) saturate(304%) hue-rotate(314deg) brightness(98%) contrast(88%)',
  },
  [THEME.ORANGE]: {
    filter:
      'invert(46%) sepia(23%) saturate(6830%) hue-rotate(354deg) brightness(101%) contrast(99%)',
  },
};
