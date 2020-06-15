import { SitePrice } from '~/data/models/SitePrice';
import { COLORS } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Prices.styles';

interface Props {
  isLarge?: boolean;
  isLight?: boolean;
  priceList?: {
    label: string | null;
    price: SitePrice;
  }[];
}

function Prices({ priceList, isLarge, isLight }: Props) {
  return (
    <>
      {priceList ? (
        priceList.map(({ label, price }) => (
          <div key={price.currentInCents}>
            <span
              css={[
                price.originalInCents && { color: COLORS.GLOBAL.ORANGE },
                isLight && { color: COLORS.GLOBAL.WHITE },
                isLarge
                  ? typography.secondaryHeadline
                  : typography.topPicksPrice,
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
                ]}
              >
                {formatDollars(price.originalInCents)}
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
