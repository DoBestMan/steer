import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Loading from '~/components/global/Loading/Loading';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { THEME } from '~/lib/constants';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './ActionBar.styles';

const DynamicQuantitySelector = dynamic(() =>
  import('../QuantitySelector/QuantitySelector.container'),
);
const DynamicRoadHazardModal = dynamic(() =>
  import('../RoadHazardModal/RoadHazardModal.container'),
);

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

function calculateTotalPrice({
  isSingleTireSize,
  quantity,
  rearPrice,
  tirePrice,
}: {
  isSingleTireSize?: boolean;
  quantity: {
    front: number;
    rear?: number;
  };
  rearPrice?: string | null;
  tirePrice?: string | null;
}) {
  return isSingleTireSize
    ? quantity.front * parseInt(tirePrice || '0', 10)
    : parseInt(tirePrice || '0', 10) * quantity.front +
        parseInt(rearPrice || '0', 10) * (quantity.rear || 0);
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
  const isTireLine = !tireSize && !rearSize;
  const isSingleTireSize = !!tireSize && !rearSize;
  const {
    addToCart,
    quantity,
    isAddingToCart,
    searchForVehicle,
    setIsAddingToCart,
    setQuantity,
  } = useProductDetailContext();
  const { vehicle } = useUserPersonalizationContext();

  const [isQuantitySelectorOpen, setIsQuantitySelectorOpen] = useState(false);
  const [isRoadHazardOpen, setIsRoadHazardOpen] = useState(false);
  const [price, setPrice] = useState(
    calculateTotalPrice({
      isSingleTireSize,
      quantity,
      rearPrice,
      tirePrice,
    }),
  );

  useEffect(() => {
    const price = calculateTotalPrice({
      isSingleTireSize,
      quantity,
      rearPrice,
      tirePrice,
    });

    setPrice(price);
  }, [quantity, setPrice, isSingleTireSize, tirePrice, rearPrice]);

  function toggleQuantitySelector() {
    setIsQuantitySelectorOpen((isOpen) => !isOpen);
  }

  function toggleRoadHazard() {
    setIsRoadHazardOpen((isOpen) => !isOpen);
    setIsAddingToCart(false);
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
        {startingPrice && startingPrice !== '0'
          ? !vehicle && (
              <Button onClick={searchForVehicle} theme={theme}>
                {ui('pdp.stickyBar.findYourSize')}
              </Button>
            )
          : null}
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
            data-testid="add-to-cart"
            onClick={handleClickAddToCart}
            theme={theme}
            css={styles.addToCart}
            isDisabled={isAddingToCart}
          >
            <span css={styles.price}>
              {uiJSX('pdp.stickyBar.addToCart', {
                value: (
                  <span key="action-bar-price" css={styles.decorator}>
                    {formatDollars(price)}
                  </span>
                ),
              })}
            </span>
            {isAddingToCart && (
              <div css={styles.addToCartLoading}>
                <Loading theme={THEME.DARK} />
              </div>
            )}
          </Button>
        </div>

        <DynamicQuantitySelector
          isOpen={isQuantitySelectorOpen}
          onChangeQuantity={handleChangeQuantity}
          toggleModal={toggleQuantitySelector}
          tirePrice={tirePrice}
        />

        {!!roadHazard && (
          <DynamicRoadHazardModal
            isOpen={isRoadHazardOpen}
            onClose={toggleRoadHazard}
            durationLabel={roadHazard?.durationLabel}
            price={roadHazard?.price}
          />
        )}
      </>
    );
  }

  // Front and Rear
  return (
    <>
      {!!price && (
        <div css={styles.root}>
          <Button
            data-testid="add-to-cart"
            onClick={handleClickAddToCart}
            theme={theme}
            isDisabled={isAddingToCart}
            css={styles.addToCart}
          >
            <span css={styles.price}>
              {uiJSX('pdp.stickyBar.addToCart', {
                value: (
                  <span key="action-bar-price" css={styles.decorator}>
                    {formatDollars(price)}
                  </span>
                ),
              })}
            </span>
            {isAddingToCart && (
              <div css={styles.addToCartLoading}>
                <Loading theme={THEME.DARK} />
              </div>
            )}
          </Button>
        </div>
      )}

      {!!roadHazard && (
        <DynamicRoadHazardModal
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
