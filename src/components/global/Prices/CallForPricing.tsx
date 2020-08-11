import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import styles from './Prices.styles';

interface Props {
  isLight?: boolean;
}

function CallForPricing({ isLight }: Props) {
  return (
    <span
      css={[
        typography.tertiaryHeadline,
        styles.noPrice,
        isLight && { color: COLORS.GLOBAL.WHITE },
      ]}
    >
      {ui('catalog.topPicks.noPrice')}
    </span>
  );
}

export default CallForPricing;
