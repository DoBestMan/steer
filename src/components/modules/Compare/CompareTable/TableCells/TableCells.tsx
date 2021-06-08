import PromoTag from '~/components/global/PromoTag/PromoTag';
import Stars from '~/components/global/Stars/Stars';
import {
  PriceList,
  SiteCompareTableCell,
} from '~/data/models/SiteCompareTableCell';
import { RATINGS, THEME } from '~/lib/constants';
import { numberWithDecimal, percentageFromNumber } from '~/lib/utils/number';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles, {
  priceWithPromotion,
  ratingBar,
  STAR_COLOR,
  tStyles,
} from './TableCells.styles';

function CellText({ value }: SiteCompareTableCell) {
  return <span css={styles.cellText}>{value}</span>;
}

const CONSTANTS = {
  RATING_HIGHLIGHT_THRESHOLD: 4,
};

function PriceWithPromotion({ value, promotion }: SiteCompareTableCell) {
  return (
    <div css={priceWithPromotion.root}>
      <div css={priceWithPromotion.priceGroup}>
        {value &&
          (value as PriceList)?.length &&
          (value as PriceList)?.map(({ price }) => {
            if (!price) {
              return null;
            }

            const isSalePrice =
              parseInt(price.salePriceInCents, 10) <
              parseInt(price.estimatedRetailPriceInCents, 10);
            return (
              <div key={price.salePriceInCents} css={styles.wrapper}>
                <span css={styles.cellText}>
                  {formatDollars(price.salePriceInCents)}
                </span>
                {isSalePrice && (
                  <span
                    css={[styles.cellText, priceWithPromotion.lineThrough]}
                    aria-label={`${ui(
                      'common.originalPricePrefix',
                    )}${formatDollars(price.estimatedRetailPriceInCents)}`}
                  >
                    <span aria-hidden>
                      {formatDollars(price.estimatedRetailPriceInCents)}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
      </div>
      {promotion && (
        <div css={priceWithPromotion.promoTagWrapper}>
          <PromoTag
            icon={promotion.icon}
            label={promotion.label}
            style={promotion?.style}
          />
        </div>
      )}
    </div>
  );
}

function BarRating({ value }: SiteCompareTableCell) {
  const isRatingHighlighted =
    value && value >= CONSTANTS.RATING_HIGHLIGHT_THRESHOLD;
  const theme = isRatingHighlighted ? THEME.ORANGE : THEME.LIGHT;
  const formattedRating = numberWithDecimal(value as number);
  const barWidth = `${percentageFromNumber(
    value as number,
    RATINGS.MAX_RATING,
  )}%`;
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;

  return (
    <li
      css={[ratingBar.container, tStyles[theme].container]}
      aria-label={'bar-rating'}
    >
      <span css={ratingBar.rating}>{formattedRating}</span>
      <div css={ratingBar.barContainer}>
        <span
          css={[ratingBar.bar, ratingBar.barFull, tStyles[theme].barFull]}
        />
        <span
          css={[
            ratingBar.bar,
            ratingBar.barProgress,
            tStyles[theme].barProgress,
            { width: barWidth },
          ]}
        />
      </div>
      <span css={screenReaderText}>{a11yLabel}</span>
    </li>
  );
}

function StarRating({ value, quantity }: SiteCompareTableCell) {
  if (!quantity) {
    return null;
  }

  return (
    <div
      css={styles.reviews}
      aria-label={ui('ratings.fullRatingWithReviews', {
        rating: value as string,
        maxRating: RATINGS.MAX_RATING,
        reviews: quantity,
      })}
    >
      <span aria-hidden>
        <Stars color={STAR_COLOR} number={value as number} width={55} />
      </span>
      <span css={[styles.ratingQuantity, styles.borderBottom]} aria-hidden>
        ({quantity})
      </span>
    </div>
  );
}

export { StarRating, BarRating, CellText, PriceWithPromotion };
