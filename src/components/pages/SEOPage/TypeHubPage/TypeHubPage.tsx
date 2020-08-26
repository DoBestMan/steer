import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import { CircularIllustrationList } from '~/components/global/CircularIllustration/CircularIllustrationList/CircularIllustrationItemList';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteTypes } from '~/data/models/SiteTypes';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './TypeHubPage.styles';

function TypeHubPage({ types }: SiteTypes) {
  const typesBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.TYPE_LANDING,
    },
  ]);
  const pageHeader = ui('seoPage.typeHubPage.header');
  const bodyData = ui('seoPage.typeHubPage.bodyData');
  const meta: MetaProps = {
    title: ui('meta.types.title'),
    description: ui('meta.types.description'),
  };
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
            <BreadcrumbsComponent navigationItems={typesBreadCrumData} />
          </div>
          <div>
            <HeaderLandingPage title={pageHeader} body={bodyData} />
          </div>
        </GridItem>
      </Grid>
      <div css={styles.circularItems}>
        <CircularIllustrationList
          dataItems={types}
          itemCustomStyle={styles.innerItems}
        />
      </div>
    </div>
  );
}

export default TypeHubPage;
