import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  openTemplatePageContainer: {
    ['[data-component="module-header-landing-page"]']: {
      h2: [
        typography.secondaryHeadline,
        {
          marginTop: SPACING.SIZE_20,
          marginBottom: -SPACING.SIZE_40,
        },
      ],
    },
    ['[data-component="module-header-landing-page"] .data-color-orange']: {
      color: COLORS.GLOBAL.ORANGE,
    },
    ['[data-component="module-promotion-card-carousel"]']: {
      ['[data-component="promotion-card-carousel"]']: {
        ['.carousel-pagination']: {
          margin: `${SPACING.SIZE_30}px auto ${SPACING.SIZE_40}px`,
        },
        ['.product-card-carousel']: {
          ['.swiper-slide:first-of-type']: {
            marginLeft: 0,
            [MQ.M]: {
              marginLeft: SPACING.SIZE_40,
            },
            [MQ.L]: {
              marginLeft: SPACING.SIZE_60,
            },
          },
        },
      },
    },
    ['[data-component="module-promotion-header"]']: {
      [MQ.M]: {
        padding: `0px ${SPACING.SIZE_20}px`,
      },
      [MQ.L]: {
        padding: `0px ${SPACING.SIZE_40}px`,
      },
    },
    ['[data-component="module-review"] ~ div[data-component]']: {
      marginTop: 0,
    },
    ['[data-component="module-siteLinkWithLabel"]']: {
      marginTop: 0,
    },
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
    height: '100%',
  },
};
