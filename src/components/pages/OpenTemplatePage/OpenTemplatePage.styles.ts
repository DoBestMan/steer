import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  openTemplatePageContainer: {
    height: '100%',
    ['[data-component="module-video"] + [data-component="module-markdown"], [data-component="module-image"] + [data-component="module-markdown"]']: {
      ['h2']: [
        typography.secondaryHeadline,
        {
          marginTop: SPACING.SIZE_40,
          [MQ.L]: {
            marginTop: SPACING.SIZE_60,
          },
        },
      ],
    },
    ['[data-component="module-review"] ~ div[data-component]']: {
      marginTop: 0,
    },
  },
};
