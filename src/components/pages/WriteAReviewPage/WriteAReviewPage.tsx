import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import ReviewForm from '~/components/modules/WriteReview/ReviewForm/ReviewForm';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';

import styles from './WriteAReviewPage.styles';

export interface WriteAReviewServerData {
  serverData: {
    brand: string;
    tire: string;
  };
}

function WriteAReviewPage({
  serverData: { tire, brand },
}: WriteAReviewServerData) {
  const router = useRouter();
  const { query, asPath, pathname } = router;

  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brand,
      productLine: tire,
    },
    pathname,
    query,
  });

  return (
    <div css={navigationPaddingTop}>
      <Grid>
        <GridItem
          gridColumnL="3/13"
          gridColumnXL="4/12"
          css={styles.breadcrumbs}
        >
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
      </Grid>
      <ReviewForm tire={tire} queryParams={query} />
    </div>
  );
}

export default WriteAReviewPage;
