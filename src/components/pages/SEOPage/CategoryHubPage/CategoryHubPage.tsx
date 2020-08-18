import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import { CircularIllustrationList } from '~/components/global/CircularIllustration/CircularIllustrationList/CircularIllustrationItemList';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CategoryHubPage.styles';

interface Props {
  categories?: Array<SiteGraphicTile>;
}

function CategoryHubPage({ categories }: Props) {
  const brandsBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.CATEGORY_LANDING,
    },
  ]);
  const meta: MetaProps = {
    title: ui('meta.tireCategories.title'),
    description: ui('meta.tireCategories.description'),
  };
  const pageHeader = ui('seoPage.CategoryHubPage.header');
  const subHeader = ui('seoPage.CategoryHubPage.subHeader');
  return (
    <div css={navigationBreadcrumbPaddingTop}>
      <Meta {...meta} />
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div css={styles.breadCrumbs}>
            <BreadcrumbsComponent navigationItems={brandsBreadCrumData} />
          </div>
          <div>
            <HeaderLandingPage title={pageHeader} subTitle={subHeader} />
          </div>
        </GridItem>
      </Grid>
      {categories && categories.length > 0 && (
        <>
          <Grid>
            <GridItem
              gridColumn={'2/6'}
              gridColumnM={'2/8'}
              gridColumnL={'2/14'}
              gridColumnXL={'4/12'}
            ></GridItem>
          </Grid>
          <CircularIllustrationList
            dataItems={categories}
            itemCustomStyle={styles.categoryList}
          />
        </>
      )}
    </div>
  );
}

export default CategoryHubPage;
