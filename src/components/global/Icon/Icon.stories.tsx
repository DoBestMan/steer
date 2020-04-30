import { css } from '@emotion/core';
import { select } from '@storybook/addon-knobs';
import { Fragment } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { STORYBOOK_COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Icon from './Icon';
import { ICONS } from './Icon.constants';

export default {
  component: Icon,
  title: 'Icon',
};

const styles = {
  container: css({
    padding: '50px 0',
  }),
};

export function ShowListOfIconsWithKnobs() {
  const color = select('Color', STORYBOOK_COLORS, STORYBOOK_COLORS.DARK_BLACK);
  const backgroundColor = select(
    'Background Color',
    STORYBOOK_COLORS,
    STORYBOOK_COLORS.WHITE,
  );

  return (
    <Grid css={[styles.container, { backgroundColor }]}>
      {Object.values(ICONS).map((icon) => {
        const name = icon;
        return (
          <Fragment key={name}>
            <GridItem gridColumn="2/4" css={[typography.bodyCopy, { color }]}>
              {name}
            </GridItem>
            <GridItem gridColumn="4/6">
              <Icon name={name} key={name} css={{ color }} />
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
}

export function ShowListOfIcons() {
  return (
    <Grid css={styles.container}>
      {Object.values(ICONS).map((icon) => {
        const name = icon;
        return (
          <Fragment key={name}>
            <GridItem gridColumn="2/4" css={typography.bodyCopy}>
              {name}
            </GridItem>
            <GridItem gridColumn="4/6">
              <Icon name={name} key={name} />
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
}
