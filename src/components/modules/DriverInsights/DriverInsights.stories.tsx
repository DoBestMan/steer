import { css } from '@emotion/core';

import { text, boolean } from '@storybook/addon-knobs';

import DriverInsights from './DriverInsights';

import { backgroundColors } from '~/styles/colors.styles';
import Card, { Props } from '~/components/global/Card/Card';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SPACING } from '~/lib/constants';
import Grid from '~/components/global/Grid/Grid';

export default {
  component: DriverInsights,
  title: 'Driver Insights',
};

const styles = {
  root: [
    backgroundColors.GLOBAL.BLACK,
    css({
      minHeight: '100vh',
      padding: `${SPACING.SIZE_50}px 0`,
    }),
  ],
};

const title = 'What drivers look for.';
const description =
  "We know, buying tires online may feel complicated. That's why we're here to help. We empower you with data and reviews to make you comfortable to find tires and installers near you";
const cta = 'Where do these trends come from?';

const mockCards = [
  {
    cta: text('Card 1 CTA Text', 'Find All-Season tires'),
    ctaLink: '/',
    decorator: text('Card 1 Decorator', '95%'),
    description: text(
      'Card 1 Description',
      'They keep the same tires all year round – no winter tires.',
    ),
    title: text('Card 1 Title', 'Of drivers use only All-Season tires.'),
  },
  {
    cta: text('Card 1 CTA Text', 'Find your original tires'),
    ctaLink: '/',
    decorator: text('Card 2 Decorator', 'icon-wheel'),
    description: text(
      'Card 2 Description',
      'The ones that came with the vehicle from the factory.',
    ),
    eyebrow: 'Trending',
    eyebrowIcon: ICONS.ARROW_BOTTOM,
    title: text('Card 2 Title', 'Most drivers keep original tires.'),
  },
  {
    cta: text('Card 3 CTA Text', 'Find All-Season tires'),
    ctaLink: '/',
    decorator: text('Card 3 Decorator', '32'),
    description: text(
      'Card 3 Description',
      'Find your shop, ship your tires for them and schedule the installation.',
    ),
    title: text('Card 3 Title', 'Shops install tires near you.'),
  },
  {
    cta: text('Card 4 CTA Text', 'Find tires with long durability'),
    ctaLink: '/',
    decorator: text('Card 4 Decorator', '8 in 10'),
    description: text(
      'Card 4 Description',
      'Most drivers select tires that last between more than 50,000 miles.',
    ),
    title: text(
      'Card 4 Title',
      'Drivers prioritize tires with long durability.',
    ),
  },
];

export function WhatDriversLookFor() {
  const hasCTA = boolean('Has CTA', true);
  return (
    <Grid css={styles.root}>
      <DriverInsights
        title={text('Title', title)}
        cta={hasCTA ? text('CTA', cta) : undefined}
        ctaLink={hasCTA ? '/' : undefined}
        description={text('Description', description)}
      >
        {mockCards.map((card, idx) => (
          <Card key={idx} {...(card as Props)} />
        ))}
      </DriverInsights>
    </Grid>
  );
}
