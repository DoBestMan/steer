import { css } from '@emotion/core';
import { text } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { SiteInsightItemDefault } from '~/data/models/SiteInsightItemDefault';
import { SiteInsightItemList } from '~/data/models/SiteInsightItemList';
import { SPACING } from '~/lib/constants';
import { backgroundColors } from '~/styles/colors.styles';

import DriverInsights from './DriverInsights';
import { mockInsights } from './DriverInsights.mocks';

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

export function WhatDriversLookFor() {
  return (
    <Grid css={styles.root}>
      <DriverInsights
        siteInsightList={
          mockInsights as Array<SiteInsightItemDefault | SiteInsightItemList>
        }
        title={text('Title', title)}
        body={text('Description', description)}
      />
    </Grid>
  );
}
