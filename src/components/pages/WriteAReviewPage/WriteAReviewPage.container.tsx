import { useRouter } from 'next/router';

import Breadcrumbs from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import ReviewForm from '~/components/modules/WriteReview/ReviewForm/ReviewForm';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteProductSpecsItem } from '~/data/models/SiteProductSpecsItem';
import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';

import { mapDataToMeta } from './mappers/meta';
import styles from './WriteAReviewPage.styles';

export interface WriteAReviewPageProps {
  serverData: {
    brand: string;
    specs: Array<SiteProductSpecsItem>;
    tire: string;
  };
}

function WriteAReviewPage({
  serverData: { tire, brand, specs },
}: WriteAReviewPageProps) {
  const router = useRouter();
  const { query, asPath, pathname } = router;
  const { vehicle } = useUserPersonalizationContext();
  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brand,
      productLine: tire,
    },
    pathname,
    query,
  });

  // Show "Your Vehicle" field for only Passenger, Light Truck and SUV tire type: STHD-399
  const shouldShowVehicleInfo =
    specs.findIndex(
      (spec) =>
        spec.name === 'Vehicle' &&
        spec.values.some((value) => /(passenger|light truck|suv)/i.test(value)),
    ) >= 0;

  const vehicleFromContext =
    vehicle &&
    `${vehicle.vehicleMake || ''} ${vehicle.vehicleModel || ''} ${
      vehicle.vehicleYear || ''
    } ${vehicle.vehicleTrim || ''}`;

  const onSearchVehicle = (event: React.MouseEvent) => {
    event.preventDefault();
    lockSearchStateToVehicle();
    setShouldPreventLinkNavigation(true);
    setIsSearchOpen(true);
  };

  const meta = mapDataToMeta({ brand, productLine: tire });

  return (
    <div css={navigationBreadcrumbPaddingTop}>
      <Meta {...meta} />
      <Grid>
        <GridItem
          gridColumnL="3/13"
          gridColumnXL="4/12"
          css={styles.breadcrumbs}
        >
          <Breadcrumbs navigationItems={breadcrumbs} />
        </GridItem>
      </Grid>
      <ReviewForm
        tire={tire}
        brand={brand}
        shouldShowVehicleInfo={shouldShowVehicleInfo}
        queryParams={query}
        vehicle={vehicleFromContext}
        onSearchVehicle={onSearchVehicle}
      />
    </div>
  );
}

export default WriteAReviewPage;
