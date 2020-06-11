import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { typography } from '~/styles/typography.styles';

import { styles } from './ErrorPage.styles';

function ErrorPage() {
  return (
    <div css={[styles.root, navigationPaddingTop]}>
      <Grid css={styles.height100}>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          css={styles.height100}
        >
          <div css={styles.page}>
            <h1 css={typography.jumboHeadline}>This is a 404 page.</h1>
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ErrorPage;
