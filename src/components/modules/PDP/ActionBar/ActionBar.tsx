import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { THEME } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelectorContainer from '../QuantitySelector/QuantitySelector.container';
import styles from './ActionBar.styles';

export interface PDPActionBarProps {
  onClickAddToCart?: () => void;
  onClickFindYourSize?: () => void;
  rearPrice?: string | null;
  rearSize?: string | null;
  startingPrice?: string | null;
  theme: THEME;
  tirePrice?: string | null;
  tireSize?: string | null;
}

function PDPActionBar({
  onClickAddToCart,
  onClickFindYourSize,
  rearPrice,
  rearSize,
  startingPrice,
  theme,
  tirePrice,
  tireSize,
}: PDPActionBarProps) {
  const [isDropdownOpen] = useState(false);
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const { quantity, setQuantity } = useProductDetailContext();

  const isTireLine = !tireSize && !rearSize;
  const isSingleTireSize = tireSize && !rearSize;

  useEffect(() => {
    const price = isSingleTireSize
      ? quantity.front * parseInt(tirePrice || '0', 10)
      : parseInt(tirePrice || '0', 10) * quantity.front +
        parseInt(rearPrice || '0', 10) * (quantity.rear || 0);

    setPrice(price);
  }, [quantity, setPrice, isSingleTireSize, tirePrice, rearPrice]);

  function toggleQuantitySelector() {
    setIsQuantitySelectorOpen(!isQuantitySelectorOpen);
  }

  function openQuantitySelector() {
    setIsQuantitySelectorOpen(true);
  }

  function handleChangeQuantity({ front }: { front: number }) {
    setQuantity({ front });
  }

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

  if (isSingleTireSize && tirePrice) {
    return (
      <>
        <div css={styles.root}>
          <Button
            isToggleActive={isDropdownOpen}
            isToggle
            onClick={openQuantitySelector}
            theme={theme}
          >
            {ui(
              quantity.front === 1
                ? 'pdp.stickyBar.changeQuantity'
                : 'pdp.stickyBar.changeQuantityPlural',
              { quantity: quantity.front },
            )}
            <Icon name={ICONS.CHEVRON_DOWN} css={styles.dropdownIcon} />
          </Button>
          <Button
            onClick={onClickAddToCart}
            theme={theme}
            css={styles.addToCart}
          >
            {ui('pdp.stickyBar.addToCart', {
              value: formatDollars(price),
            })}
          </Button>
        </div>

        <QuantitySelectorContainer
          isOpen={isQuantitySelectorOpen}
          onChangeQuantity={handleChangeQuantity}
          toggleModal={toggleQuantitySelector}
          tirePrice={tirePrice}
        />
      </>
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
