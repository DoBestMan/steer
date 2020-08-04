import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import HomeReviews from '~/components/pages/HomePage/HomeReviews/HomeReviews';
import { SiteModuleReviews } from '~/data/models/SiteModules';

function ModuleReview({ siteReviews }: SiteModuleReviews) {
  return (
    <div data-component="module-review">
      <Grid css={styles.reviewContainer}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <div css={[styles.spacingTopS60XL80, styles.spacingBottomS50XL60]}>
            {siteReviews && <HomeReviews {...siteReviews} isEditorialModule />}
          </div>
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleReview;
