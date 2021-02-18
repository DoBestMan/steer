import { useRouter } from 'next/router';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import DataTableVertical from '~/components/global/DataTables/DataTableVertical';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderWithLogo from '~/components/global/HeaderWithLogo/HeaderWithLogo';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteVehicleMakeModelProps } from '~/data/models/SiteVehicleMakeModelResponse';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import { mapModelListData } from './mapModelListDataForDataTableVertical';
import styles from './VehicleMakeModelListPage.styles';

interface Props {
  pageData: SiteVehicleMakeModelProps;
}

function VehicleMakeModelList({ pageData }: Props) {
  const { makeName, makeModelName, header, list } = pageData;
  //We need to use URL make/Model name which are slugged from API.
  const router = useRouter();
  const { make, model } = router.query;
  const modelListTableData = mapModelListData(list);
  const pageBreadCrumbData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.VEHICLES,
    },
    {
      label: makeName,
      url: `/vehicles/${make}`,
    },
    {
      label: makeName + ' ' + makeModelName + ' tires',
      url: `/vehicles/${make}/${model}`,
    },
  ]);
  const meta: MetaProps = {
    title: ui('meta.vehicles.make.model.title', {
      make: makeName,
      model: makeModelName,
    }),
    description: ui('meta.vehicles.make.model.description', {
      make: makeName,
      model: makeModelName,
    }),
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
            <BreadcrumbsComponent navigationItems={pageBreadCrumbData} />
          </div>
          <div css={styles.pageHeader}>
            {pageData && (
              <HeaderWithLogo {...header} imageLabel={`${makeName}`} />
            )}
          </div>
          <div css={styles.dataTableHeader}>
            {ui('vehicles.modelPageTitle', {
              model: makeName + ' ' + makeModelName,
            })}
          </div>
          {list && list.length > 0 && (
            <div css={styles.dataTableList}>
              <DataTableVertical {...modelListTableData} isFirstColumnFixed />
            </div>
          )}
        </GridItem>
      </Grid>
    </div>
  );
}

export default VehicleMakeModelList;
