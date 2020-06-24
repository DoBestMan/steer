import { SitePrice } from '~/data/models/SitePrice';
import { COLORS, CSSStyles } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Prices.styles';

interface Props {
  currentPriceCSS?: CSSStyles;
  isLight?: boolean;
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
  originalPrefix,
}: Props) {
  return (
    <>
      {priceList ? (
        priceList.map(({ label, price }) => (
          <div key={price.currentInCents}>
            <span
              css={[
                price.originalInCents && { color: COLORS.GLOBAL.ORANGE },
                isLight && { color: COLORS.GLOBAL.WHITE },
                typography.topPicksPrice,
                currentPriceCSS,
              ]}
            >
              {label && <span css={styles.label}>{label} </span>}
              {formatDollars(price.currentInCents)}
            </span>
            {price.originalInCents && (
              <span
                css={[
                  styles.originalValue,
                  isLight && { color: COLORS.ORANGE.TINT_70 },
                  originalPrefix && styles.originalValuePrefixed,
                ]}
                aria-label={`${ui('common.originalPricePrefix')}${formatDollars(
                  price.originalInCents,
                )}`}
              >
                <span aria-hidden>
                  {originalPrefix}
                  {formatDollars(price.originalInCents)}
                </span>
              </span>
            )}
          </div>
        ))
      ) : (
        <span css={[typography.topPicksPrice, styles.noPrice]}>
          {ui('catalog.topPicks.noPrice')}
        </span>
      )}
    </>
  );
}

export default Prices;
