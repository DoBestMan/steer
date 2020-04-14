import { css } from '@emotion/core';

import Icon from './Icon';
import { ICONS } from './Icon.constants';
import { Icon as IconType } from './Icon.types';

import Layout from '~/components/global/Layout/Layout';
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
  return (
    <Layout>
      <Grid css={styles.container}>
        {Object.values(ICONS).map((icon: string) => {
          const name = icon as IconType;
          return (
            <>
              <GridItem gridColumn={'2 / 4'} css={typography.bodyCopy}>
                {name}
              </GridItem>
              <GridItem gridColumn={'4 / 6'}>
                <Icon name={name} key={name} />
              </GridItem>
            </>
          );
        })}
      </Grid>
    </Layout>
  );
}
