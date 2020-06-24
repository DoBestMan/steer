import { boolean, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';

import Prices from './Prices';

export default {
  component: Prices,
  title: 'Global/Prices',
};

export function PricesWithKnobs() {
  const isLight = boolean('isLight', false);
  const isLarge = boolean('isLarge', false);
  const showMultiple = boolean('Show multiple prices', false);
  const currentInCents = text('Current price (cents)', '15975');
  const originalInCents = text('Original price (cents)', '13296');

  const priceList = [
    {
      label: showMultiple ? 'Front' : null,
      price: {
        currentInCents,
        originalInCents,
      },
    },
  ];

  if (showMultiple) {
    priceList.push({
      label: 'Rear',
      price: {
        currentInCents,
        originalInCents,
      },
    });
  }

  return (
    <div
      css={{
        backgroundColor: isLight ? COLORS.GLOBAL.ORANGE : 'transparent',
      }}
    >
      <Prices isLight={isLight} isLarge={isLarge} priceList={priceList} />
    </div>
  );
}

export function MultiplePrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        currentInCents: '15975',
        originalInCents: null,
      },
    },
    {
      label: 'Rear',
      price: {
        currentInCents: '11975',
        originalInCents: null,
      },
    },
  ];

  return <Prices priceList={priceList} />;
}

export function DiscountedPrices() {
  const priceList = [
    {
      label: null,
      price: {
        currentInCents: '15975',
        originalInCents: '13296',
      },
    },
  ];

  return <Prices priceList={priceList} />;
}

export function LightPrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        currentInCents: '15975',
        originalInCents: '13295',
      },
    },
    {
      label: 'Rear',
      price: {
        currentInCents: '11975',
        originalInCents: '15893',
      },
    },
  ];

  return (
    <div
      css={{
        backgroundColor: COLORS.GLOBAL.ORANGE,
      }}
    >
      <Prices isLight priceList={priceList} />
    </div>
  );
}

export function LargePrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        currentInCents: '15975',
        originalInCents: '13295',
      },
    },
    {
      label: 'Rear',
      price: {
        currentInCents: '11975',
        originalInCents: '15893',
      },
    },
  ];

  return <Prices isLarge priceList={priceList} />;
}

export function NoPrices() {
  return (
    <div
      css={{
        backgroundColor: COLORS.GLOBAL.ORANGE,
      }}
    >
      <Prices priceList={null} />
    </div>
  );
}
