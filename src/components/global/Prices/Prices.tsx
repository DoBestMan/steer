import { SitePrice } from '~/data/models/SitePrice';
import { COLORS, CSSStylesProp } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import CallForPricing from './CallForPricing';
import styles from './Prices.styles';

interface Props {
  customOriginalStyles?: CSSStylesProp;
  customPriceStyles?: CSSStylesProp;
  isLight?: boolean;
  isStartingAtPrice?: boolean;
  originalPrefix?: string;
  priceList?: Array<{
    label?: string | null;
    price: SitePrice | null;
  }> | null;
}

function Prices({
  customOriginalStyles,
  customPriceStyles,
  priceList,
  isLight,
  isStartingAtPrice,
  originalPrefix,
}: Props) {
  return (
    <>
      {priceList && priceList.length > 0 ? (
        priceList.map(({ label, price }) => {
          if (!price) {
            return <CallForPricing isLight={isLight} />;
          }

          const isSalePrice =
            parseInt(price.salePriceInCents, 10) <
            parseInt(price.estimatedRetailPriceInCents, 10);
          return (
            <div key={price.salePriceInCents} css={styles.wrapper}>
              <span
                css={[
                  (isSalePrice || isStartingAtPrice) && {
                    color: COLORS.LIGHT.GRAY_70,
                  },
                  isLight && { color: COLORS.GLOBAL.WHITE },
                  typography.tertiaryHeadline,
                  customPriceStyles,
                ]}
              >
                {label && <span>{label} </span>}
                {isStartingAtPrice && ui('common.startingAtPrice') + ' '}
                {formatDollars(price.salePriceInCents)}
              </span>
              {!isStartingAtPrice && isSalePrice && (
                <span
                  css={[
                    styles.originalValue,
                    isLight && { color: COLORS.LIGHT.GRAY_70 },
                    originalPrefix && styles.originalValuePrefixed,
                    customOriginalStyles,
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
        <CallForPricing isLight={isLight} />
      )}
    </>
  );
}

export default Prices;
