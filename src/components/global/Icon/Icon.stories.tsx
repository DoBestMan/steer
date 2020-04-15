import { css } from '@emotion/core';
import { text } from '@storybook/addon-knobs';

import { Fragment } from 'react';

import Icon from './Icon';
import { ICONS } from './Icon.constants';
import { Icon as IconType } from './Icon.types';

import { COLORS } from '~/lib/constants';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';

import { typography } from '~/styles/global/typography.styles';

export default {
  component: Icon,
  title: 'Icon',
};

const styles = {
  container: css({
    padding: '50px 0',
  }),
};

export function ShowListOfIcons() {
  const fillHex = text('Color hex', COLORS.GLOBAL.BLACK);
  return (
    <Grid css={styles.container}>
      {Object.values(ICONS).map((icon: string) => {
        const name = icon as IconType;
        return (
          <Fragment key={name}>
            <GridItem gridColumn={'2/4'} css={typography.bodyCopy}>
              {name}
            </GridItem>
            <GridItem gridColumn={'4/6'}>
              <Icon fill={fillHex} name={name} key={name} />
            </GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
}
