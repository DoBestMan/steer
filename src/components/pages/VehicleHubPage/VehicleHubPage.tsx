import React from 'react';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import CircularIllustrationCarousel from '~/components/global/CircularIllustration/CircularIllustrationCarousel/CircularIllustrationCarousel';
import { CircularIllustrationList } from '~/components/global/CircularIllustration/CircularIllustrationList/CircularIllustrationItemList';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteVehicles } from '~/data/models/SiteVehicles';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import { styles } from './VehicleHubPage.styles';

function VehicleHubPage({ topVehicles, popularMakes, allMakes }: SiteVehicles) {
  const brandsBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.VEHICLES,
    },
  ]);
  const meta: MetaProps = {
    title: ui('meta.vehicleHub.title'),
    description: ui('meta.vehicleHub.description'),
  };

  return (
    <div css={[navigationBreadcrumbPaddingTop]}>
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
            <HeaderLandingPage
              title={ui('seoPage.vehicleHubPage.header')}
              body={ui('seoPage.vehicleHubPage.subHeader')}
              collapseBodyCTALabel={ui(
                'common.headerLandingPage.collapseBodyCTALabel',
              )}
              expandBodyCTALabel={ui(
                'common.headerLandingPage.expandBodyCTALabel',
              )}
            />
          </div>
        </GridItem>
      </Grid>
      <div css={styles.carouselContainer}>
        <Grid css={styles.carouselTitleWrapper}>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <h2 css={styles.carouselTitle}>
              {ui('seoPage.vehicleHubPage.topVehicles.title')}
            </h2>
            <p css={styles.carouselSubTitle}>
              {ui('seoPage.vehicleHubPage.topVehicles.subTitle')}
            </p>
          </GridItem>
        </Grid>
        <CircularIllustrationCarousel dataItems={topVehicles} />
      </div>
      <div css={styles.searchbyBoardSection}>
        <SearchByBoard hasBrand={false} hasTireSize={false} />
      </div>
      <div css={styles.brandListContainer}>
        <Grid css={styles.titleContainer}>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <h2 css={styles.title}>
              {ui('seoPage.vehicleHubPage.popularMakesTitle')}
            </h2>
          </GridItem>
        </Grid>
        <CircularIllustrationList
          dataItems={popularMakes}
          itemCustomStyle={styles.listItem}
        />
      </div>
      <div css={styles.brandListContainer}>
        <Grid css={styles.titleContainer}>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <h2 css={styles.title}>
              {ui('seoPage.vehicleHubPage.allMakesTitle')}
            </h2>
          </GridItem>
        </Grid>
        <CircularIllustrationList
          dataItems={allMakes}
          itemCustomStyle={styles.listItem}
        />
      </div>
    </div>
  );
}

export default VehicleHubPage;
