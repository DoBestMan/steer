import React, { SetStateAction, useState } from 'react';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import { CircularIllustrationList } from '~/components/global/CircularIllustration/CircularIllustrationList/CircularIllustrationItemList';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Input from '~/components/global/Input/Input';
import Meta, { MetaProps } from '~/components/global/Meta/Meta';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { SiteBrands } from '~/data/models/SiteBrands';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './BrandHubPage.styles';

export interface BrandListItem {
  brand: SiteCatalogBrand;
  description: string;
  href: string;
  isPopular: boolean;
  tagLabel?: string;
}

function BrandHubPage({ allBrands, popularBrands }: SiteBrands) {
  const brandsBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.BRAND_LANDING,
    },
  ]);
  const pageHeader = ui('seoPage.brandHubPage.header');
  const subHeader = ui('seoPage.brandHubPage.subHeader');
  const popularBrandList: Array<SiteGraphicTile> = popularBrands;
  const [searchValue, setSearchValue] = useState('');
  const [searchBrandList, setSearchBrandList] = useState([]);
  const onChange = (inputValue: string) => {
    setSearchValue(inputValue);
    setSearchBrandList(
      filterBrandsStartsWith(allBrands, inputValue) as SetStateAction<never[]>,
    );
  };
  const filterBrandsStartsWith = (
    list: SiteGraphicTile[],
    comparisonString: string,
  ) =>
    comparisonString
      ? list.filter((item: SiteGraphicTile) =>
          item.title.toLowerCase().startsWith(comparisonString.toLowerCase()),
        )
      : [];
  const meta: MetaProps = {
    title: ui('meta.brands.brandsHub.title'),
    description: ui('meta.brands.brandsHub.description'),
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
            <HeaderLandingPage title={pageHeader} subTitle={subHeader} />
          </div>
          <div css={styles.search}>
            <div css={styles.searchInput}>
              <Input
                label={ui('seoPage.brandHubPage.searchInputPlaceholder')}
                onChange={onChange}
                value={searchValue}
              />
            </div>
            <div css={styles.searchIcon}>
              <Icon name={ICONS.SEARCH} />
            </div>
          </div>
        </GridItem>
      </Grid>
      {searchValue !== '' && searchBrandList && searchBrandList.length > 0 && (
        <CircularIllustrationList
          dataItems={searchBrandList}
          itemCustomStyle={styles.brandsList}
        />
      )}
      {searchValue === '' && popularBrandList && popularBrandList.length > 0 && (
        <>
          <Grid>
            <GridItem
              gridColumn={'2/6'}
              gridColumnM={'2/8'}
              gridColumnL={'2/14'}
              gridColumnXL={'4/12'}
            >
              <h1 css={styles.header}>
                {ui('seoPage.brandHubPage.popularBrandsHeaderCopy')}
              </h1>
            </GridItem>
          </Grid>
          <CircularIllustrationList
            dataItems={popularBrands}
            itemCustomStyle={styles.brandsList}
          />
        </>
      )}
      {searchValue === '' && allBrands && allBrands.length > 0 && (
        <>
          <Grid>
            <GridItem
              gridColumn={'2/6'}
              gridColumnM={'2/8'}
              gridColumnL={'2/14'}
              gridColumnXL={'4/12'}
            >
              <h1 css={styles.header}>
                {ui('seoPage.brandHubPage.allBrandsHeaderCopy')}
              </h1>
            </GridItem>
          </Grid>
          <CircularIllustrationList
            dataItems={allBrands}
            itemCustomStyle={styles.brandsList}
          />
        </>
      )}
    </div>
  );
}

export default BrandHubPage;
