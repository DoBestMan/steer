import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { THEME } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './ActionBar.styles';

export interface PDPActionBarProps {
  onClickAddToCart?: () => void;
  onClickChangeQuantity?: () => void;
  onClickFindYourSize?: () => void;
  rearPrice?: string | null;
  rearSize?: string | null;
  startingPrice?: string | null;
  theme: THEME;
  tirePrice?: string | null;
  tireSize?: string | null;
}

const CONSTANTS = {
  DEFAULT_QUANTITY: 4,
};

function PDPActionBar({
  onClickAddToCart,
  onClickChangeQuantity,
  onClickFindYourSize,
  rearPrice,
  rearSize,
  startingPrice,
  theme,
  tirePrice,
  tireSize,
}: PDPActionBarProps) {
  const [isDropdownOpen] = useState(false);
  const [quantity] = useState(CONSTANTS.DEFAULT_QUANTITY);

  const isTireLine = !tireSize && !rearSize;
  const isSingleTireSize = tireSize && !rearSize;

  if (isTireLine) {
    return (
      <div css={styles.root}>
        {startingPrice && (
          <p css={styles.startingAtValue}>
            {ui('pdp.stickyBar.startingAtLabel', {
              value: startingPrice ? formatDollars(startingPrice) : '',
            })}
          </p>
        )}
        <Button onClick={onClickFindYourSize} theme={theme}>
          {ui('pdp.stickyBar.findYourSize')}
        </Button>
      </div>
    );
  }

  const price = isSingleTireSize
    ? quantity * parseInt(tirePrice || '0', 10)
    : parseInt(tirePrice || '0', 10) * 2 + parseInt(rearPrice || '0', 10) * 2;

  if (isSingleTireSize) {
    return (
      <div css={styles.root}>
        <Button
          isToggleActive={isDropdownOpen}
          isToggle
          onClick={onClickChangeQuantity}
          theme={theme}
        >
          {ui('pdp.stickyBar.changeQuantity', { quantity })}
          <Icon name={ICONS.CHEVRON_DOWN} css={styles.dropdownIcon} />
        </Button>
        <Button onClick={onClickAddToCart} theme={theme} css={styles.addToCart}>
          {ui('pdp.stickyBar.addToCart', {
            value: formatDollars(price),
          })}
        </Button>
      </div>
    );
  }

  return (
    <div css={styles.root}>
      <Button onClick={onClickAddToCart} theme={theme} css={styles.addToCart}>
        {ui('pdp.stickyBar.addToCart', {
          value: formatDollars(price),
        })}
      </Button>
    </div>
  );
}

export default PDPActionBar;
