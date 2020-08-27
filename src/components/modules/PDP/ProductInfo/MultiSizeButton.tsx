import dynamic from 'next/dynamic';
import { useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Prices from '~/components/global/Prices/Prices';
import { useProductDetailContext } from '~/components/pages/ProductDetail/ProductDetail.context';
import { SitePrice } from '~/data/models/SitePrice';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './MultiSizeButton.styles';
import { ProductInfoProps } from './ProductInfo';

const DynamicQuantitySelector = dynamic(() =>
  import('../QuantitySelector/QuantitySelector.container'),
);

type Props = Pick<
  ProductInfoProps,
  | 'size'
  | 'loadSpeedRating'
  | 'price'
  | 'rearSize'
  | 'rearLoadSpeedRating'
  | 'rearPrice'
>;

function RenderItem({
  loadSpeedRating,
  price,
  quantity,
  size,
}: {
  loadSpeedRating?: string;
  price?: SitePrice | null;
  quantity: number;
  size: string;
}) {
  return (
    <>
      <span css={styles.size}>
        {size} <span css={styles.loadSpeedRating}>{loadSpeedRating}</span>
      </span>
      <span css={styles.price}>
        <Prices
          priceList={[{ price: price as SitePrice }]}
          customPriceStyles={styles.customPriceStyles}
        />
      </span>
      <span css={styles.quantity}>
        {ui(
          quantity === 1
            ? 'pdp.productInfo.sizeQuantity'
            : 'pdp.productInfo.sizeQuantityPlural',
          { quantity },
        )}
      </span>
      <Icon name={ICONS.CHEVRON_DOWN} css={styles.icon} />
    </>
  );
}

function MultiSizeButton({
  size,
  loadSpeedRating,
  price,
  rearSize,
  rearLoadSpeedRating,
  rearPrice,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { quantity, setQuantity } = useProductDetailContext();

  function toggleQuantitySelector() {
    setIsOpen((isOpen) => !isOpen);
  }

  function openQuantitySelector() {
    setIsOpen(true);
  }

  function handleChangeQuantity({
    front,
    rear,
  }: {
    front: number;
    rear?: number;
  }) {
    setQuantity({ front, rear });
  }

  return (
    <>
      <ul css={styles.root}>
        <li>
          <button
            css={styles.button}
            aria-label={`${size} ${loadSpeedRating}, ${ui(
              'pdp.productInfo.changeSizeLabel',
            )}`}
            type="button"
            onClick={openQuantitySelector}
          >
            <RenderItem
              size={ui('pdp.productInfo.frontTireSize', { size: size || '' })}
              loadSpeedRating={loadSpeedRating}
              price={price}
              quantity={quantity.front}
            />
          </button>
        </li>
        <li>
          <button
            css={[styles.button, styles.rearButton]}
            aria-label={`${rearSize} ${rearLoadSpeedRating}, ${ui(
              'pdp.productInfo.changeSizeLabel',
            )}`}
            type="button"
            onClick={openQuantitySelector}
          >
            <RenderItem
              size={ui('pdp.productInfo.rearTireSize', {
                size: rearSize || '',
              })}
              loadSpeedRating={rearLoadSpeedRating}
              price={rearPrice}
              quantity={quantity.rear || 0}
            />
          </button>
        </li>
      </ul>
      {price && (
        <DynamicQuantitySelector
          isOpen={isOpen}
          isFrontAndRear
          onChangeQuantity={handleChangeQuantity}
          toggleModal={toggleQuantitySelector}
          tirePrice={price.salePriceInCents}
          rearPrice={rearPrice?.salePriceInCents}
        />
      )}
    </>
  );
}

export default MultiSizeButton;
