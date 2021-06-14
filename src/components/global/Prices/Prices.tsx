import React from 'react';

import Link from '~/components/global/Link/Link';
import { SitePrice } from '~/data/models/SitePrice';
import { COLORS, CSSStylesProp, THEME } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import { ICONS } from '../Icon/Icon.constants';
import CallForPricing from './CallForPricing';
import styles, { bestPriceStyle } from './Prices.styles';

interface Props {
  customOriginalStyles?: CSSStylesProp;
  customPriceStyles?: CSSStylesProp;
  handleClickBestPrice?: () => void;
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
  handleClickBestPrice,
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
              <div css={styles.infoWrapper}>
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
                {handleClickBestPrice && (
                  <Link
                    as="button"
                    theme={THEME.LIGHT}
                    icon={ICONS.REVIEW_VERIFIED}
                    css={bestPriceStyle.originalPrice}
                    onClick={handleClickBestPrice}
                  >
                    {ui('pdp.productInfo.bestPrice')}
                  </Link>
                )}
              </div>
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
