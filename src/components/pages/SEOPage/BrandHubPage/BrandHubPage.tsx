import { SetStateAction, useState } from 'react';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import { TitlePosition } from '~/components/global/CircularIllustration/CircularIllustrationItem/CircularIllustrationItem';
import {
  CircularIllustrationItemList,
  CircularItemType,
} from '~/components/global/CircularIllustration/CircularIllustrationList/CircularIllustrationItemList';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Input from '~/components/global/Input/Input';
import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { ui } from '~/lib/utils/ui-dictionary';

import { brands } from './BrandHub.mock';
import styles from './BrandHubPage.styles';

export interface BrandListItem {
  brand: SiteCatalogBrand;
  description: string;
  href: string;
  isPopular: boolean;
  tagLabel?: string;
}
interface Props {
  brandListItems?: Array<BrandListItem>;
}

function BrandHubPage({ brandListItems = brands }: Props) {
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
  const popularBrandList: Array<BrandListItem> = brandListItems.filter(
    (i) => i.isPopular === true,
  );
  const [searchValue, setSearchValue] = useState('');
  const [searchBrandList, setSearchBrandList] = useState([]);
  const onChange = (inputValue: string) => {
    setSearchValue(inputValue);
    setSearchBrandList(
      filterBrandsStartsWith(brandListItems, inputValue) as SetStateAction<
        never[]
      >,
    );
  };
  const filterBrandsStartsWith = (
    list: BrandListItem[],
    comparisonString: string,
  ) =>
    comparisonString
      ? list.filter((item: BrandListItem) =>
          item.brand.label
            .toLowerCase()
            .startsWith(comparisonString.toLowerCase()),
        )
      : [];

  return (
    <div css={[styles.root]}>
      <div css={styles.pageHeader}>
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
      </div>
      {searchValue !== '' && searchBrandList && searchBrandList.length > 0 && (
        <div css={styles.brandsList}>
          <CircularIllustrationItemList
            dataItems={searchBrandList}
            titlePosition={TitlePosition.top}
            dataType={CircularItemType.brand}
          />
        </div>
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
          <div css={styles.brandsList}>
            <CircularIllustrationItemList
              dataItems={popularBrandList}
              titlePosition={TitlePosition.top}
              dataType={CircularItemType.brand}
            />
          </div>
        </>
      )}
      {searchValue === '' && brandListItems && brandListItems.length > 0 && (
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
          <CircularIllustrationItemList
            dataItems={brandListItems}
            titlePosition={TitlePosition.top}
            dataType={CircularItemType.brand}
          />
        </>
      )}
    </div>
  );
}

export default BrandHubPage;
