import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { THEME } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import QuantitySelectorContainer from '../QuantitySelector/QuantitySelector.container';
import RoadHazardModalContainer from '../RoadHazardModal/RoadHazardModal.container';
import styles from './ActionBar.styles';

interface PDPActionBarProps {
  rearPrice?: string | null;
  rearSize?: string | null;
  roadHazard: {
    durationLabel: string;
    price: string;
  } | null;
  startingPrice?: string | null;
  theme: THEME;
  tirePrice?: string | null;
  tireSize?: string | null;
}

function PDPActionBar({
  rearPrice,
  rearSize,
  roadHazard,
  startingPrice,
  theme,
  tirePrice,
  tireSize,
}: PDPActionBarProps) {
  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [isRoadHazardOpen, setIsRoadHazardOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const {
    addToCart,
    quantity,
    searchForVehicle,
    setQuantity,
  } = useProductDetailContext();
  const { vehicle } = useUserPersonalizationContext();

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
    setIsQuantitySelectorOpen((isOpen) => !isOpen);
  }

  function toggleRoadHazard() {
    setIsRoadHazardOpen((isOpen) => !isOpen);
  }

  function openQuantitySelector() {
    setIsQuantitySelectorOpen(true);
  }

  function handleClickAddToCart() {
    if (!roadHazard) {
      addToCart({ shouldAddCoverage: false });
      return;
    }

    setIsRoadHazardOpen(true);
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
        {!vehicle && (
          <Button onClick={searchForVehicle} theme={theme}>
            {ui('pdp.stickyBar.findYourSize')}
          </Button>
        )}
      </div>
    );
  }

  if (isSingleTireSize && tirePrice) {
    return (
      <>
        <div css={styles.root}>
          <Button isToggle onClick={openQuantitySelector} theme={theme}>
            {ui(
              quantity.front === 1
                ? 'pdp.stickyBar.changeQuantity'
                : 'pdp.stickyBar.changeQuantityPlural',
              { quantity: quantity.front },
            )}
            <Icon name={ICONS.CHEVRON_DOWN} css={styles.dropdownIcon} />
          </Button>
          <Button
            onClick={handleClickAddToCart}
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

        {!!roadHazard && (
          <RoadHazardModalContainer
            isOpen={isRoadHazardOpen}
            onClose={toggleRoadHazard}
            durationLabel={roadHazard?.durationLabel}
            price={roadHazard?.price}
          />
        )}
      </>
    );
  }

  return (
    <>
      {!!price && (
        <div css={styles.root}>
          <Button
            onClick={handleClickAddToCart}
            theme={theme}
            css={styles.addToCart}
          >
            {ui('pdp.stickyBar.addToCart', {
              value: formatDollars(price),
            })}
          </Button>
        </div>
      )}

      {!!roadHazard && (
        <RoadHazardModalContainer
          isOpen={isRoadHazardOpen}
          onClose={toggleRoadHazard}
          durationLabel={roadHazard?.durationLabel}
          price={roadHazard?.price}
        />
      )}
    </>
  );
}

export default PDPActionBar;
