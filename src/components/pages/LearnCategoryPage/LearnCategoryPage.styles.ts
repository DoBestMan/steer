import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  breadcrumbsContainer: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  learnCategoryContainer: {
    ['[data-component="module-accordion-container"]']: {
      borderTop: BORDERS.SOLID_BLACK_1PX,
    },
    ['[data-component="module-markdown"]']: {
      marginTop: SPACING.SIZE_40,
    },
  },
  spacingBottom40: {
    marginBottom: SPACING.SIZE_40,
  },
};
