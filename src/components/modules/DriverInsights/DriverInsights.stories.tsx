import { css } from '@emotion/core';

import { text, boolean } from '@storybook/addon-knobs';

import DriverInsights from './DriverInsights';

import { mockInsights } from './DriverInsights.mocks';

import { backgroundColors } from '~/styles/colors.styles';
import { SPACING } from '~/lib/constants';
import Grid from '~/components/global/Grid/Grid';
import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { SiteInsightItemList } from '~/data/models/SiteInsightItemList';

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

export function WhatDriversLookFor() {
  const hasCTA = boolean('Has CTA', true);
  return (
    <Grid css={styles.root}>
      <DriverInsights
        siteInsightList={
          mockInsights as Array<SiteInsightItemDefault | SiteInsightItemList>
        }
        title={text('Title', title)}
        linkLabel={hasCTA ? text('CTA', cta) : null}
        // link={hasCTA ? { href: '/' } : null}
        body={text('Description', description)}
      />
    </Grid>
  );
}
