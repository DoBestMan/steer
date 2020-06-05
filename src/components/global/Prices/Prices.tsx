import { SitePrice } from '~/data/models/SitePrice';
import { COLORS } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { typography } from '~/styles/typography.styles';

import styles from './Prices.styles';

interface Props {
  isLarge?: boolean;
  isLight?: boolean;
  priceList: {
    label: string | null;
    price: SitePrice;
  }[];
}

function Prices({ priceList, isLarge, isLight }: Props) {
  return (
    <>
      {priceList.map(({ label, price }) => (
        <div key={price.currentInCents}>
          <span
            css={[
              price.originalInCents && { color: COLORS.GLOBAL.ORANGE },
              isLight && { color: COLORS.GLOBAL.WHITE },
              isLarge
                ? typography.secondaryHeadline
                : typography.tertiaryHeadline,
            ]}
          >
            {label && `${label} `}
            {formatDollars(price.currentInCents)}
          </span>
          {price.originalInCents && (
            <span
              css={[
                styles.originalValue,
                isLight && { color: COLORS.GLOBAL.WHITE },
              ]}
            >
              {formatDollars(price.originalInCents, true)}
            </span>
          )}
        </div>
      ))}
    </>
  );
}

export default Prices;
