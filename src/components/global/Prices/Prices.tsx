import { SitePrice } from '~/data/models/SitePrice';
import { COLORS, CSSStyles } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Prices.styles';

interface Props {
  currentPriceCSS?: CSSStyles;
  isLight?: boolean;
  isStartingAtPrice?: boolean;
  originalPrefix?: string;
  priceList?: Array<{
    label?: string | null;
    price: SitePrice;
  }> | null;
}

function Prices({
  currentPriceCSS,
  priceList,
  isLight,
  isStartingAtPrice,
  originalPrefix,
}: Props) {
  return (
    <>
      {priceList && priceList.length > 0 ? (
        priceList.map(({ label, price }) => {
          const isSalePrice =
            parseInt(price.salePriceInCents, 10) <
            parseInt(price.estimatedRetailPriceInCents, 10);
          return (
            <div key={price.salePriceInCents}>
              <span
                css={[
                  (isSalePrice || isStartingAtPrice) && {
                    color: COLORS.GLOBAL.ORANGE,
                  },
                  isLight && { color: COLORS.GLOBAL.WHITE },
                  typography.topPicksPrice,
                  currentPriceCSS,
                ]}
              >
                {label && <span css={styles.label}>{label} </span>}
                {isStartingAtPrice && ui('common.startingAtPrice') + ' '}
                {formatDollars(price.salePriceInCents)}
              </span>
              {!isStartingAtPrice && isSalePrice && (
                <span
                  css={[
                    styles.originalValue,
                    isLight && { color: COLORS.ORANGE.TINT_70 },
                    originalPrefix && styles.originalValuePrefixed,
                  ]}
                  aria-label={`${ui(
                    'common.originalPricePrefix',
                  )}${formatDollars(price.estimatedRetailPriceInCents)}`}
                >
                  <span aria-hidden>
                    {originalPrefix}
                    {formatDollars(price.estimatedRetailPriceInCents)}
                  </span>
                </span>
              )}
            </div>
          );
        })
      ) : (
        <span
          css={[
            typography.topPicksPrice,
            styles.noPrice,
            isLight && { color: COLORS.GLOBAL.WHITE },
          ]}
        >
          {ui('catalog.topPicks.noPrice')}
        </span>
      )}
    </>
  );
}

export default Prices;
