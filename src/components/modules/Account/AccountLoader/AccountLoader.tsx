import React from 'react';

import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Loading from '~/components/global/Loading/Loading';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';

import styles from './AcountLoader.styles';

export default function AccountLoader() {
  return (
    <Grid css={styles.container}>
      <GridItem>
        <div css={styles.emptyContainer}>
          <Loading />
        </div>
      </GridItem>
      <PageIllustration carId={CARS[CARS_KEYS.SEDAN]} />
    </Grid>
  );
}
